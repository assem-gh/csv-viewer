import React, { useCallback } from "react";
import ImportSuccessModal from "./ImportSuccessModal";
import { useAppDispatch, useAppSelector } from "../../store/hooks";
import { Modal } from "@mantine/core";
import { closeModal, selectModalState } from "../../store/uiSlice";

export const modalComponentsLookup = {
  importConfirmation: ImportSuccessModal,
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
    ...props,
  };

  const ModalContent =
    name && modalComponentsLookup[name]
      ? modalComponentsLookup[name]
      : () => <div></div>;
  return (
    <Modal
      opened={!!name}
      onClose={onClose}
      closeOnEscape={true}
      size={modalProps.size}
      padding="md"
      withCloseButton={modalProps.withCloseButton}
      closeOnClickOutside={true}
      title={modalProps.title}
    >
      {<ModalContent />}
    </Modal>
  );
};

export default AppModal;
