import { ColDef } from "ag-grid-community";

export type RowData = {
  __id: number;
} & { [key: string]: string };

export interface GridState {
  columns: ColDef[];
  headers: string[];
  loading: boolean;
}
