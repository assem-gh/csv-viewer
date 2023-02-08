import {
  createAsyncThunk,
  createEntityAdapter,
  createSelector,
  createSlice,
} from "@reduxjs/toolkit";
import { RootState } from "./store";
import { parseCsv } from "../helpers/parseCsv";
import { GridState, RowData } from "../types";
import { formatFileSize } from "../helpers/formatFileSize";
import { getDataFormat } from "../helpers/dataFormat";

export const setGridData = createAsyncThunk(
  "grid/setGridData",
  async (file: File | undefined) => {
    const result = await parseCsv(file);
    const headers = ["__id", ...(result.meta.fields || [])];

    const data = result.data.map((row, i) => ({
      ...row,
      __id: i,
    }));

    const columns = getDataFormat(data, headers);
    return {
      filename: file?.name || "Artikel.csv",
      fileSize: formatFileSize(file?.size || 1801666),
      data,
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
    selectedRows: [],
    loading: false,
    lastId: 0,
  }),
  reducers: {
    updateSelectedRows: (state, action) => {
      state.selectedRows = action.payload;
    },
    updateRow: (state, action) => {
      rowsAdapter.setOne(state, action.payload);
    },
    removeRows: (state, action) => {
      rowsAdapter.removeMany(state, action.payload);
    },
    insertRow: (state, action) => {
      const { rowPos, data } = action.payload;
      if (rowPos === 0) rowsAdapter.setOne(state, data);
      else {
        const indexToInsert =
          rowPos === 1
            ? state.ids.findIndex((id) => state.selectedRows[0] === id)
            : state.ids.findIndex(
                (id) => state.selectedRows[state.selectedRows.length - 1] === id
              ) + 1;
        state.ids = [
          ...state.ids.slice(0, indexToInsert),
          data.__id,
          ...state.ids.slice(indexToInsert),
        ];
        state.entities[data.__id] = data;
      }
      state.lastId = state.lastId + 1;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(setGridData.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(setGridData.fulfilled, (state, action) => {
      const { data, ...rest } = action.payload;
      state.loading = false;
      state.lastId = data[data.length - 1].__id;
      Object.assign(state, rest);
      rowsAdapter.setAll(state, data);
    });
    builder.addCase(setGridData.rejected, (state) => {
      state.loading = false;
    });
  },
});

export const { updateSelectedRows, updateRow, removeRows, insertRow } =
  gridSlice.actions;

const rowsSelectors = rowsAdapter.getSelectors(
  (state: RootState) => state.grid
);

export const { selectAll: selectAllRows, selectTotal: selectRowsTotal } =
  rowsSelectors;

export const selectColumnNames = createSelector(
  (state: RootState) => state.grid.columns,
  (columns) =>
    columns.filter((col) => col.name !== "__id").map((col) => col.name)
);
export const selectColumns = (state: RootState) => state.grid.columns;
export const selectLastId = (state: RootState) => state.grid.lastId;
export const selectSelectedRows = (state: RootState) => state.grid.selectedRows;
export const selectFileInfo = (state: RootState) => ({
  name: state.grid.filename,
  size: state.grid.fileSize,
});

export default gridSlice.reducer;
