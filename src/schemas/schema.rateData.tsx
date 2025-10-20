import { FeeTreatment, FeeType } from "@/constants/enum-constants";
import { z } from "zod";

export const rateDataSchema = z.object({
  year: z.number(),
  rate: z.number(),
});

export type RateDataSchema = z.infer<typeof rateDataSchema>;
