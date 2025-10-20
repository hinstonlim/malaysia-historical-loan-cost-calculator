"use client";
import { useState, useEffect } from "react";
import { fetchRates } from "@/lib/fetchRates";
import { calculateLoan } from "@/lib/calcLoan";
import { Separator } from "@/components/ui/separator";
import { LoanFormSchema } from "@/schemas/schema.loanForm";
import { Label } from "@/components/ui/label";
import { Spinner } from "@/components/ui/spinner";
import { ExclamationTriangleIcon } from "@radix-ui/react-icons";
import { RateDataSchema } from "@/schemas/schema.rateData";
import LoanForm from "@/components/ResultsSection/LoanForm";
import ResultsSection from "@/components/ResultsSection/ResultsSection";
import { Dialog } from "@/components/ui/dialog";
import { MalaysiaOverviewDialog } from "@/components/MalaysiaOverviewDialog";
import { fetchMalaysiaOverview } from "@/lib/fetchMalaysiaOverview";

export default function Page() {
  const [rates, setRates] = useState<RateDataSchema[]>([]);
  const [malaysiaOverview, setMalaysiaOverview] = useState<any>(null);
  const [results, setResults] = useState<any[]>([]);
  const [inputs, setInputs] = useState<LoanFormSchema | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [malaysiaOverviewError, setMalaysiaOverviewError] = useState(false);

  useEffect(() => {
    setLoading(true);

    // For partial failure handling
    Promise.allSettled([fetchRates(), fetchMalaysiaOverview()])
      .then(([ratesResult, overviewResult]) => {
        if (ratesResult.status === "fulfilled") {
          setRates(ratesResult.value);
        } else {
          setError("Failed to fetch rate data");
        }

        if (overviewResult.status === "fulfilled") {
          setMalaysiaOverview(overviewResult.value);
        } else {
          setMalaysiaOverviewError(true);
        }
      })
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
          <MalaysiaOverviewDialog
            malaysiaOverview={malaysiaOverview}
            error={malaysiaOverviewError}
          />
        </div>
        {/* <Separator orientation="vertical" className="h-auto" /> */}
        <div className="flex flex-4 mt-6">
          <ResultsSection results={results} rates={rates} inputs={inputs} />
        </div>
      </div>
    </main>
  );
}
