import Image from "next/image";
import { Inter } from "next/font/google";

import DatabasePanelContainer from "@/components/DatabasePanel/DatabasePanelContainer";
import { DndProvider, useDrop } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";
import { BuilderTable } from "@/components/BuilderTable/BuilderTable";
import getPrismaInstance from "@/lib/prisma";
import { GetServerSideProps, InferGetServerSidePropsType } from "next";
import { PrismaClient } from "@prisma/client";
import HeaderButton from "@/components/Header";
import PreviewButton from "@/components/PreviewButton";

const inter = Inter({ subsets: ["latin"] });

export const ItemTypes = {
  FIELD_TAGS: "field-tags",
};

export type TableSchema = {
  table_name: string;
  columns: string[];
  rowCount: number;
};

export const getServerSideProps: GetServerSideProps = async () => {
  const prisma = getPrismaInstance();
  const dbSchema: [] = await prisma.$queryRaw`
      SELECT table_name, column_name 
      FROM information_schema.columns 
      WHERE table_schema = 'public' AND table_name !~ '^_'
    `;

  // Create an array to store the table information
  const tableInfo: TableSchema[] = [];

  // Loop through each table and get the columns and row count
  for (const { table_name, column_name } of dbSchema) {
    // Find the index of the table in the tableInfo array
    const tableIndex = tableInfo.findIndex(
      (table) => table.table_name === table_name
    );

    if (tableIndex === -1) {
      // If the table is not already in the array, add it with columns and rowCount
      tableInfo.push({ table_name, columns: [column_name], rowCount: 0 });
    } else {
      // If the table is already in the array, update its columns
      tableInfo[tableIndex].columns.push(column_name);
    }
  }

  // Now, update the rowCount for each table
  for (const table of tableInfo) {
    // @ts-ignore
    table.rowCount = await prisma[table.table_name].count();
  }

  return {
    props: {
      schema: tableInfo,
    },
  };
};

export default function Home(
  props: any
): InferGetServerSidePropsType<typeof getServerSideProps> {
  return (
    <DndProvider backend={HTML5Backend}>
      <main
        className={`h-screen ${inter.className} flex flex-col relative bg-gray-100`}
      >
        {/* HEADER */}
        <HeaderButton />
        <PreviewButton />
        {/* CANVAS */}
        <div className="grow overflow-scroll flex flex-col items-center pt-6">
          <div className="w-[1280px] min-h-[800px] bg-white m-6 flex flex-col items-center justify-center">
            <BuilderTable componentId="table-12345678" />
          </div>
        </div>
        {/* DATA POPUP */}
        <DatabasePanelContainer schema={props.schema} />
      </main>
    </DndProvider>
  );
}
