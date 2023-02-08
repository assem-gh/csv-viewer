import React, {
  ChangeEvent,
  Dispatch,
  SetStateAction,
  useEffect,
  useState,
} from "react";
import { useAppSelector } from "../store/hooks";
import {
  selectAllRows,
  selectColumnNames,
  selectColumns,
} from "../store/gridSlice";
import { Button, Checkbox, Group, NativeSelect, Text } from "@mantine/core";
import { generateChartData } from "../helpers/calculateChartData";
import { ChartFormDataType } from "../types";

interface ChartFormProps {
  setChartData: Dispatch<SetStateAction<any>>;
}

const ChartForm = ({ setChartData }: ChartFormProps) => {
  const headers = useAppSelector(selectColumnNames);
  const columns = useAppSelector(selectColumns);

  const data = useAppSelector(selectAllRows);

  const [chartFormData, setChartFormData] = useState<ChartFormDataType>({
    value: headers[0],
    calculation: "count",
    category: headers[0],
    percentage: false,
  });
  const [calculationOptions, setCalculationOptions] = useState<string[]>([
    "count",
  ]);

  const handleFormChange =
    (name: keyof typeof chartFormData) =>
    (evt: ChangeEvent<HTMLSelectElement | HTMLInputElement>) => {
      if (name === "category")
        setChartFormData((prev) => ({
          ...prev,
          category: evt.target.value,
          value: evt.target.value,
        }));
      else
        setChartFormData((prev) => ({
          ...prev,
          [name]:
            // @ts-ignore
            name === "percentage" ? evt.target.checked : evt.target.value,
        }));
    };

  const updateCalculationOptions = () => {
    const numericFormats = ["number", "unit", "percentage", "currency"];
    const columnFormat = columns.find((col) => col.name === chartFormData.value)
      ?.format!;

    if (numericFormats.includes(columnFormat)) {
      setCalculationOptions(() => ["count", "sum"]);
    } else setCalculationOptions(() => ["count"]);
  };

  useEffect(updateCalculationOptions, [chartFormData.value]);
  const onClick = () => {
    setChartData(() => generateChartData(data, chartFormData));
  };

  return (
    <Group position="apart" grow align="center">
      <Group>
        <Text>Category</Text>
        <NativeSelect
          sx={{ flexGrow: 1 }}
          data={headers}
          value={chartFormData.category}
          onChange={handleFormChange("category")}
        />
      </Group>
      <Group>
        <Text>Values</Text>
        <NativeSelect
          sx={{ flexGrow: 1 }}
          data={headers}
          value={chartFormData.value}
          onChange={handleFormChange("value")}
        />
      </Group>
      <Group>
        <Text>Calculation</Text>

        <NativeSelect
          sx={{ flexGrow: 1 }}
          data={calculationOptions}
          value={chartFormData.calculation}
          onChange={handleFormChange("calculation")}
        />
      </Group>
      <Group>
        <Checkbox
          label="Percentage"
          size="md"
          w="100%"
          checked={chartFormData.percentage}
          onChange={handleFormChange("percentage")}
        />
      </Group>

      <Button onClick={onClick}>Show</Button>
    </Group>
  );
};
export default ChartForm;
