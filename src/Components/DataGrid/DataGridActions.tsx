import React from "react";
import { ActionIcon, Group, Tooltip } from "@mantine/core";
import { BsBarChartLine, BsCloudDownload, BsPlusSquare } from "react-icons/bs";
import FileUploadButton from "../FileUploadButton";
import { useAppDispatch } from "../../store/hooks";
import { openModal } from "../../store/uiSlice";

interface DataGridActionsProps {
  onAddRow: (pos: number) => () => void;
  onFileDownload: () => void;
}

const DataGridActions = ({
  onAddRow,
  onFileDownload,
}: DataGridActionsProps) => {
  const dispatch = useAppDispatch();
  const onOpenChart = () => {
    dispatch(
      openModal({
        name: "chart",
        props: { fullScreen: true, withCloseButton: true },
      })
    );
  };

  return (
    <Group>
      <Tooltip label="New Row">
        <ActionIcon
          onClick={onAddRow(0)}
          color="primary"
          variant="light"
          w={40}
          h={40}
        >
          <BsPlusSquare size={24} />
        </ActionIcon>
      </Tooltip>

      <Tooltip label="Chart">
        <ActionIcon
          h={40}
          w={40}
          color="primary"
          variant="light"
          onClick={onOpenChart}
        >
          <BsBarChartLine size={24} />
        </ActionIcon>
      </Tooltip>

      <Tooltip label="Export CSV">
        <ActionIcon
          color="primary"
          variant="light"
          w={40}
          h={40}
          onClick={onFileDownload}
        >
          <BsCloudDownload size={24} />
        </ActionIcon>
      </Tooltip>

      <FileUploadButton label="Upload New File" />
    </Group>
  );
};

export default DataGridActions;
