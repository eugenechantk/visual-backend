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
import getPrismaInstance from "@/lib/prisma";
import { PrismaClient } from "@prisma/client";

// TODO: Data type and value type of the table
// interface DataTableProps<TData, TValue> {
//   columns: ColumnDef<TData, TValue>[];
//   data: TData[];
// }

type TData = {
  [key: string]: any; 
}

interface DataTableProps {
  componentId: string;
}

export function BuilderTable({ componentId }: DataTableProps) {
  const updateColumn = useAppState((state) => state.updateColumn);
  const columns = useAppState(
    (state) =>
      (state.components["table-12345678"].data as TableComponentData).columns
  );
  const [data, setData] = React.useState<[]>([]);

  React.useEffect(() => {
    const fetchData = async () => {
      fetch('/api/fetch?table=payments').then((res) => res.json()).then((data) => {setData(data.results)})
    }
    fetchData();
  }, []);


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
          {data.length > 0 ? (
            // @ts-ignore
            data.map((row, index) => (
              <TableRow key={index}>
                {columns.map((col, index) => (
                  // @ts-ignore
                  <TableCell key={index}>{row[col.accessorKey]}</TableCell>
                ))}
              </TableRow>
            ))
          ) : (
            <TableRow>
              <TableCell colSpan={columns.length} className="h-24 text-center">
                No results.
              </TableCell>
            </TableRow>
          )}
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
