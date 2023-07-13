import Image from "next/image";
import { Inter } from "next/font/google";

import DatabasePanelContainer from "@/components/DatabasePanel/DatabasePanelContainer";
import { DndProvider, useDrop } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";
import { BuilderTable } from "@/components/BuilderTable/BuilderTable";
import { useCallback } from "react";
import { columns } from "@/components/BuilderTable/BuilderColumn";

const inter = Inter({ subsets: ["latin"] });

export const ItemTypes = {
  FIELD_TAGS: "field-tags",
};

type Payment = {
  id: string;
  amount: number;
  status: "pending" | "processing" | "success" | "failed";
  email: string;
};

export const payments: Payment[] = [
  {
    id: "728ed52f",
    amount: 100,
    status: "pending",
    email: "m@example.com",
  },
  {
    id: "489e1d42",
    amount: 125,
    status: "processing",
    email: "example@gmail.com",
  },
  {
    id: "0d9d731b",
    amount: 100,
    status: "success",
    email: "test@abc.com",
  },
];

export default function Home() {
  return (
    <DndProvider backend={HTML5Backend}>
      <main
        className={`min-h-screen ${inter.className} bg-gray-100 overflow-scroll`}
      >
        {/* CANVAS */}
        <div className="w-[1280px] min-h-[720px] bg-white m-6 flex flex-col items-center justify-center">
          <BuilderTable columns={columns} data={payments}/>
        </div>
        {/* DATA POPUP */}
        <DatabasePanelContainer />
      </main>
    </DndProvider>
  );
}
