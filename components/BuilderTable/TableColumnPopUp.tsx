import { TableColumn } from "@/lib/store";
import {
  AddColumnLeft,
  AddColumnRight,
  ThDerived,
  Trash,
} from "@blueprintjs/icons";
import clsx from "clsx";
import _ from "lodash";

function TableColumnPopUp({
  show,
  item,
  sourceTable,
  addLeftColumn,
  addRightColumn,
  removeColumn,
}: {
  show: boolean;
  item: TableColumn;
  sourceTable: string;
  addLeftColumn: () => void;
  addRightColumn: () => void;
  removeColumn: () => void;
}) {
  return (
    <div
      className={clsx(
        "bg-[#374151] flex items-center gap-2 px-2 py-1 rounded h-fit absolute -top-[44px]",
        show ? "visible" : "hidden"
      )}
      style={{
        position: "absolute",
        top: "-44px",
        left: "50%",
        transform: "translate(-50%)",
      }}
    >
      {item.accessorKey !== "new" && (
        <>
          <div className="flex items-center gap-1.5">
            <ThDerived size={16} color="#9CA3AF" />
            <div className="text-base leading-[19px] text-gray-400 font-sans">
              {_.startCase(sourceTable)}
            </div>
            <div className="bg-[#e5e7eb] flex justify-center items-center gap-1 px-1.5 py-0.5 rounded border border-[#9ca3af] text-base leading-[19px] text-gray-500 font-mono">
              <div>{item.accessorKey}</div>
            </div>
          </div>
          <div className="w-[1px] h-5 bg-gray-500"></div>
        </>
      )}

      <div className="flex items-start gap-1 rounded">
        <button
          className="flex justify-center items-center gap-1 p-[6px] rounded hover:bg-[#6b7280]"
          onClick={addLeftColumn}
        >
          <AddColumnLeft size={16} color="#FFF" />
        </button>
        <button
          className="flex justify-center items-center gap-1 p-[6px] rounded hover:bg-[#6b7280]"
          onClick={addRightColumn}
        >
          <AddColumnRight size={16} color="#FFF" />
        </button>
      </div>
      <div className="w-[1px] h-5 bg-gray-500"></div>
      <button
        className="flex justify-center items-center gap-1 p-[6px] rounded hover:bg-[#6b7280]"
        onClick={removeColumn}
      >
        <Trash size={16} color="#FCA5A5" />
      </button>
    </div>
  );
}
export default TableColumnPopUp;
