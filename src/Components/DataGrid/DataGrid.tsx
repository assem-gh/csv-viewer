import React, { useCallback, useMemo, useRef } from "react";
import { AgGridReact } from "ag-grid-react";
import { ColDef, GetRowIdParams, ValueSetterParams } from "ag-grid-community";
import "ag-grid-community/styles/ag-grid.css";
import "ag-grid-community/styles/ag-theme-alpine.css";
import { Box } from "@mantine/core";
import { useAppDispatch, useAppSelector } from "../../store/hooks";
import {
  selectAllRows,
  selectColumns,
  updateRow,
  updateSelectedRows,
} from "../../store/gridSlice";
import { selectColorScheme } from "../../store/uiSlice";
import DataGridToolbar from "./DataGridToolbar";
import { useNavigate } from "react-router-dom";

const DataGrid = () => {
  const data = useAppSelector(selectAllRows);
  const columns = useAppSelector(selectColumns);
  const gridRef = useRef<AgGridReact>(null);

  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const getRowId = useCallback((params: GetRowIdParams) => {
    return params.data.__id;
  }, []);

  const colorScheme = useAppSelector(selectColorScheme);
  const gridTheme =
    colorScheme === "light" ? "ag-theme-alpine" : "ag-theme-alpine-dark";

  const saveNewValue = (params: ValueSetterParams) => {
    let field = params.column.getColId();
    let newRow = { ...params.data };
    newRow[field] = params.newValue;
    dispatch(updateRow(newRow));
    return false;
  };

  const defaultColDef = useMemo<ColDef>(
    () => ({
      sortable: true,
      filter: true,
      editable: true,
      flex: 1,
      resizable: true,
      valueSetter: saveNewValue,
    }),
    []
  );
  const onSelectionChanged = useCallback(() => {
    dispatch(
      updateSelectedRows(
        gridRef.current!.api.getSelectedRows().map((row) => row.__id)
      )
    );
  }, []);

  const onGridReady = () => {
    if (columns.length < 1) navigate("/");
  };

  return (
    <div>
      <Box
        className={gridTheme}
        px="md"
        pt="md"
        style={{ width: "100%", height: "calc(100vh - 124px)" }}
      >
        <DataGridToolbar gridRef={gridRef} />
        <AgGridReact
          ref={gridRef}
          pagination={true}
          rowData={data}
          columnDefs={columns}
          defaultColDef={defaultColDef}
          rowSelection="multiple"
          suppressRowClickSelection={true}
          paginationPageSize={20}
          getRowId={getRowId}
          suppressAutoSize={true}
          onSelectionChanged={onSelectionChanged}
          onGridReady={onGridReady}
        />
      </Box>
    </div>
  );
};

export default DataGrid;
