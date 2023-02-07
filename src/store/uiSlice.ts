import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { RootState } from "./store";
import { DrawerName, DrawerProps, ModalName, UiSliceState } from "../types";

const initialState: UiSliceState = {
  colorScheme: "light",
  modals: {
    name: "",
    props: {},
  },
  drawers: {
    name: "",
    props: {},
    payload: {},
  },
};

const uiSlice = createSlice({
  name: "ui",
  initialState,
  reducers: {
    toggleColorScheme: (state) => {
      state.colorScheme = state.colorScheme === "light" ? "dark" : "light";
    },
    openModal: (
      state,
      action: PayloadAction<{ name: ModalName; props?: any }>
    ) => {
      state.modals.name = action.payload.name;
      state.modals.props = action.payload.props;
    },
    closeModal: (state) => {
      state.modals = { name: "", props: {} };
    },
    openDrawer: (
      state,
      action: PayloadAction<{
        name: DrawerName;
        props?: DrawerProps;
        payload?: Record<string, any>;
      }>
    ) => {
      state.drawers.name = action.payload.name;
      state.drawers.props = action.payload.props;
      state.drawers.payload = action.payload.payload;
    },
    closeDrawer: (state) => {
      state.drawers = { name: "", props: {}, payload: null };
    },
  },
});

export const selectColorScheme = (state: RootState) => state.ui.colorScheme;
export const selectModalState = (state: RootState) => state.ui.modals;
export const selectDrawerState = (state: RootState) => state.ui.drawers;
export const {
  toggleColorScheme,
  openModal,
  closeModal,
  openDrawer,
  closeDrawer,
} = uiSlice.actions;
export default uiSlice.reducer;
