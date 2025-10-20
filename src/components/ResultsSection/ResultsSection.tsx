"use client";
import { LoanFormSchema } from "@/schemas/schema.loanForm";
import { Label } from "@/components/ui/label";
import { RateDataSchema } from "@/schemas/schema.rateData";
import { Card } from "@/components/ui/card";
import { DetailsView } from "@/components/DetailsView";
import { beautifyPrice } from "@/lib/utils";
import { IconChartBar } from "@tabler/icons-react";
import { Download } from "lucide-react";
import { Button } from "@/components/ui/button";
import { downloadLendingRateAsCSV } from "@/lib/downloadLendingRateAsCSV";
import { downloadResultsAsCSV } from "@/lib/downloadResultsAsCSV";
import { ResultsSchema } from "@/schemas/schema.results";
import CostChart from "./CostChart";
import TableSection from "./TableSection/TableSection";

export default function ResultsSection({
  results,
  rates,
  inputs,
}: {
  results: ResultsSchema[];
  rates: RateDataSchema[];
  inputs: LoanFormSchema | null;
}) {
  return results.length > 0 && rates.length > 0 ? (
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
            className="grid-cols-1 sm:grid-cols-3 md:grid-cols-5"
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
      <div className="flex flex-col lg:flex-row gap-4">
        <TableSection results={results} />
        <CostChart data={results} />
      </div>
    </div>
  ) : (
    <Label className="w-full h-full flex justify-center">
      Please fill in the loan details to see the results.
    </Label>
  );
}
