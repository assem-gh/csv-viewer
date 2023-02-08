import { modalComponentsLookup } from "./Components/Modals/AppModal";
import { ColorScheme } from "@mantine/core";
import { drawerComponentsLookup } from "./Components/Drawers/AppDrawer";

export type RowData = {
  __id: number;
} & { [key: string]: string };

export interface GridState {
  filename: string;
  fileSize: string;
  columns: {
    name: string;
    type: ValueType;
    format: ValueFormat;
    _id: number;
  }[];
  loading: boolean;
  lastId: number;
  selectedRows: number[];
}

export interface UiSliceState {
  colorScheme: ColorScheme;
  modals: {
    name: ModalName | "";
    props: any;
  };
  drawers: {
    name: DrawerName | "";
    props?: DrawerProps;
    payload?: any;
  };
}
export type ValueType = "string" | "number" | "boolean";
export type ValueFormat =
  | "unit"
  | "date"
  | "currency"
  | "text"
  | "longText"
  | "number"
  | "percentage";
export type ModalName = keyof typeof modalComponentsLookup;
export type DrawerName = keyof typeof drawerComponentsLookup;

export interface DrawerProps {
  size?: string | number;
  title?: string;
}
export interface ChartFormDataType {
  category: string;
  value: string;
  calculation: CalculationType;
  percentage: boolean;
}
export type CalculationType = "sum" | "count";
