import React, { useEffect } from "react";
import DraggableFieldTag from "./DraggableFieldTag";
import { TableSchema } from "@/pages";
import * as Tabs from "@radix-ui/react-tabs";
import TablePreview from "./TablePreview";

const TabOptions = {
  DATA: "Add Data",
  PROPERTIES: "Properties",
};

export default function DatabasePanelContainer({
  schema,
  ...props
}: {
  schema: TableSchema[];
}) {
  const [isOpen, setIsOpen] = React.useState(true);
  const [activeTab, setActiveTab] = React.useState(TabOptions.DATA);
  const [activeTable, setActiveTable] = React.useState(schema[0].table_name);

  return (
    <div className="absolute bottom-0 min-w-full">
      <button
        className="px-2 py-1 bg-white border-t border-x border-gray-200"
        onClick={() => setIsOpen(!isOpen)}
      >
        {isOpen ? "Close" : "Open"}
      </button>
      <div
        className={`w-full h-[300px] overflow-y-scroll bg-white border-t border-gray-200 flex flex-row ${
          isOpen ? "visible" : "hidden"
        }`}
      >
        {/* SELECTOR PANEL */}
        <div className="bg-white flex-col flex items-start border-r border-[#9ca3af] h-full w-[400px]">
          <Tabs.Root
            className="w-full"
            defaultValue={activeTab}
            onValueChange={(e) => setActiveTab(e)}
          >
            <Tabs.List className="w-full flex items-start gap-6 px-5 border-b border-[#e5e7eb] text-lg leading-[22px] font-medium text-black font-Inter">
              {Object.entries(TabOptions).map(([key, value], index) => (
                <Tabs.Trigger
                  key={index}
                  value={value}
                  className="flex justify-center items-center gap-1 py-5 data-[state=active]:border-b-2 data-[state=active]:border-black"
                >
                  {value}
                </Tabs.Trigger>
              ))}
            </Tabs.List>
          </Tabs.Root>
          {/* ADD DATA */}
          {activeTab === TabOptions.DATA && (
            <Tabs.Root
              orientation="vertical"
              className="w-full px-2 pt-4"
              defaultValue={activeTable}
              onValueChange={(e) => setActiveTable(e)}
            >
              <Tabs.List className="flex flex-col gap-2 w-full">
                {schema.map((table, index) => (
                  <Tabs.Trigger
                    className="data-[state=active]:bg-[#f3f4f6] w-full flex justify-between items-center p-3 rounded"
                    value={table.table_name}
                    key={index}
                  >
                    <div className="text-lg leading-[22px] text-black font-sans">
                      {table.table_name}
                    </div>
                    <div className="text-sm leading-[16px] text-[#6b7280] font-mono">
                      {`${table.rowCount} records`}
                    </div>
                  </Tabs.Trigger>
                ))}
              </Tabs.List>
            </Tabs.Root>
          )}
        </div>
        {/* PROPERTIES */}
        <div className="grow h-full overflow-y-scroll">
          {/* PREVIEW TABLE */}
          <TablePreview
            schema={
              schema[
                schema.findIndex((table) => table.table_name === activeTable)
              ]
            }
          />
        </div>
      </div>
    </div>
  );
}
