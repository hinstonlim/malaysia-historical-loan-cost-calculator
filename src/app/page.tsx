"use client";
import { useState, useEffect } from "react";
import LoanForm from "@/components/LoanForm";
import { fetchRates } from "@/lib/fetchRates";
import { calculateLoan } from "@/lib/calcLoan";
import { Separator } from "@/components/ui/separator";
import { LoanFormSchema } from "@/schemas/schema.loanForm";
import { Label } from "@/components/ui/label";
import { Spinner } from "@/components/ui/spinner";
import { ExclamationTriangleIcon } from "@radix-ui/react-icons";
import { RateDataSchema } from "@/schemas/schema.rateData";
import ResultsSection from "@/components/ResultsSection";

export default function Page() {
  const [rates, setRates] = useState<RateDataSchema[]>([]);
  const [results, setResults] = useState<any[]>([]);
  const [inputs, setInputs] = useState<LoanFormSchema | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    fetchRates()
      .then(setRates)
      .catch(() => setError("Failed to fetch data"))
      .finally(() => setLoading(false));
  }, []);

  const handleCalculate = (inputs: LoanFormSchema) => {
    if (!rates.length) return;

    setInputs(inputs);

    const computed = rates.map((r) => ({
      year: r.year,
      ...calculateLoan(r.rate, inputs),
    }));
    setResults(computed);
  };

  if (loading)
    return (
      <div className="flex flex-col h-screen w-full items-center justify-center gap-8">
        <Spinner className="size-20 flex justify-center" />
        <Label className="ml-4 text-2xl">
          Fetching data from World Bank...
        </Label>
      </div>
    );
  if (error)
    return (
      <div className="flex flex-col h-screen w-full items-center justify-center gap-8">
        <ExclamationTriangleIcon className="size-20 text-red-600" />
        <Label className="text-red-600 ml-4 text-2xl">{error}</Label>
      </div>
    );

  return (
    <main className="px-8 py-6 mx-auto flex flex-col min-h-screen">
      <Label className="text-2xl font-bold mb-4">
        Malaysia Historical Loan Cost Calculator (1975–2022)
      </Label>
      <Separator />
      <div className="flex flex-row gap-6">
        <div className="flex flex-1 flex-col mt-6">
          <LoanForm onSubmit={handleCalculate} />
        </div>
        {/* <Separator orientation="vertical" className="h-auto" /> */}
        <div className="flex flex-4 mt-6">
          <ResultsSection results={results} rates={rates} inputs={inputs} />
        </div>
      </div>
    </main>
  );
}
