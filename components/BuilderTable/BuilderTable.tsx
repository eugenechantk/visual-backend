import * as React from "react";
import {
  ColumnDef,
  flexRender,
  getCoreRowModel,
  useReactTable,
  SortingState,
  getSortedRowModel,
} from "@tanstack/react-table";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { PlusIcon } from "lucide-react";
import useAppState, { TableComponentData, payments } from "@/lib/store";

// TODO: Data type and value type of the table
// interface DataTableProps<TData, TValue> {
//   columns: ColumnDef<TData, TValue>[];
//   data: TData[];
// }

interface DataTableProps {
  componentId: string;
}

export function BuilderTable({
  componentId,
}: DataTableProps) {
  const updateColumn = useAppState((state) => state.updateColumn);
  const columns = useAppState(
    (state) =>
      (state.components["table-12345678"].data as TableComponentData).columns
  );
  const data = payments

  const addNewColumn = (columnLength: number) => {
    updateColumn("table-12345678", columnLength, {
      accessorKey: "new",
      header: "",
    });
  };

  return (
    <div className="flex flex-row">
      <Table className="rounded-md border">
        <TableHeader>
          <TableRow>
            {columns.map((column, index) => (
              <TableHead key={index}>{column.header}</TableHead>
            ))}
          </TableRow>
        </TableHeader>
        <TableBody>
          {data.map((row, index) => (
            <TableRow key={index}>
              {columns.map((col, index) => (
                // @ts-ignore
                <TableCell key={index}>{row[col.accessorKey]}</TableCell>
              ))}
            </TableRow>
          ))}
        </TableBody>
      </Table>
      <button
        className="px-2 py-1 w-fit h-fit bg-white border border-gray-200"
        onClick={() => addNewColumn(columns.length)}
      >
        <PlusIcon />
      </button>
    </div>
  );
}
