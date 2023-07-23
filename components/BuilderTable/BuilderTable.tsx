import * as React from "react";
import {
  BuilderTableHead,
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

type TData = {
  [key: string]: any;
};

interface DataTableProps {
  componentId: string;
}

export function BuilderTable({ componentId }: DataTableProps) {
  const updateColumn = useAppState((state) => state.updateColumn);
  const tableState = useAppState(
    (state) => state.components[componentId].data as TableComponentData
  );
  const [data, setData] = React.useState<[]>([]);

  React.useEffect(() => {
    const fetchData = async () => {
      const url = `/api/fetch?table=${tableState.source_data_table}`;
      fetch(url)
        .then((res) => res.json())
        .then((data) => {
          if (Object.keys(data).length > 0){
            setData(data.results);
          }
        });
    };
    fetchData();
  }, [tableState.source_data_table]);

  return (
    <div className="flex flex-row">
      <Table className="rounded-md border">
        <TableHeader>
          <TableRow>
            {tableState.columns.map((column, index) => (
              <BuilderTableHead key={index} index={index} componentId={componentId}>
                {column.header}
              </BuilderTableHead>
            ))}
          </TableRow>
        </TableHeader>
        <TableBody>
          {data.length > 0 ? (
            // @ts-ignore
            data.map((row, index) => (
              <TableRow key={index}>
                {tableState.columns.map((col, index) => (
                  // @ts-ignore
                  <TableCell key={index}>{row[col.accessorKey]}</TableCell>
                ))}
              </TableRow>
            ))
          ) : (
            <TableRow>
              <TableCell
                colSpan={tableState.columns.length}
                className="h-24 text-center"
              >
                No results.
              </TableCell>
            </TableRow>
          )}
        </TableBody>
      </Table>
    </div>
  );
}
