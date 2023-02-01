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
}

export type ModalName = keyof typeof modalComponentsLookup;
