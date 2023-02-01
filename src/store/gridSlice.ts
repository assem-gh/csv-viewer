import {
  createAsyncThunk,
  createEntityAdapter,
  createSlice,
} from "@reduxjs/toolkit";
import { RootState } from "./store";
import { parseCsv } from "../helpers/parseCsv";
import { GridState, RowData } from "../types";

export const setGridData = createAsyncThunk(
  "grid/setGridData",
  async (file: File | undefined) => {
    const result = await parseCsv(file);
    const headers = ["__id", ...(result.meta.fields || [])];
    const columns = headers.map((header, i) => ({
      field: header,
      hide: header === "__id",
      headerCheckboxSelection: i === 1,
      checkboxSelection: i === 1,
    }));
    const data = result.data.map((row, i) => ({
      ...row,
      __id: i,
    }));
    return { data, headers, columns };
  }
);

const rowsAdapter = createEntityAdapter<RowData>({
  selectId: (row) => row.__id,
});

const gridSlice = createSlice({
  name: "grid",
  initialState: rowsAdapter.getInitialState<GridState>({
    columns: [],
    headers: [],
    loading: false,
  }),
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(setGridData.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(setGridData.fulfilled, (state, action) => {
      state.loading = false;
      state.headers = action.payload.headers;
      state.columns = action.payload.columns;
      rowsAdapter.setAll(state, action.payload.data);
    });
    builder.addCase(setGridData.rejected, (state) => {
      state.loading = false;
    });
  },
});

export const {} = gridSlice.actions;

const rowsSelectors = rowsAdapter.getSelectors(
  (state: RootState) => state.grid
);
export const { selectAll: selectAllRows, selectEntities: selectRows } =
  rowsSelectors;

export default gridSlice.reducer;
