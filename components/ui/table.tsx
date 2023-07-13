import * as React from "react";

import { cn } from "@/lib/utils";
import { useDrop } from "react-dnd";
import { ItemTypes } from "@/pages";
import useTableState from "@/lib/store";

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

interface TableHeadProps extends React.ThHTMLAttributes<HTMLTableCellElement> {
  droppable?: boolean;
  index?: number;
}

const TableHead = React.forwardRef<HTMLTableCellElement, TableHeadProps>(
  ({ className, index, ...props }) => {
    const updateColumn = useTableState((state) => state.updateColumn);
    const [showInlineMenu, setShowInlineMenu] = React.useState(false);
    const [leftOffset, setLeftOffset] = React.useState(0);
    const headerRef = React.useRef<HTMLTableCellElement>(null);

    const [{ isOver }, drop] = useDrop(() => ({
      accept: ItemTypes.FIELD_TAGS,
      drop: (item: { id: string; field_name: string }) => {
        console.log(
          `dropped ${item.field_name} with id ${item.id} at column_id ${index}`
        );
        const newColumn = {
          accessorKey: item.id,
          header: item.field_name,
        };
        updateColumn(index!, newColumn);
        return undefined;
      },
      collect: (monitor) => ({
        isOver: monitor.isOver(),
      }),
    }));

    React.useEffect(() => {
      if (headerRef.current) {
        const columnWidth = headerRef.current.getBoundingClientRect().width;
        setLeftOffset((columnWidth-32-120) / 2)
      }
    }, []);

    return (
      <th
        ref={(el: HTMLTableCellElement) => {
          // @ts-ignore
          drop(el); headerRef.current = el;
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
          console.log(leftOffset)
          setShowInlineMenu(!showInlineMenu);
        }}
      >
        <div
          className={cn(
            `absolute -top-[40px] w-[120px] h-[30px] rounded-sm bg-gray-200`,
            showInlineMenu ? "visible" : "hidden",
          )}
          style={{ marginLeft: leftOffset }}
        ></div>
        {props.children}
      </th>
    );
  }
);
TableHead.displayName = "TableHead";

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
  TableRow,
  TableCell,
  TableCaption,
};
