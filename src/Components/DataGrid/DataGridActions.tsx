import React from "react";
import { ActionIcon, Group, Tooltip } from "@mantine/core";
import { BsBarChartLine, BsCloudDownload, BsPlusSquare } from "react-icons/bs";
import FileUploadButton from "../FileUploadButton";

interface DataGridActionsProps {
  onAddRow: (pos: number) => () => void;
  onFileDownload: () => void;
}

const DataGridActions = ({
  onAddRow,
  onFileDownload,
}: DataGridActionsProps) => {
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
        <ActionIcon h={40} w={40} color="primary" variant="light">
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
