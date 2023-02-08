import { CalculationType, ChartFormDataType } from "../types";

type ChartData = { label: string; value: number };

const groupDataByCategory = (
  data: any[],
  category: string
): Record<string, number> => {
  const uniqueCategories = [
    ...new Set(data.map((rowData) => rowData[category])),
  ];
  return uniqueCategories.reduce((groupedData, category) => {
    groupedData[category] = 0;
    return groupedData;
  }, {} as Record<string, number>);
};

const calculateDataValue = (
  data: any[],
  category: string,
  value: string,
  calculation: CalculationType
): Record<string, number> => {
  const groupedData = groupDataByCategory(data, category);
  return data.reduce((acc, rowData) => {
    if (calculation === "sum") {
      acc[rowData[category]] += rowData[value];
    } else {
      acc[rowData[category]] += 1;
    }
    return acc;
  }, groupedData);
};

const calculateDataPercentage = (
  data: ChartData[],
  total: number
): ChartData[] => {
  return data.map((datum) => ({
    label: datum.label,
    value: Number(((datum.value / total) * 100).toFixed(2)),
  }));
};

export const generateChartData = (
  data: any[],
  chartOptions: ChartFormDataType
): ChartData[] => {
  const { category, calculation, percentage, value } = chartOptions;
  const calculatedData = calculateDataValue(data, category, value, calculation);
  let chartData = Object.entries(calculatedData).map(([label, value]) => ({
    label,
    value,
  }));
  if (percentage) {
    const total = chartData.reduce((sum, datum) => sum + datum.value, 0);
    chartData = calculateDataPercentage(chartData, total);
  }
  return chartData;
};
