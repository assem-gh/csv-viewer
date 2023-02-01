export const formatFileSize = (size: number) => {
  const units = [
    { unit: "B", multiplier: 1 },
    { unit: "KB", multiplier: 1024 },
    { unit: "MB", multiplier: 1024 * 1024 },
    { unit: "GB", multiplier: 1024 * 1024 * 1024 },
  ];
  const { unit, multiplier } =
    [...units].reverse().find(({ multiplier }) => size >= multiplier) ||
    units[0];

  return `${(size / multiplier).toFixed(2)} ${unit}`;
};
