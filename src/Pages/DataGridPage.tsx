import React, { useCallback, useMemo, useRef } from "react";
import { AgGridReact } from "ag-grid-react";
import { ColDef, GetRowIdParams, ValueSetterParams } from "ag-grid-community";
import "ag-grid-community/styles/ag-grid.css";
import "ag-grid-community/styles/ag-theme-alpine.css";
import { Box } from "@mantine/core";
import { useAppDispatch, useAppSelector } from "../store/hooks";
import {
  selectAllRows,
  selectColumnNames,
  updateRow,
  updateSelectedRows,
} from "../store/gridSlice";
import { selectColorScheme } from "../store/uiSlice";
import DataGridToolbar from "../Components/DataGrid/DataGridToolbar";
import { useNavigate } from "react-router-dom";

const DataGridPage = () => {
  const data = useAppSelector(selectAllRows);
  const columnNames = useAppSelector(selectColumnNames);

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

  const columnDefs: ColDef[] = useMemo(
    () =>
      columnNames.map((name, i) => ({
        field: name,
        hide: name === "__id",
        headerCheckboxSelection: i === 0,
        checkboxSelection: i === 0,
      })),
    [columnNames]
  );

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
  }, [dispatch]);

  const onGridReady = () => {
    if (columnNames.length < 1) navigate("/");
  };

  return (
    <div>
      <Box
        className={gridTheme}
        px="md"
        pt="md"
        sx={{ width: "100%", height: "calc(100vh - 124px)" }}
      >
        <DataGridToolbar gridRef={gridRef} />
        <AgGridReact
          ref={gridRef}
          pagination={true}
          rowData={data}
          columnDefs={columnDefs}
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

export default DataGridPage;
