import React, { useCallback } from "react";
import ImportSuccessModal from "./ImportSuccessModal";
import { useAppDispatch, useAppSelector } from "../../store/hooks";
import { Modal } from "@mantine/core";
import { closeModal, selectModalState } from "../../store/uiSlice";
import ChartModal from "./ChartModal";

export const modalComponentsLookup = {
  importConfirmation: ImportSuccessModal,
  chart: ChartModal,
};
const AppModal = () => {
  const dispatch = useAppDispatch();
  const { props, name } = useAppSelector(selectModalState);

  const onClose = useCallback(() => {
    dispatch(closeModal());
  }, [dispatch]);

  const modalProps = {
    size: "md",
    withCloseButton: false,
    title: "",
    padding: "md",
    ...props,
  };

  const ModalContent =
    name && modalComponentsLookup[name]
      ? modalComponentsLookup[name]
      : () => <div></div>;
  return (
    <Modal
      styles={{
        root: { display: "flex", flexDirection: "column" },
        body: { flexGrow: 1, height: "calc(100% - 44px)" },
        header: { marginBottom: 0 },
      }}
      opened={!!name}
      onClose={onClose}
      {...modalProps}
    >
      <ModalContent />
    </Modal>
  );
};

export default AppModal;
