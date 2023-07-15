import React from "react";
import DraggableFieldTag from "./DraggableFieldTag";

export default function DatabasePanelContainer({
  className,
  schema,
  ...props
}: {
  className?: string;
  schema: Record<string, { columns: string[] }>;
}) {
  const [isOpen, setIsOpen] = React.useState(true);
  return (
    <div className="absolute bottom-0 min-w-full">
      <button
        className="px-2 py-1 bg-white border-t border-x border-gray-200"
        onClick={() => setIsOpen(!isOpen)}
      >
        {isOpen ? "Close" : "Open"}
      </button>
      <div
        className={`w-full h-[200px] overflow-y-scroll bg-white border-t border-gray-200 ${className} ${
          isOpen ? "visible" : "hidden"
        }`}
      >
        <div className="flex flex-row flex-wrap gap-2 m-4">
          {Object.entries(schema).map(([key, value], index) => (
            <div key={index} className="flex flex-col gap-2">
              <h3>{key}</h3>
              {value.columns.map((column, index) => (
                <DraggableFieldTag key={index} tableName={key.toLowerCase()} columnName={column} />
              ))}
            </div>
          ))}
          {/* {Object.values(paymentTableSchema).map((key, index) => (<DraggableFieldTag key={index} id={key.id} name={key.name} />))} */}
        </div>
      </div>
    </div>
  );
}
