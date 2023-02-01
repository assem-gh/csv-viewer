import React, { ChangeEvent, useCallback, useRef } from "react";
import { Button } from "@mantine/core";
import DataSourceButton from "./DataSourceButton";
import { useAppDispatch } from "../store/hooks";
import { setGridData } from "../store/gridSlice";
import { openModal } from "../store/uiSlice";

interface FileUploadButtonProps {
  label?: string;
}

const FileUploadButton = ({ label }: FileUploadButtonProps) => {
  const hiddenFileInput = useRef<HTMLInputElement>(null);
  const dispatch = useAppDispatch();

  const handleChange = (evt: ChangeEvent<HTMLInputElement>) => {
    if (!evt.target.files) return;
    dispatch(setGridData(evt.target.files[0]));
    dispatch(openModal({ name: "importConfirmation" }));
  };

  const handleClick = useCallback(() => {
    hiddenFileInput.current?.click();
  }, [hiddenFileInput.current]);

  return (
    <>
      {label ? (
        <Button variant="filled" onClick={handleClick}>
          {label}
        </Button>
      ) : (
        <DataSourceButton
          onClick={handleClick}
          title="Upload CSV File"
          imageSrc="/images/upload.svg"
          subtitle="Import Data from your File"
        />
      )}
      <input
        hidden
        type="file"
        accept="text/csv"
        ref={hiddenFileInput}
        onChange={handleChange}
      />
    </>
  );
};

export default FileUploadButton;
