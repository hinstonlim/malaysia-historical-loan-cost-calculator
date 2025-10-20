"use client";
import { useState, useEffect } from "react";
import LoanForm from "@/components/LoanForm";
import CostChart from "@/components/CostChart";
import { fetchRates } from "@/lib/fetchRates";
import { calculateLoan } from "@/lib/calcLoan";
import ResultsTable from "@/components/ResultTable/ResultsTable";
import { Separator } from "@/components/ui/separator";
import { LoanFormSchema } from "@/schemas/schema.loanForm";
import { Label } from "@/components/ui/label";
import { Spinner } from "@/components/ui/spinner";
import { ExclamationTriangleIcon } from "@radix-ui/react-icons";
import { RateDataSchema } from "@/schemas/schema.rateData";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { DetailsView } from "@/components/DetailsView";
import { beautifyPrice } from "@/lib/utils";
import { IconChartBar } from "@tabler/icons-react";
import { Download } from "lucide-react";
import { Button } from "@/components/ui/button";
import { downloadLendingRateAsCSV } from "@/lib/downloadLendingRateAsCSV";
import { downloadResultsAsCSV } from "@/lib/downloadResultsAsCSV";

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
        <div className="flex flex-4  mt-6">
          {results.length > 0 && rates.length > 0 ? (
            <div className="flex flex-col w-full gap-0">
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-2">
                  <IconChartBar className="text-neutral-700 dark:text-neutral-200 h-10 w-10 flex-shrink-0" />
                  <h2 className="text-2xl font-bold tracking-tight">Results</h2>
                </div>
                <div className="flex items-center space-x-2">
                  <Button
                    variant="outline"
                    size="sm"
                    className="ml-auto mr-2 hidden h-8 lg:flex"
                    onClick={() => {
                      downloadResultsAsCSV(results);
                    }}
                  >
                    <Download className="mr-2 h-4 w-4" />
                    Download Results as CSV
                  </Button>
                  <Button
                    variant="outline"
                    size="sm"
                    className="ml-auto mr-2 hidden h-8 lg:flex"
                    onClick={() => {
                      downloadLendingRateAsCSV(rates);
                    }}
                  >
                    <Download className="mr-2 h-4 w-4" />
                    Download Lending Rate as CSV
                  </Button>
                </div>
              </div>

              {inputs && (
                <Card className="my-4 px-4 py-2">
                  <DetailsView
                    maxItemPerRow={4}
                    content={[
                      {
                        title: "Loan Amount",
                        description: beautifyPrice(inputs?.amount),
                      },
                      {
                        title: "Origination Fee",
                        description: beautifyPrice(inputs?.fee),
                      },
                      {
                        title: "Fee Type",
                        description: inputs?.feeType,
                      },
                      {
                        title: "Fee Treatment",
                        description: inputs?.feeTreatment,
                      },
                      {
                        title: "Apply BNM Adjustment",
                        description: inputs?.bnmAdjustment ? "Yes" : "No",
                      },
                    ]}
                  />
                </Card>
              )}
              <div className="flex flex-row gap-4">
                <ResultsTable results={results} />
                <CostChart data={results} />
              </div>
            </div>
          ) : (
            <Label className="w-full h-full flex justify-center">
              Please fill in the loan details to see the results.
            </Label>
          )}
        </div>
      </div>
    </main>
  );
}
