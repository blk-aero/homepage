import { existsSync, readdirSync, readFileSync, statSync } from "node:fs";
import { join } from "node:path";

export type RuntimeException = {
  origin: string;
  purpose: string;
};

export const allowlistPath = "docs/agents/public-runtime-allowlist.json";
export const builtRuntimeInputs = ["src/pages", "src/components", "src/layouts", "src/lib", "src/content", "src/styles"];

const sourceRuntimeRoots = ["src/pages", "src/components", "src/layouts"];
const runtimeElementPattern = /<(?:script|iframe|embed|object)\b[^>]*>/gi;
const runtimeAttributePattern =
  /\b(?:src|data)\s*=\s*(?:"([^"]+)"|'([^']+)'|\{`([^`]+)`\}|\{["']([^"']+)["']\}|`([^`]+)`|([^\s>]+))/gi;
const runtimeExpressionAttributePattern =
  /<(?:script|iframe|embed|object)\b[^>]*\b(src|data)\s*=\s*\{\s*([^`'"][^}]*)\s*\}[^>]*>/gi;
const runtimePropertyAssignmentPattern = /\b[A-Za-z_$][\w$]*\.(?:src|data)\s*=\s*(?:"([^"]+)"|'([^']+)'|`([^`]+)`)/g;
const runtimePropertyExpressionAssignmentPattern =
  /\b([A-Za-z_$][\w$]*)\.(src|data)\s*=\s*([A-Za-z_$][\w$]*)\b/g;
const elementVariablePattern =
  /\b(?:const|let|var)\s+([A-Za-z_$][\w$]*)\s*=\s*document\.createElement\(\s*(?:"([a-z][a-z0-9-]*)"|'([a-z][a-z0-9-]*)'|`([a-z][a-z0-9-]*)`)\s*\)/g;
const runtimeSetAttributePattern =
  /\b([A-Za-z_$][\w$]*)\.setAttribute\(\s*(?:"(src|data)"|'(src|data)'|`(src|data)`)\s*,\s*(?:"([^"]+)"|'([^']+)'|`([^`]+)`|([A-Za-z_$][\w$]*))\s*\)/g;
const runtimeElementNames = new Set(["script", "iframe", "embed", "object"]);
const siteOrigin = "https://blk.aero";

function astroFilesUnder(path: string): string[] {
  if (!existsSync(path)) {
    return [];
  }

  const stats = statSync(path);

  if (stats.isFile()) {
    return path.endsWith(".astro") ? [path] : [];
  }

  return readdirSync(path, { withFileTypes: true }).flatMap((entry) => astroFilesUnder(join(path, entry.name)));
}

export function findSourceRuntimeFiles() {
  return sourceRuntimeRoots.flatMap(astroFilesUnder).sort();
}

export function loadAllowlist() {
  return JSON.parse(readFileSync(allowlistPath, "utf8")) as RuntimeException[];
}

export function originFor(url: string) {
  return new URL(url).origin;
}

function runtimeUrlFor(value: string, baseUrl = siteOrigin) {
  const baseOrigin = new URL(baseUrl).origin;

  try {
    const parsedUrl = new URL(value, baseOrigin);

    if ((parsedUrl.protocol === "http:" || parsedUrl.protocol === "https:") && parsedUrl.origin !== baseOrigin) {
      return parsedUrl.href;
    }
  } catch {
    return undefined;
  }

  return undefined;
}

function uniqueUrls(urls: string[]) {
  return [...new Set(urls)];
}

export function runtimeUrlsInMarkup(markup: string, baseUrl = siteOrigin) {
  return uniqueUrls([...markup.matchAll(runtimeElementPattern)]
    .flatMap(([element]) =>
      [...element.matchAll(runtimeAttributePattern)].map((match) => match.slice(1).find(Boolean) ?? "")
    )
    .flatMap((url) => {
      const runtimeUrl = runtimeUrlFor(url, baseUrl);
      return runtimeUrl ? [runtimeUrl] : [];
    }));
}

function stringAssignmentValuesFor(source: string, identifier: string) {
  const escapedIdentifier = identifier.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
  const assignmentPattern = new RegExp(
    `\\b(?:const|let|var)\\s+${escapedIdentifier}\\s*=\\s*(?:"([^"]+)"|'([^']+)'|\\\`([^\\\`]+)\\\`)`,
    "g"
  );

  return [...source.matchAll(assignmentPattern)].map((match) => match.slice(1).find(Boolean) ?? "");
}

function elementVariableAssignmentsFor(source: string) {
  return [...source.matchAll(elementVariablePattern)].map((match) => ({
    index: match.index ?? 0,
    objectName: match[1],
    elementName: match.slice(2).find(Boolean) ?? ""
  }));
}

function runtimeSetAttributeReferencesInSource(source: string) {
  const elementVariableAssignments = elementVariableAssignmentsFor(source);

  return [...source.matchAll(runtimeSetAttributePattern)].flatMap((match) => {
    const objectName = match[1];
    const elementAssignment = elementVariableAssignments
      .filter((assignment) => assignment.objectName === objectName && assignment.index < (match.index ?? 0))
      .at(-1);
    const elementName = elementAssignment?.elementName;

    if (!elementName || !runtimeElementNames.has(elementName)) {
      return [];
    }

    const attribute = match.slice(2, 5).find(Boolean) ?? "";
    const rawLiteralValue = match.slice(5, 8).find(Boolean);
    const literalValue = rawLiteralValue?.includes("${") ? undefined : rawLiteralValue;
    const identifier = match[8];

    return [{
      objectName,
      elementName,
      attribute,
      literalValue,
      identifier
    }];
  });
}

export function runtimeUrlsInSource(source: string, baseUrl = siteOrigin) {
  const expressionIdentifiers = [...source.matchAll(runtimeExpressionAttributePattern)]
    .map((match) => match[2].trim())
    .filter((expression) => /^[A-Za-z_$][\w$]*$/.test(expression));
  const expressionUrls = expressionIdentifiers.flatMap((identifier) =>
    stringAssignmentValuesFor(source, identifier).flatMap((value) => {
      const runtimeUrl = runtimeUrlFor(value, baseUrl);
      return runtimeUrl ? [runtimeUrl] : [];
    })
  );
  const propertyAssignmentUrls = [...source.matchAll(runtimePropertyAssignmentPattern)].flatMap((match) => {
    const runtimeUrl = runtimeUrlFor(match.slice(1).find(Boolean) ?? "", baseUrl);
    return runtimeUrl ? [runtimeUrl] : [];
  });
  const propertyExpressionUrls = [...source.matchAll(runtimePropertyExpressionAssignmentPattern)].flatMap((match) =>
    stringAssignmentValuesFor(source, match[3]).flatMap((value) => {
      const runtimeUrl = runtimeUrlFor(value, baseUrl);
      return runtimeUrl ? [runtimeUrl] : [];
    })
  );
  const setAttributeUrls = runtimeSetAttributeReferencesInSource(source).flatMap((reference) => {
    if (reference.literalValue) {
      const runtimeUrl = runtimeUrlFor(reference.literalValue, baseUrl);
      return runtimeUrl ? [runtimeUrl] : [];
    }

    if (reference.identifier) {
      return stringAssignmentValuesFor(source, reference.identifier).flatMap((value) => {
        const runtimeUrl = runtimeUrlFor(value, baseUrl);
        return runtimeUrl ? [runtimeUrl] : [];
      });
    }

    return [];
  });

  return uniqueUrls([
    ...runtimeUrlsInMarkup(source, baseUrl),
    ...expressionUrls,
    ...propertyAssignmentUrls,
    ...propertyExpressionUrls,
    ...setAttributeUrls
  ]);
}

export function unresolvedRuntimeReferencesInSource(source: string) {
  const expressionReferences = [...source.matchAll(runtimeExpressionAttributePattern)].flatMap((match) => {
    const attribute = match[1];
    const expression = match[2].trim();

    if (/^[A-Za-z_$][\w$]*$/.test(expression) && stringAssignmentValuesFor(source, expression).length > 0) {
      return [];
    }

    return [`runtime attribute ${attribute}={${expression}}`];
  });
  const assignmentReferences = [...source.matchAll(runtimePropertyExpressionAssignmentPattern)].flatMap((match) => {
    const objectName = match[1];
    const property = match[2];
    const identifier = match[3];

    if (stringAssignmentValuesFor(source, identifier).length > 0) {
      return [];
    }

    return [`runtime assignment ${objectName}.${property} = ${identifier}`];
  });
  const setAttributeReferences = runtimeSetAttributeReferencesInSource(source).flatMap((reference) => {
    if (!reference.identifier || stringAssignmentValuesFor(source, reference.identifier).length > 0) {
      return [];
    }

    return [`runtime setAttribute ${reference.objectName}.${reference.attribute} = ${reference.identifier}`];
  });

  return [...new Set([...expressionReferences, ...assignmentReferences, ...setAttributeReferences])];
}
