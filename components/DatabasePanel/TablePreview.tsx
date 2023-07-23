import { TableSchema } from "@/pages";
import React from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import DraggableFieldTag from "./DraggableFieldTag";

export default function TablePreview({ schema }: { schema: TableSchema }) {
  const [data, setData] = React.useState<[]>([]);
  console.log(schema.table_name);

  // FETCH DATA TO PREVIEW
  React.useEffect(() => {
    setData([])
    const fetchData = async () => {
      const url = `/api/fetch?table=${schema.table_name.toLowerCase()}`;
      fetch(url)
        .then((res) => res.json())
        .then((data) => {
          if (Object.keys(data).length > 0) {
            const reorderDataObject = (data: any): any => {
              const reorderedData: any = {};
              for (const key of schema.columns) {
                if (data.hasOwnProperty(key)) {
                  reorderedData[key] = data[key];
                }
              }
              return reorderedData;
            };
            const reorderedDataArray = data.results.map(reorderDataObject);
            setData(reorderedDataArray);
          }
        });
    };
    fetchData();
  }, [schema]);

  return (
    <Table className="border-b border-gray-200">
      <TableHeader>
        <TableRow>
          {schema.columns.map((column, index) => (
            <TableHead
              key={index}
              className="border-r border-gray-200 last:border-r-0"
            >
              <DraggableFieldTag
                key={`${schema.table_name}-${column}`}
                tableName={schema.table_name}
                columnName={column}
                draggable
              />
            </TableHead>
          ))}
        </TableRow>
      </TableHeader>
      <TableBody>
        {data.map((row, index) => (
          <TableRow key={index}>
            {Object.keys(row).map((key, index) => (
              <TableCell
                key={index}
                className="border-r border-gray-200 last:border-r-0"
              >
                {row[key]}
              </TableCell>
            ))}
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
}
