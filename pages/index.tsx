import Image from "next/image";
import { Inter } from "next/font/google";

import DatabasePanelContainer from "@/components/DatabasePanel/DatabasePanelContainer";
import { DndProvider, useDrop } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";
import { BuilderTable } from "@/components/BuilderTable/BuilderTable";
import getPrismaInstance from "@/lib/prisma";
import { GetServerSideProps, InferGetServerSidePropsType } from "next";

const inter = Inter({ subsets: ["latin"] });

export const ItemTypes = {
  FIELD_TAGS: "field-tags",
};


export default function Home() {
  return (
    <DndProvider backend={HTML5Backend}>
      <main
        className={`min-h-screen ${inter.className} bg-gray-100 overflow-scroll`}
      >
        {/* CANVAS */}
        <div className="w-[1280px] min-h-[720px] bg-white m-6 flex flex-col items-center justify-center">
          <BuilderTable componentId='table-12345678' />
        </div>
        {/* DATA POPUP */}
        <DatabasePanelContainer />
      </main>
    </DndProvider>
  );
}
