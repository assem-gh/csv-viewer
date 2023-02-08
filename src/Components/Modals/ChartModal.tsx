import React, { useState } from "react";
import { useAppSelector } from "../../store/hooks";
import { selectColorScheme } from "../../store/uiSlice";
import { AgChartsReact } from "ag-charts-react";
import ChartForm from "../ChartForm";
import { Box, Stack } from "@mantine/core";

const ChartModal = () => {
  const colorScheme = useAppSelector(selectColorScheme);
  const [chartData, setChartData] = useState<any[]>([]);

  const chartTheme = `ag-default${colorScheme === "dark" ? "-dark" : ""}`;

  const options = {
    data: chartData,
    theme: chartTheme,
    series: [
      {
        type: "pie",
        angleKey: "value",
        calloutLabelKey: "label",
        sectorLabelKey: "value",
        sectorLabel: {
          color: "white",
          fontWeight: "bold",
        },
      },
    ],
  };
  return (
    <Stack h="100%" justify="space-between">
      <ChartForm setChartData={setChartData} />

      <Box sx={{ flexGrow: 1, flexShrink: 1, height: "80%" }}>
        {chartData.length > 0 && <AgChartsReact options={options} />}
      </Box>
    </Stack>
  );
};

export default ChartModal;
