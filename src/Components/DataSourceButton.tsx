import React from "react";
import {
  Box,
  Paper,
  Stack,
  Title,
  UnstyledButton,
  Text,
  createStyles,
} from "@mantine/core";

interface DataSourceButtonProps {
  title: string;
  subtitle: string;
  imageSrc: string;
  onClick: () => void;
}
const DataSourceButton = ({
  onClick,
  title,
  subtitle,
  imageSrc,
}: DataSourceButtonProps) => {
  const { classes } = useStyles();
  return (
    <UnstyledButton onClick={onClick} className={classes.root}>
      <Paper w="100%" h="100%" px="lg" py="sm" withBorder>
        <Stack h="100%" justify="center" align="center">
          <img src={imageSrc} alt={title} />
          <Box mt={36} className={classes.textContainer}>
            <Title h={36} fz="lg">
              {title}
            </Title>
            <Text h={32} fz="sm" c="dimmed">
              {subtitle}
            </Text>
          </Box>
        </Stack>
      </Paper>
    </UnstyledButton>
  );
};

const useStyles = createStyles((theme) => ({
  root: {
    maxWidth: 400,
    width: "100%",
    maxHeight: 600,
    height: "100%",
    boxShadow: theme.shadows.xs,
    borderRadius: theme.radius.md,
    transition: "box-shadow 0.3s ease",
    "&:hover": {
      boxShadow: theme.shadows.md,
    },
    "&:hover>div": {
      borderColor: theme.primaryColor[4],
    },
    "& img": {
      width: "100%",
      maxWidth: 240,
    },
  },
  textContainer: {},
}));

export default DataSourceButton;
