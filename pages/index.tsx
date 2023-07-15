import Image from "next/image";
import { Inter } from "next/font/google";

import DatabasePanelContainer from "@/components/DatabasePanel/DatabasePanelContainer";
import { DndProvider, useDrop } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";
import { BuilderTable } from "@/components/BuilderTable/BuilderTable";
import { useCallback } from "react";
import useAppState, { TableComponentData, payments } from "@/lib/store";

const inter = Inter({ subsets: ["latin"] });

export const ItemTypes = {
  FIELD_TAGS: "field-tags",
};


export default function Home() {
  const components = useAppState((state) => state.components);
  return (
    <DndProvider backend={HTML5Backend}>
      <main
        className={`min-h-screen ${inter.className} bg-gray-100 overflow-scroll`}
      >
        {/* CANVAS */}
        <div className="w-[1280px] min-h-[720px] bg-white m-6 flex flex-col items-center justify-center">
          <BuilderTable columns={(components['table-12345678'].data as TableComponentData).columns} data={payments}/>
        </div>
        {/* DATA POPUP */}
        <DatabasePanelContainer />
      </main>
    </DndProvider>
  );
}
