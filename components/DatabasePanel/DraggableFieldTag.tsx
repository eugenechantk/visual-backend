import { ItemTypes } from "@/pages";
import React from "react";
import { useDrag } from "react-dnd";
import { DragHandleVertical } from "@blueprintjs/icons";
import { TableIcon } from "lucide-react";

export default function DraggableFieldTag({
  tableName,
  columnName,
  draggable,
}: {
  tableName: string;
  columnName: string;
  draggable?: boolean;
}) {
  const formattedColumnName = columnName.replace(/([A-Z])/g, " $1");
  const displayName =
    formattedColumnName.charAt(0).toUpperCase() + formattedColumnName.slice(1);

  const [{ isDragging }, drag] = useDrag(() => ({
    type: ItemTypes.FIELD_TAGS,
    item: { tableName, columnName, displayName },
    collect: (monitor) => ({
      isDragging: !!monitor.isDragging(),
    }),
  }));
  
  return (
    <div
      className="bg-[#f3f4f6] flex justify-center items-center gap-1 py-1 pr-1.5 pl-1 rounded border border-[#9ca3af] w-fit h-fit"
      ref={drag}
    >
      {draggable && <DragHandleVertical size={16} />}
      <div className="text-base leading-[21px] text-[#4b5563] font-mono">
        {columnName}
      </div>
      {!draggable && <TableIcon size={16} className="text-[#4b5563]" />}
    </div>
  );
}
