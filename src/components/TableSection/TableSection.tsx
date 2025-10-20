"use client";

import { z } from "zod";
import { columns } from "./data/columns.table-section";
import { TableSectionDataTable } from "./components/data-table/DataTable.table-section";
import Loading from "@/app/loading";
import { resultsSchema, ResultsSchema } from "@/schemas/schema.results";

export default function TableSection({
  results,
}: {
  results: ResultsSchema[];
}) {
  if (!results.length) return null;

  return (
    <div className="h-full flex-4 flex-col space-y-2 md:flex">
      <div>
        {results ? (
          <TableSectionDataTable
            data={z.array(resultsSchema).parse(results)}
            columns={columns}
          />
        ) : (
          <Loading />
        )}
      </div>
    </div>
  );
}
