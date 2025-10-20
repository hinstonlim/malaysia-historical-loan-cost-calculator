"use client";
import z from "zod";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "./ui/form";
import { Button } from "./ui/button";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Input } from "./ui/input";
import { formatAmount } from "@/lib/utils";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "./ui/select";
import { FeeTreatment, FeeType } from "@/constants/enum-constants";
import { Checkbox } from "./ui/checkbox";
import { LoanFormSchema } from "@/schemas/schema.loanForm";
import { Card } from "./ui/card";

const formSchema = z
  .object({
    amount: z.number(),
    fee: z.number(),
    feeType: z.string(),
    feeTreatment: z.string(),
    bnmAdjustment: z.boolean(),
  })
  .superRefine((data, ctx) => {
    if (data.feeType === FeeType.PERCENT) {
      if (data.fee < 0 || data.fee >= 100) {
        ctx.addIssue({
          code: z.ZodIssueCode.custom,
          message: "Fee percentage must be between 0% and 100%",
          path: ["fee"],
        });
      }
    }

    if (data.feeType === FeeType.FLAT) {
      if (data.fee < 0) {
        ctx.addIssue({
          code: z.ZodIssueCode.custom,
          message: "Fee must be greater than RM0",
          path: ["fee"],
        });
      }
    }
  });

export default function LoanForm({
  onSubmit,
}: {
  onSubmit: (data: LoanFormSchema) => void;
}) {
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      amount: 0,
      fee: 0,
      feeType: FeeType.FLAT,
      feeTreatment: FeeTreatment.UPFRONT,
      bnmAdjustment: false,
    },
  });

  return (
    <Card className="p-6">
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="space-y-8 flex flex-col"
      >
        <div className="grid gap-4 md:grid-cols-1 lg:grid-cols-1 items-start">
          <FormField
            control={form.control}
            name="amount"
            render={({ field }) => {
              return (
                <FormItem>
                  <FormLabel>Loan Amount (RM)</FormLabel>
                  <FormControl>
                    <Input
                      {...field}
                      type="number"
                      value={field.value ?? ""}
                      onChange={(e) => {
                        const val = e.target.valueAsNumber;
                        field.onChange(Number.isNaN(val) ? 0 : val);
                      }}
                      onInput={formatAmount}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              );
            }}
          />
          <FormField
            control={form.control}
            name="fee"
            render={({ field }) => {
              const feeType = form.watch("feeType");
              return (
                <FormItem>
                  <FormLabel>{`Origination Fee (${
                    feeType === FeeType.PERCENT ? "%" : "RM"
                  })`}</FormLabel>
                  <FormControl>
                    <Input
                      {...field}
                      type="number"
                      value={field.value ?? ""}
                      onChange={(e) => {
                        const val = e.target.valueAsNumber;
                        field.onChange(Number.isNaN(val) ? 0 : val);
                      }}
                      onInput={formatAmount}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              );
            }}
          />
          <FormField
            control={form.control}
            name="feeType"
            render={({ field }) => {
              return (
                <FormItem>
                  <FormLabel>Fee Type</FormLabel>
                  <FormControl>
                    <Select
                      defaultValue={field.value}
                      onValueChange={(value) => {
                        field.onChange(value);
                        form.setValue("fee", 0);
                      }}
                    >
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        {Object.values(FeeType).map((type, index) => {
                          return (
                            <SelectItem value={type} key={index}>
                              {type}
                            </SelectItem>
                          );
                        })}
                      </SelectContent>
                    </Select>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              );
            }}
          />
          <FormField
            control={form.control}
            name="feeTreatment"
            render={({ field }) => {
              return (
                <FormItem>
                  <FormLabel>Fee Treatment</FormLabel>
                  <FormControl>
                    <Select
                      defaultValue={field.value}
                      onValueChange={field.onChange}
                    >
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        {Object.values(FeeTreatment).map(
                          (feeTreatment, index) => {
                            return (
                              <SelectItem value={feeTreatment} key={index}>
                                {feeTreatment}
                              </SelectItem>
                            );
                          }
                        )}
                      </SelectContent>
                    </Select>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              );
            }}
          />
        </div>

        <FormField
          control={form.control}
          name="bnmAdjustment"
          render={({ field }) => {
            return (
              <FormItem className="flex flex-row items-center space-x-3 space-y-0">
                <FormControl>
                  <Checkbox
                    defaultChecked={field.value}
                    onCheckedChange={field.onChange}
                  />
                </FormControl>
                <FormLabel>Apply BNM Adjustment (-2.75%)</FormLabel>
                <FormMessage />
              </FormItem>
            );
          }}
        />
        <Button type="submit" variant={"default"}>
          Calculate
        </Button>
      </form>
    </Form></Card>
  );
}
