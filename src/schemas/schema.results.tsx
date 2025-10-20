import { z } from "zod";

export const resultsSchema = z.object({
  year: z.number(),
  principal: z.number(),
  interest: z.number(),
  totalCost: z.number(),
  repaymentPerMonth: z.number(),
  adjustedRate: z.number(),
});

export type ResultsSchema = z.infer<typeof resultsSchema>;
