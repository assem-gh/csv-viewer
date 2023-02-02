import React, { ChangeEvent, useCallback, useState } from "react";
import {
  ActionIcon,
  Group,
  NativeSelect,
  NumberInput,
  Text,
} from "@mantine/core";
import { BsChevronCompactRight } from "react-icons/bs";

interface PaginationControlProps {
  goToPage: (target: number) => void;
  setPageSize: (size: number) => void;
}

const PaginationControl = ({
  goToPage,
  setPageSize,
}: PaginationControlProps) => {
  const [pageTarget, setPageTarget] = useState(0);

  const onChangePageTarget = useCallback((value: number | undefined) => {
    if (value) setPageTarget(value);
  }, []);

  const onGoToPage = useCallback(() => {
    goToPage(pageTarget);
  }, [pageTarget]);

  const onChangePageSize = useCallback(
    (evt: ChangeEvent<HTMLSelectElement>) => {
      const size = parseInt(evt.target.value);
      setPageSize(size);
    },
    []
  );

  return (
    <Group>
      <Text size="sm">Rows Per page</Text>
      <NativeSelect
        data={["10", "20", "50", "100"]}
        defaultValue="20"
        onChange={onChangePageSize}
      />
      <Text size="sm">Go To</Text>
      <Group spacing={0} align="center" position="center">
        <NumberInput
          rightSection={
            <ActionIcon
              sx={{
                borderTopLeftRadius: 0,
                borderBottomLeftRadius: 0,
              }}
              onClick={onGoToPage}
              color="primary"
              h={36}
            >
              <BsChevronCompactRight spacing={42} />
            </ActionIcon>
          }
          h={40}
          w={64}
          value={pageTarget}
          onChange={onChangePageTarget}
        />
      </Group>
    </Group>
  );
};

export default PaginationControl;
