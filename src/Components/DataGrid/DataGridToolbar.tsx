import React, { memo, RefObject, useCallback } from "react";
import { Divider, Flex } from "@mantine/core";
import { AgGridReact } from "ag-grid-react";
import { useAppDispatch, useAppSelector } from "../../store/hooks";
import RowControl from "./RowControl";
import PaginationControl from "./PaginationControl";
import DataGridActions from "./DataGridActions";
import { selectSelectedRows } from "../../store/gridSlice";
import { openDrawer } from "../../store/uiSlice";

interface DataGridToolbarProps {
  gridRef: RefObject<AgGridReact>;
}

const DataGridToolbar = memo(({ gridRef }: DataGridToolbarProps) => {
  const selectedRows = useAppSelector(selectSelectedRows) || 0;
  const dispatch = useAppDispatch();
  const onFileDownload = useCallback(() => {
    const exportConfig = { onlySelected: selectedRows.length > 0 };
    gridRef.current!.api.exportDataAsCsv(exportConfig);
  }, []);

  const onUnselectRows = useCallback(() => {
    gridRef.current?.api.deselectAll();
  }, []);

  const onAddRow = useCallback(
    (pos: number) => () => {
      dispatch(
        openDrawer({
          name: "addRow",
          props: { title: "Add new Row" },
          payload: { pos },
        })
      );
    },
    []
  );

  const setPageSize = useCallback((size: number) => {
    gridRef.current!.api.paginationSetPageSize(size);
  }, []);

  const goToPage = useCallback((pageTarget: number) => {
    gridRef.current?.api.paginationGoToPage(pageTarget - 1);
  }, []);

  return (
    <>
      <Flex
        gap="md"
        justify="flex-end"
        align="center"
        direction="row"
        py={8}
        h={56}
      >
        {selectedRows.length > 0 && (
          <RowControl onAddRow={onAddRow} onUnselectRows={onUnselectRows} />
        )}
        <Divider mx="lg" orientation="vertical" />
        <PaginationControl goToPage={goToPage} setPageSize={setPageSize} />
        <Divider mx="lg" orientation="vertical" />
        <DataGridActions onAddRow={onAddRow} onFileDownload={onFileDownload} />
      </Flex>
    </>
  );
});

export default DataGridToolbar;
