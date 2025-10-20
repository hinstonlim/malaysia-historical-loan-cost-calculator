"use client";

import { z } from "zod";
import { columns } from "./data/columns.results-table";
import { resultsTableDataSchema } from "./data/schema.results-table";
import { ResultsDataTable } from "./components/data-table/DataTable.results-data";
import Loading from "@/app/loading";
import { ResultsSchema } from "@/schemas/schema.results";

export default function ResultsTable({
  results,
}: {
  results: ResultsSchema[];
}) {
  if (!results.length) return null;

  return (
      <div className="h-full flex-4 flex-col space-y-2 md:flex">
        <div>
          {results ? (
            <ResultsDataTable
              data={z.array(resultsTableDataSchema).parse(results)}
              columns={columns}
            />
          ) : (
            <Loading />
          )}
        </div>
      </div>
  );
}
