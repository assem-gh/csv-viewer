import { createSlice } from "@reduxjs/toolkit";
import { ColorScheme } from "@mantine/core";
import { RootState } from "./store";

interface UiSliceState {
  colorScheme: ColorScheme;
}

const initialState: UiSliceState = {
  colorScheme: "light",
};

const uiSlice = createSlice({
  name: "ui",
  initialState,
  reducers: {
    toggleColorScheme: (state) => {
      state.colorScheme = state.colorScheme === "light" ? "dark" : "light";
    },
  },
});

export const selectColorScheme = (state: RootState) => state.ui.colorScheme;
export const { toggleColorScheme } = uiSlice.actions;
export default uiSlice.reducer;
