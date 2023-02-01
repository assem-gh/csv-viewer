import React, { useCallback } from "react";
import {
  Anchor,
  Container,
  Group,
  Header,
  Switch,
  Title,
  useMantineTheme,
} from "@mantine/core";
import { Link as RouterLink } from "react-router-dom";
import { BsMoonFill, BsSun } from "react-icons/bs";
import { useAppDispatch, useAppSelector } from "../store/hooks";
import { selectColorScheme, toggleColorScheme } from "../store/uiSlice";
import { selectFileInfo } from "../store/gridSlice";

const AppHeader = () => {
  const colorScheme = useAppSelector(selectColorScheme);
  const { name } = useAppSelector(selectFileInfo);
  const dispatch = useAppDispatch();

  const toggle = useCallback(() => {
    dispatch(toggleColorScheme());
  }, [dispatch]);

  const theme = useMantineTheme();
  return (
    <Header height={56}>
      <Container fluid>
        <Group spacing={5} h={56} position="apart">
          <Anchor variant="text" to="/" component={RouterLink}>
            <Title c="green" fw="bolder" size="h1">
              CSV Viewer
            </Title>
          </Anchor>
          {name && <Title>{name}</Title>}
          <Group>
            <Switch
              checked={colorScheme === "dark"}
              onChange={toggle}
              color={theme.colorScheme === "dark" ? "gray" : "dark"}
              size="lg"
              onLabel={<BsSun color={theme.colors.yellow[4]} size={20} />}
              offLabel={<BsMoonFill color={theme.colors.gray[6]} size={20} />}
            />
          </Group>
        </Group>
      </Container>
    </Header>
  );
};

export default AppHeader;
