import { ColumnDef } from '@tanstack/react-table'
import { create } from 'zustand'




export type Payment = {
  id: string;
  amount: number;
  status: "pending" | "processing" | "success" | "failed";
  email: string;
  loanStartDate: Date;
  loanEndDate?: Date;
  amountPaid: number;
};

export const initColumn: ColumnDef<Payment>[] = [
  {
    accessorKey: "status",
    header: "Status",
  },
  {
    accessorKey: "email",
    header: "Email",
  },
  {
    accessorKey: "amount",
    header: "Amount",
  },
  {
    accessorKey: "loanStartDate",
    header: "Loan Start Date",
    cell: ({row}) => {
      // convert the Date object to a string in the format of "MM/DD/YYYY"
      const date = row.original.loanStartDate
      const dateString = `${date.getMonth() + 1}/${date.getDate()}/${date.getFullYear()}`
      return dateString
    }
  },
]

export const paymentTableSchema = {
  id: {
    id: 'id',
    name: 'Id',
    type: "string",
    unique: true,
    primary: true,
  },
  amount: {
    id: 'amount',
    name: 'Amount',
    type: "number",
    required: true,
  },
  status: {
    id: 'status',
    name: 'Status',
    type: "string",
    required: true,
  },
  email: {
    id: 'email',
    name: 'Email',
    type: "string",
    required: true,
  },
  loanStartDate: {
    id: 'loanStartDate',
    name: 'Loan Start Date',
    type: "date",
    required: true,
  },
  loanEndDate: {
    id: 'loanEndDate',
    name: 'Loan End Date',
    type: "date",
    required: false,
  },
  amountPaid: {
    id: 'amountPaid',
    name: 'Amount Paid',
    type: "number",
    required: true,
  }
}

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

export interface TableState {
  columns: ColumnDef<Payment>[]
  data: Payment[]
}

export interface TableAction {
  updateColumn: (column_id: number, field:ColumnDef<Payment>) => void
}

const useTableState = create<TableState & TableAction>((set) => ({
  columns: initColumn,
  data: payments,
  updateColumn: (column_id: number, field:ColumnDef<Payment>) => set((state) => ({ columns: [...state.columns.slice(0,column_id), field, ...state.columns.slice(column_id + 1)] }))
}))

export default useTableState