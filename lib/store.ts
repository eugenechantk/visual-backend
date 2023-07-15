import { ColumnDef } from "@tanstack/react-table";
import { create } from "zustand";

export type Payment = {
  id: string;
  amount: number;
  status: "pending" | "processing" | "success" | "failed";
  email: string;
  loanStartDate: Date;
  loanEndDate?: Date;
  amountPaid: number;
};

export const payments: Payment[] = [
  {
    id: "728ed52f",
    amount: 100,
    status: "pending",
    email: "m@example.com",
    loanStartDate: new Date(2023, 6, 12),
    amountPaid: 0,
  },
  {
    id: "489e1d42",
    amount: 125,
    status: "processing",
    email: "example@gmail.com",
    loanStartDate: new Date(2023, 6, 28),
    loanEndDate: new Date(2023, 7, 8),
    amountPaid: 125,
  },
  {
    id: "0d9d731b",
    amount: 100,
    status: "success",
    email: "test@abc.com",
    loanStartDate: new Date(2023, 5, 30),
    amountPaid: 75,
  },
];

type TableColumn = {
  accessorKey: string, header: string
}

export type TableComponentData = {
  source_data_table: string;
  columns: TableColumn[];
};

type TextComponentData = {
  data: {};
};

type AppState = {
  components: Record<
    string,
    { component_type: string; data: TableComponentData | TextComponentData }
  >;
};

type AppAction = {
  updateColumn: (componentId: string, columnId: number, newColumn: TableColumn) => void;
  updateTableSourceData: (componentId: string, newSourceData: string) => void;
}

const initAppState: AppState = {
  components: {
    "table-12345678": {
      component_type: "table",
      data: {
        source_data_table: "",
        columns: [
          {
            accessorKey: "new",
            header: "",
          },
          {
            accessorKey: "new",
            header: "",
          },
          {
            accessorKey: "new",
            header: "",
          }
        ]
      }
    }
  }
}

export const useAppState = create<AppState & AppAction>((set) => ({
  components: initAppState.components,
  updateColumn: (componentId: string, columnId: number, newColumn: TableColumn) => set((state) => ({
    components: {
      ...state.components,
      [componentId]: {
        ...state.components[componentId],
        data: {
          ...state.components[componentId].data,
          columns: [
            ...(state.components[componentId].data as TableComponentData).columns.slice(0, columnId),
            newColumn,
            ...(state.components[componentId].data as TableComponentData).columns.slice(columnId + 1),
          ]
        }
      }
    }
  })),
  updateTableSourceData: (componentId: string, newSourceData: string) => set((state) => ({
    components: {
      ...state.components,
      [componentId]: {
        ...state.components[componentId],
        data: {
          ...state.components[componentId].data,
          source_data_table: newSourceData
        }
      }
    }
  }))
}));

export default useAppState;
