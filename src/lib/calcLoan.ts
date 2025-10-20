// import { FeeTreatment, FeeType } from "@/constants/enum-constants";
// import { LoanFormSchema } from "@/schemas/schema.loanForm";

// export function calculateLoan(rate: number, inputs: LoanFormSchema) {
//   const { amount, fee, feeType, feeTreatment, bnmAdjustment } = inputs;

//   const adjustedRate = bnmAdjustment ? Math.max(rate - 2.75, 0) : rate;
//   const feeValue = feeType === FeeType.PERCENT ? amount * (fee / 100) : fee;

//   const principal =
//     feeTreatment === FeeTreatment.FINANCED ? amount + feeValue : amount;
    
//   console.log(principal);
//   const annualRate = adjustedRate / 100;
//   const monthlyRate = annualRate / 12;

//   const monthlyPayment =
//     principal * (monthlyRate / (1 - Math.pow(1 + monthlyRate, -12)));

//   const totalRepayment = monthlyPayment * 12;
//   const interest = totalRepayment - amount;


//   return {
//     adjustedRate,
//     principal,
//     interest,
//     totalCost: totalRepayment,
//     monthlyPayment,
//   };
// }

import { FeeTreatment, FeeType } from "@/constants/enum-constants";
import { LoanFormSchema } from "@/schemas/schema.loanForm";

export function calculateLoan(rate: number, inputs: LoanFormSchema) {
  const { amount, fee, feeType, feeTreatment, bnmAdjustment } = inputs;

  const adjustedRate = bnmAdjustment ? Math.max(rate - 2.75, 0) : rate;
  const feeValue = feeType === FeeType.PERCENT ? amount * (fee / 100) : fee;

  const principal =
    feeTreatment === FeeTreatment.FINANCED ? amount + feeValue : amount;

  const annualRate = adjustedRate / 100;
  const monthlyRate = annualRate / 12;

  const monthlyPayment =
    principal * (monthlyRate / (1 - Math.pow(1 + monthlyRate, -12)));

  const totalRepayment = monthlyPayment * 12;
  const interest = totalRepayment - principal;

  const totalCost =
    feeTreatment === FeeTreatment.UPFRONT
      ? totalRepayment + feeValue
      : totalRepayment;

  const repaymentPerMonth = monthlyPayment;

  return {
    adjustedRate,
    principal,
    interest,
    totalCost,
    monthlyPayment,
    repaymentPerMonth,
  };
}
