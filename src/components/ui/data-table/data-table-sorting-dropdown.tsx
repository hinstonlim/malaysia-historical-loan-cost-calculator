import React, { useState } from 'react';
import { Table } from '@tanstack/react-table';
import { Select, SelectTrigger, SelectValue, SelectContent, SelectItem } from '@/components/ui/select';
import { ArrowDownNarrowWideIcon, ArrowUpNarrowWideIcon } from 'lucide-react';

interface DataTableSortingDropdownProps<TData> {
  table: Table<TData>;
  sortOptions: { id: string; label: string }[];
}

export function DataTableSortingDropdown<TData>({ table, sortOptions }: DataTableSortingDropdownProps<TData>) {
  const [sortId, setSortId] = useState(sortOptions[0].id);
  const [sortOrder, setSortOrder] = useState<'asc' | 'desc'>('desc');

  return (
    <div className="flex items-center border rounded-md px-2 h-8">
      <div className="text-sm px-1 whitespace-nowrap">Sort By</div>
      <Select
        defaultValue={sortId}
        onValueChange={(value) => {
          table.setSorting([{ id: value, desc: sortOrder === 'desc' }]);
          setSortId(value);
        }}
      >
        <SelectTrigger className="bg-gray-200 border-none rounded-sm h-6 px-3 mx-1 gap-6">
          <SelectValue placeholder={sortOrder} />
        </SelectTrigger>
        <SelectContent>
          {sortOptions.map((option) => (
            <SelectItem key={option.id} value={option.id}>
            {option.label}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
      <div
        onClick={() => {
          const newSortOrder = sortOrder === 'desc' ? 'asc' : 'desc';
          setSortOrder(newSortOrder);
          table.setSorting([{ id: sortId, desc: newSortOrder === 'desc' }]);
        }}
        className="flex items-center h-6 px-1.5 rounded-sm bg-gray-200 cursor-pointer"
      >
        {sortOrder === 'asc' ? (
          <ArrowDownNarrowWideIcon className="h-3.5 w-3.5" />
        ) : (
          <ArrowUpNarrowWideIcon className="h-3.5 w-3.5" />
        )}
      </div>
    </div>
  );
}