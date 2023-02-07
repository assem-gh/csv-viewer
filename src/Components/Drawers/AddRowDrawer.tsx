import React, { ChangeEvent, useCallback, useMemo, useState } from "react";
import {
  insertRow,
  selectColumnNames,
  selectColumns,
  selectLastId,
} from "../../store/gridSlice";
import { useAppDispatch, useAppSelector } from "../../store/hooks";
import { closeDrawer, selectDrawerState } from "../../store/uiSlice";
import {
  Box,
  Button,
  Group,
  NumberInput,
  ScrollArea,
  Stack,
  Textarea,
  TextInput,
} from "@mantine/core";

const AddRowDrawer = () => {
  const columns = useAppSelector(selectColumns);
  const headers = useAppSelector(selectColumnNames);
  const latestId = useAppSelector(selectLastId);
  const { name, payload } = useAppSelector(selectDrawerState);
  const dispatch = useAppDispatch();

  const initialState: Record<(typeof headers)[number], any> = useMemo(
    () =>
      columns.reduce((acc, col) => {
        if (col.name === "__id") return { ...acc, __id: 0 };
        return { ...acc, [col.name]: "" };
      }, {}),
    []
  );
  const [data, setData] = useState(initialState);

  const onNumberInputChange = useCallback(
    (value: number | undefined) => {
      if (value) setData((prev) => ({ ...prev, [name]: value }));
    },
    [name]
  );

  const onInputChange = useCallback(
    (evt: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
      const { name, value } = evt.target;
      setData((prev) => ({ ...prev, [name]: value }));
    },
    []
  );

  const onSaveForm = useCallback(() => {
    dispatch(
      insertRow({ rowPos: payload.pos, data: { ...data, __id: latestId + 1 } })
    );
    dispatch(closeDrawer());
    setData(initialState);
  }, [dispatch, data, latestId, initialState]);

  const onCancel = useCallback(() => {
    setData(initialState);
    dispatch(closeDrawer());
  }, [initialState, dispatch]);

  const fields = useMemo(() => {
    return columns.map((col) => {
      if (col.name === "__id") return null;
      if (col.format === "longText")
        return (
          <Textarea
            key={col.name}
            value={data[col.name]}
            name={col.name}
            label={col.name}
            minRows={3}
            onChange={onInputChange}
          />
        );
      if (col.type === "number")
        return (
          <NumberInput
            key={col.name}
            value={data[col.name]}
            name={col.name}
            label={col.name}
            onChange={onNumberInputChange}
          />
        );
      return (
        <TextInput
          key={col.name}
          value={data[col.name]}
          name={col.name}
          label={col.name}
          onChange={onInputChange}
        />
      );
    });
  }, [data, onInputChange, onNumberInputChange]);

  return (
    <Stack>
      <ScrollArea>
        <Box sx={{ overflow: "auto" }}>{fields}</Box>
      </ScrollArea>{" "}
      <Group grow>
        <Button variant="outline" onClick={onCancel}>
          Cancel
        </Button>
        <Button onClick={onSaveForm}>Save</Button>
      </Group>
    </Stack>
  );
};

export default AddRowDrawer;
