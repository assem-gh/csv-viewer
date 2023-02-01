import React, { useCallback, useMemo, useRef } from "react";
import { AgGridReact } from "ag-grid-react";
import { ColDef, GetRowIdParams } from "ag-grid-community";
import "ag-grid-community/styles/ag-grid.css";
import "ag-grid-community/styles/ag-theme-alpine.css";
import { Box } from "@mantine/core";
import { useAppSelector } from "../store/hooks";
import { selectAllRows, selectColumns } from "../store/gridSlice";
import { selectColorScheme } from "../store/uiSlice";

const DataGrid = () => {
  const data = useAppSelector(selectAllRows);
  const columns = useAppSelector(selectColumns);

  const getRowId = useCallback((params: GetRowIdParams) => {
    return params.data.__id;
  }, []);

  const colorScheme = useAppSelector(selectColorScheme);
  const gridTheme =
    colorScheme === "light" ? "ag-theme-alpine" : "ag-theme-alpine-dark";

  const gridRef = useRef<AgGridReact>(null);

  const defaultColDef = useMemo<ColDef>(
    () => ({
      sortable: true,
      filter: true,
      editable: true,
      flex: 1,
      resizable: true,
    }),
    []
  );

  return (
    <div>
      <Box
        className={gridTheme}
        px="md"
        pt="md"
        style={{ width: "100%", height: "calc(100vh - 124px)" }}
      >
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
        />
      </Box>
    </div>
  );
};

export default DataGrid;
