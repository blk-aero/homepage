import { z } from "zod";

const rolloutSchema = z.object({
  active_services: z.array(z.string()),
  active_cities: z.array(z.string()),
  blocked_combinations: z
    .array(
      z.object({
        service: z.string(),
        city: z.string()
      })
    )
    .optional()
});

export type RolloutControl = z.infer<typeof rolloutSchema>;

export function parseRolloutControl(input: unknown): RolloutControl {
  return rolloutSchema.parse(input);
}

export function isServiceActive(control: RolloutControl, slug: string): boolean {
  return control.active_services.includes(slug);
}

export function isCityActive(control: RolloutControl, slug: string): boolean {
  return control.active_cities.includes(slug);
}
