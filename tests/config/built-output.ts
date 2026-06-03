import { existsSync, readdirSync, statSync } from "node:fs";
import { join } from "node:path";

function filesUnder(path: string): string[] {
  if (!existsSync(path)) {
    return [];
  }

  const stats = statSync(path);

  if (stats.isFile()) {
    return [path];
  }

  return readdirSync(path, { withFileTypes: true }).flatMap((entry) => {
    const childPath = join(path, entry.name);
    return entry.isDirectory() ? filesUnder(childPath) : [childPath];
  });
}

export function findBuiltHtmlFiles(root: string) {
  return filesUnder(root)
    .filter((file) => file.endsWith(".html"))
    .sort();
}

export function staleBuildInputs(builtFile: string, inputPaths: string[]) {
  if (!existsSync(builtFile)) {
    return inputPaths.flatMap(filesUnder).sort();
  }

  const builtMtime = statSync(builtFile).mtimeMs;

  return inputPaths
    .flatMap(filesUnder)
    .filter((file) => statSync(file).mtimeMs > builtMtime)
    .sort();
}
