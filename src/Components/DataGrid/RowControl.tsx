import React, { useCallback } from "react";
import { ActionIcon, Group, Text, Tooltip } from "@mantine/core";
import {
  BsArrowBarDown,
  BsArrowBarUp,
  BsTrash,
  BsXCircle,
} from "react-icons/bs";
import { useAppDispatch, useAppSelector } from "../../store/hooks";
import { removeRows, selectSelectedRows } from "../../store/gridSlice";

interface RowControlProps {
  onAddRow: (pos: number) => () => void;
  onUnselectRows: () => void;
}

const RowControl = ({ onAddRow, onUnselectRows }: RowControlProps) => {
  const selectedRows = useAppSelector(selectSelectedRows);
  const dispatch = useAppDispatch();

  const onDeleteRows = useCallback(() => {
    dispatch(removeRows(selectedRows));
  }, [dispatch, selectedRows]);

  return (
    <Group align="center" h="100%" spacing={0} pl={12}>
      <Tooltip label="Delete">
        <ActionIcon w={40} h={40} onClick={onDeleteRows}>
          <BsTrash size={18} />
        </ActionIcon>
      </Tooltip>

      <Tooltip label="Insert Above">
        <ActionIcon h={40} w={40} onClick={onAddRow(1)}>
          <BsArrowBarUp size={18} />
        </ActionIcon>
      </Tooltip>
      <Tooltip label="Insert Below">
        <ActionIcon w={40} h={40} onClick={onAddRow(-1)}>
          <BsArrowBarDown size={18} />
        </ActionIcon>
      </Tooltip>

      <Tooltip label="Unselect">
        <ActionIcon w={40} h={40} onClick={onUnselectRows}>
          <BsXCircle size={18} />
        </ActionIcon>
      </Tooltip>
      <Text size="sm" weight="bold" ml={12}>
        {`${selectedRows.length} item${selectedRows.length !== 1 ? "s " : " "}`}
        selected
      </Text>
    </Group>
  );
};

export default RowControl;
