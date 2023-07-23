import * as React from "react";

import { cn } from "@/lib/utils";
import { useDrop } from "react-dnd";
import { ItemTypes } from "@/pages";
import useAppState, { TableComponentData } from "@/lib/store";
import { useDetectClickOutside } from "react-detect-click-outside";
import TableColumnPopUp from "../BuilderTable/TableColumnPopUp";

const Table = React.forwardRef<
  HTMLTableElement,
  React.HTMLAttributes<HTMLTableElement>
>(({ className, ...props }, ref) => (
  <table
    ref={ref}
    className={cn("w-full caption-bottom text-sm", className)}
    {...props}
  />
));
Table.displayName = "Table";

const TableHeader = React.forwardRef<
  HTMLTableSectionElement,
  React.HTMLAttributes<HTMLTableSectionElement>
>(({ className, ...props }, ref) => {
  return (
    <thead ref={ref} className={cn("[&_tr]:border-b", className)} {...props} />
  );
});
TableHeader.displayName = "TableHeader";

const TableBody = React.forwardRef<
  HTMLTableSectionElement,
  React.HTMLAttributes<HTMLTableSectionElement>
>(({ className, ...props }, ref) => (
  <tbody
    ref={ref}
    className={cn("[&_tr:last-child]:border-0", className)}
    {...props}
  />
));
TableBody.displayName = "TableBody";

const TableFooter = React.forwardRef<
  HTMLTableSectionElement,
  React.HTMLAttributes<HTMLTableSectionElement>
>(({ className, ...props }, ref) => (
  <tfoot
    ref={ref}
    className={cn(
      "bg-slate-900 font-medium text-slate-50 dark:bg-slate-50 dark:text-slate-900",
      className
    )}
    {...props}
  />
));
TableFooter.displayName = "TableFooter";

const TableRow = React.forwardRef<
  HTMLTableRowElement,
  React.HTMLAttributes<HTMLTableRowElement>
>(({ className, ...props }, ref) => (
  <tr
    ref={ref}
    className={cn(
      "border-b transition-colors hover:bg-slate-100/50 data-[state=selected]:bg-slate-100 dark:hover:bg-slate-800/50 dark:data-[state=selected]:bg-slate-800",
      className
    )}
    {...props}
  />
));
TableRow.displayName = "TableRow";

interface BuilderTableHeadProps
  extends React.ThHTMLAttributes<HTMLTableCellElement> {
  droppable?: boolean;
  index?: number;
  componentId: string;
}

const BuilderTableHead = React.forwardRef<
  HTMLTableCellElement,
  BuilderTableHeadProps
>(({ className, index, componentId, ...props }) => {
  const [componentData, updateColumn, addColumn, updateTableSourceData, deleteColumn] = useAppState(
    (state) => [
      state.components[componentId].data as TableComponentData,
      state.updateColumn,
      state.addColumn,
      state.updateTableSourceData,
      state.deleteColumn,
    ]
  );
  const [showInlineMenu, setShowInlineMenu] = React.useState(false);
  const headerRef = React.useRef<HTMLTableCellElement>(null);
  const popUpRef = useDetectClickOutside({
    onTriggered: () => {
      setShowInlineMenu(false);
    },
  });

  const [{ isOver }, drop] = useDrop(() => ({
    accept: ItemTypes.FIELD_TAGS,
    drop: (item: {
      tableName: string;
      columnName: string;
      displayName: string;
    }) => {
      console.log(
        `dropped ${item.columnName} from ${item.tableName} at column_id ${index}`
      );

      if (index === 0) {
        updateTableSourceData(componentId, item.tableName.toLowerCase());
      }

      const newColumn = {
        accessorKey: item.columnName,
        header: item.displayName,
      };

      updateColumn(componentId, index!, newColumn);
      return undefined;
    },
    collect: (monitor) => ({
      isOver: monitor.isOver(),
    }),
  }));

  // Function to add a new column left of the current column
  const addNewColumnLeft = () => {
    console.log("add new column left at index", index);
    addColumn(componentId, index!);
  };

  // Function to add a new column right of the current column
  const addNewColumnRight = () => {
    console.log("add new column right at index", index! + 1);
    addColumn(componentId, index! + 1);
  };

  // Function to delete the current column
  const removeColumn = () => {
    deleteColumn(componentId, index!);
  };

  return (
    <th
      ref={(el: HTMLTableCellElement) => {
        
        drop(el);
        // @ts-ignore
        headerRef.current = el;
        // @ts-ignore
        popUpRef.current = el;
      }}
      className={cn(
        "h-12 px-4 text-left align-middle font-medium text-slate-500 [&:has([role=checkbox])]:pr-0 dark:text-slate-400 cursor-pointer relative",
        isOver && "outline outline-offset-2 outline-indigo-600 rounded-sm",
        "hover:outline hover:outline-offset-2 hover:outline-indigo-600 hover:rounded-sm",
        "active:outline active:outline-offset-2 active:outline-indigo-600 active:rounded-sm",
        className
      )}
      {...props}
      onClick={() => {
        setShowInlineMenu(!showInlineMenu);
      }}
    >
      <TableColumnPopUp
        addLeftColumn={addNewColumnLeft}
        addRightColumn={addNewColumnRight}
        removeColumn={removeColumn}
        sourceTable={componentData.source_data_table}
        item={componentData.columns[index!]}
        show={showInlineMenu}
      />
      {props.children}
    </th>
  );
});
BuilderTableHead.displayName = "BuilderTableHead";

interface TableHeadProps extends React.ThHTMLAttributes<HTMLTableCellElement> {
  className?: string;
  index?: number;
}

const TableHead = React.forwardRef<HTMLTableCellElement, TableHeadProps>(
  ({ className, index, ...props }) => {
    return (
      <th
        className={cn(
          "h-12 px-4 text-left align-middle font-medium text-slate-500 [&:has([role=checkbox])]:pr-0 dark:text-slate-400 cursor-pointer relative",
          className
        )}
        {...props}
      >
        {props.children}
      </th>
    );
  }
);
TableHead.displayName = "BuilderTableHead";

const TableCell = React.forwardRef<
  HTMLTableCellElement,
  React.TdHTMLAttributes<HTMLTableCellElement>
>(({ className, ...props }, ref) => (
  <td
    ref={ref}
    className={cn("p-4 align-middle [&:has([role=checkbox])]:pr-0", className)}
    {...props}
  />
));
TableCell.displayName = "TableCell";

const TableCaption = React.forwardRef<
  HTMLTableCaptionElement,
  React.HTMLAttributes<HTMLTableCaptionElement>
>(({ className, ...props }, ref) => (
  <caption
    ref={ref}
    className={cn("mt-4 text-sm text-slate-500 dark:text-slate-400", className)}
    {...props}
  />
));
TableCaption.displayName = "TableCaption";

export {
  Table,
  TableHeader,
  TableBody,
  TableFooter,
  TableHead,
  BuilderTableHead,
  TableRow,
  TableCell,
  TableCaption,
};
