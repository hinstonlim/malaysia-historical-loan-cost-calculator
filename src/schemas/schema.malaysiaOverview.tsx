import { z } from "zod";

export const malaysiaOverviewSchema = z.object({
  gdp: z.number(),
  population: z.number(),
  inflation: z.number(),
  unemployment: z.number(),
  lendingRate: z.number(),
});

export type MalaysiaOverviewSchema = z.infer<typeof malaysiaOverviewSchema>;
