import {
  createAsyncThunk,
  createEntityAdapter,
  createSlice,
} from "@reduxjs/toolkit";
import { RootState } from "./store";
import { parseCsv } from "../helpers/parseCsv";
import { GridState, RowData } from "../types";
import { formatFileSize } from "../helpers/formatFileSize";

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

    return {
      filename: file?.name || "",
      fileSize: formatFileSize(file?.size!),
      data,
      headers,
      columns,
    };
  }
);

const rowsAdapter = createEntityAdapter<RowData>({
  selectId: (row) => row.__id,
});

const gridSlice = createSlice({
  name: "grid",
  initialState: rowsAdapter.getInitialState<GridState>({
    filename: "",
    fileSize: "",
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
      const { data, ...rest } = action.payload;
      state.loading = false;
      Object.assign(state, rest);
      rowsAdapter.setAll(state, data);
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
export const {
  selectAll: selectAllRows,
  selectEntities: selectRows,
  selectTotal: selectRowsTotal,
} = rowsSelectors;
export const selectColumns = (state: RootState) => state.grid.columns;
export const selectFileInfo = (state: RootState) => ({
  name: state.grid.filename,
  size: state.grid.fileSize,
});
export default gridSlice.reducer;
