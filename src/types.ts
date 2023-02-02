import { ColDef } from "ag-grid-community";
import { modalComponentsLookup } from "./Components/modals/AppModal";

export type RowData = {
  __id: number;
} & { [key: string]: string };

export interface GridState {
  filename: string;
  fileSize: string;
  columns: ColDef[];
  headers: string[];
  loading: boolean;
  selectedRows: number[];
}

export type ModalName = keyof typeof modalComponentsLookup;
