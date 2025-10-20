"use client";

import * as React from "react";
import {
  Table as TanstackTable,
  ColumnDef,
  ColumnFiltersState,
  SortingState,
  VisibilityState,
  flexRender,
  getCoreRowModel,
  getFacetedRowModel,
  getFacetedUniqueValues,
  getFilteredRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  useReactTable,
} from "@tanstack/react-table";

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

import { DataTablePagination } from "@/components/ui/data-table/data-table-pagination";
import { useRouter } from "next/navigation";
import Loading from "@/app/loading";

interface DataTableProps<TData, TValue> {
  columns?: ColumnDef<TData, TValue>[];
  data: TData[];
  table: TanstackTable<TData>;
  selectedRowId?: React.Dispatch<React.SetStateAction<any[]>>;
  clickable?: boolean;
  loading?: boolean;
  customDataView?: React.ReactNode;
}

export function DataTable<TData, TValue>({
  columns,
  data,
  table,
  selectedRowId,
  clickable = true,
  loading = false,
  customDataView,
}: DataTableProps<TData, TValue>) {
  return (
    <div className="relative">
      {loading && (
        <div className="absolute inset-0 flex items-center justify-center backdrop-blur-sm z-10">
          <Loading />
        </div>
      )}
      {!customDataView ? (
        <div className="rounded-md border">
          <Table>
            <TableHeader>
              {table.getHeaderGroups().map((headerGroup) => (
                <TableRow key={headerGroup.id}>
                  {headerGroup.headers.map((header) => {
                    return (
                      <TableHead key={header.id} colSpan={header.colSpan}>
                        {header.isPlaceholder
                          ? null
                          : flexRender(
                              header.column.columnDef.header,
                              header.getContext()
                            )}
                      </TableHead>
                    );
                  })}
                </TableRow>
              ))}
            </TableHeader>
            <TableBody>
              {table.getRowModel().rows?.length ? (
                table.getRowModel().rows.map((row) => (
                  <TableRow
                    key={row.id}
                    data-state={row.getIsSelected() && "selected"}
                    className="hover:bg-gray-100"
                  >
                    {row.getVisibleCells().map((cell) => (
                      <TableCell
                        key={cell.id}
                        onClick={() => {
                          if (selectedRowId) {
                            selectedRowId((row.original as any)["_id"]);
                          }
                        }}
                        // className={`${clickable ? "cursor-pointer" : ""}`}
                      >
                        {flexRender(
                          cell.column.columnDef.cell,
                          cell.getContext()
                        )}
                      </TableCell>
                    ))}
                  </TableRow>
                ))
              ) : (
                <TableRow>
                  <TableCell
                    colSpan={columns?.length}
                    className="h-24 text-center"
                  >
                    No results.
                  </TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        </div>
      ) : table.getRowModel().rows?.length ? (
        customDataView
      ) : (
        <div className="inset-0 flex items-center justify-center backdrop-blur-sm z-10 my-10">
          <div className="text-center">No results.</div>
        </div>
      )}
    </div>
  );
}
