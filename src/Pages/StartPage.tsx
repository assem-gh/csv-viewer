import React, { useCallback } from "react";
import { Flex } from "@mantine/core";
import DataSourceButton from "../Components/DataSourceButton";
import FileUploadButton from "../Components/FileUploadButton";
import { useMediaQuery } from "@mantine/hooks";
import { useAppDispatch } from "../store/hooks";
import { setGridData } from "../store/gridSlice";
import { openModal } from "../store/uiSlice";

const StartPage = () => {
  const dispatch = useAppDispatch();

  const onDemoClick = useCallback(() => {
    dispatch(openModal({ name: "importConfirmation" }));
    dispatch(setGridData());
  }, [dispatch]);

  const onNewFile = useCallback(() => {}, []);
  const matches = useMediaQuery("(min-width: 768px)");

  return (
    <Flex
      w="100%"
      px="xl"
      py="xl"
      sx={{ height: "calc(100vh - 56px)" }}
      justify="center"
      align="center"
      direction={matches ? "row" : "column"}
      gap="xl"
    >
      <DataSourceButton
        title="Demo"
        subtitle="Preview Sample Data"
        imageSrc="/images/demo.svg"
        onClick={onDemoClick}
      />
      <DataSourceButton
        title="Empty File"
        subtitle="Create a new, empty file"
        imageSrc="/images/new.svg"
        onClick={onNewFile}
      />
      <FileUploadButton />
    </Flex>
  );
};

export default StartPage;
