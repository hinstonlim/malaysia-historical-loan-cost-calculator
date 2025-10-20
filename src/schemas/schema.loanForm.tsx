import { FeeTreatment, FeeType } from "@/constants/enum-constants";
import { z } from "zod";

export const loanFormSchema = z.object({
  amount: z.number().min(10000).max(1000000),
  fee: z.number().min(0).max(100),
  feeType: z.string(),
  feeTreatment: z.string(),
  bnmAdjustment: z.boolean(),
});

export type LoanFormSchema = z.infer<typeof loanFormSchema>;
