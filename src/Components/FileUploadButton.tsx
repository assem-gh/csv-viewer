import React, { ChangeEvent, useCallback, useRef } from "react";
import { Button } from "@mantine/core";
import DataSourceButton from "./DataSourceButton";

interface FileUploadButtonProps {
  label?: string;
}

const FileUploadButton = ({ label }: FileUploadButtonProps) => {
  const hiddenFileInput = useRef<HTMLInputElement>(null);

  const handleChange = (evt: ChangeEvent<HTMLInputElement>) => {
    if (!evt.target.files) return;
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
