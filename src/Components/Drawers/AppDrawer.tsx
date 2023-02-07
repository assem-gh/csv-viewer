import React, { useCallback } from "react";
import { Drawer, DrawerProps } from "@mantine/core";
import { useAppDispatch, useAppSelector } from "../../store/hooks";
import { closeDrawer, selectDrawerState } from "../../store/uiSlice";
import AddRowDrawer from "./AddRowDrawer";

export const drawerComponentsLookup = {
  addRow: AddRowDrawer,
};
const AppDrawer = () => {
  const dispatch = useAppDispatch();
  const { props, name } = useAppSelector(selectDrawerState);

  const onClose = useCallback(() => {
    dispatch(closeDrawer());
  }, [dispatch]);

  const drawerProps: DrawerProps = {
    size: "xl",
    padding: "lg",
    withCloseButton: false,
    title: "",
    opened: !!name,
    onClose: onClose,
    lockScroll: true,
    ...props,
  };

  const DrawerContent =
    name && drawerComponentsLookup[name]
      ? drawerComponentsLookup[name]
      : () => <div></div>;

  return (
    <Drawer
      styles={{
        drawer: {
          display: "flex",
          flexDirection: "column",
        },
        body: {
          flexGrow: 1,
          overflowY: "auto",
        },
      }}
      {...drawerProps}
    >
      <DrawerContent />
    </Drawer>
  );
};

export default AppDrawer;
