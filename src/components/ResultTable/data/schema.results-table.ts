import { z } from "zod";

export const resultsTableDataSchema = z.object({
  year: z.number(),
  principal: z.number(),
  interest: z.number(),
  totalCost: z.number(),
  adjustedRate: z.number(),
});

export type ResultsTableDataSchema = z.infer<typeof resultsTableDataSchema>;
