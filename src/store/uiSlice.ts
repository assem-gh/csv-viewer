import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { ColorScheme } from "@mantine/core";
import { RootState } from "./store";
import { ModalName } from "../types";

interface UiSliceState {
  colorScheme: ColorScheme;
  modals: {
    name: ModalName | "";
    props: any;
  };
}

const initialState: UiSliceState = {
  colorScheme: "light",
  modals: {
    name: "",
    props: {},
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
  },
});

export const selectColorScheme = (state: RootState) => state.ui.colorScheme;
export const selectModalState = (state: RootState) => state.ui.modals;
export const { toggleColorScheme, openModal, closeModal } = uiSlice.actions;
export default uiSlice.reducer;
