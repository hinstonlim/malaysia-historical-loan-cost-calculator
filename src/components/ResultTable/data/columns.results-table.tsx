"use client";

import { ColumnDef } from "@tanstack/react-table";
import { ResultsTableDataSchema } from "./schema.results-table";
import { DataTableColumnHeader } from "@/components/ui/data-table/data-table-column-header";
import { beautifyPrice } from "@/lib/utils";

export const columns: ColumnDef<ResultsTableDataSchema>[] = [
  {
    accessorKey: "year",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Year" />
    ),
    cell: ({ row }) => (
      <div className="flex items-center gap-2">{row.original.year}</div>
    ),
    enableSorting: true,
  },
  {
    accessorKey: "principal",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Principal" />
    ),
    cell: ({ row }) => (
      <div className="flex items-center gap-2">
        {beautifyPrice(row.original.principal)}
      </div>
    ),
    enableSorting: true,
  },
  {
    accessorKey: "interest",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Interest" />
    ),
    cell: ({ row }) => (
      <div className="flex items-center gap-2">
        {beautifyPrice(row.original.interest)}
      </div>
    ),
    enableSorting: true,
  },
  {
    accessorKey: "totalCost",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Total Cost" />
    ),
    cell: ({ row }) => (
      <div className="flex items-center gap-2">
        {beautifyPrice(row.original.totalCost)}
      </div>
    ),
    enableSorting: true,
  },
  {
    accessorKey: "adjustedRate",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Rate" />
    ),
    cell: ({ row }) => (
      <div className="flex items-center gap-2">
        {row.original.adjustedRate.toFixed(2)}
      </div>
    ),
    enableSorting: true,
  },
];
