import React from "react";
import { ActionIcon, Group, Tooltip } from "@mantine/core";
import {
  BsBarChartLine,
  BsCloudDownload,
  BsGear,
  BsPlusSquare,
} from "react-icons/bs";
import FileUploadButton from "../FileUploadButton";

interface DataGridActionsProps {
  onAddRow: () => () => void;
  onFileDownload: () => void;
}

const DataGridActions = ({
  onAddRow,
  onFileDownload,
}: DataGridActionsProps) => {
  return (
    <Group>
      <Tooltip label="Settings">
        <ActionIcon color="primary" variant="light" w={40} h={40}>
          <BsGear size={24} />
        </ActionIcon>
      </Tooltip>
      <Tooltip label="New Row">
        <ActionIcon
          onClick={onAddRow()}
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
