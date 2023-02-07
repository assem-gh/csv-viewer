import { ValueFormat, ValueType } from "../types";

const getValueType = (value: any) => {
  let type: ValueType = "string";
  let format: ValueFormat = "text";
  const units = [
    "m",
    "km",
    "cm",
    "mm",
    "in",
    "ft",
    "kg",
    "g",
    "mg",
    "°C",
    "°F",
    "L",
    "mL",
    "m²",
    "km²",
    "in²",
    "bit",
    "B",
    "KB",
    "MB",
    "GB",
  ];
  const formatPatterns: Record<
    string,
    { pattern: RegExp; type: ValueType; format: ValueFormat }
  > = {
    currency: {
      pattern: /^([€£$¥])(0|[1-9]\d{0,2})(,\d{3})*(\.\d{1,2})?$/,
      type: "string",
      format: "currency",
    },
    numeric: {
      pattern: /^(\d{1,3}(,\d{3})*|(\d+))(.\d{2})?$/,
      type: "number",
      format: "number",
    },
    longText: { pattern: /^.{150,}$/, type: "string", format: "longText" },
    percentage: {
      pattern: /^(\d+(\.\d+)?%$)/,
      type: "string",
      format: "percentage",
    },
    units: {
      pattern: RegExp(
        "^.*\\s(" +
          units.join("|") +
          "|(" +
          units.join("|") +
          ")/(" +
          units.join("|") +
          "))$"
      ),
      type: "string",
      format: "unit",
    },
  };
  if (typeof value === "number") {
    return { type: "number", format: "number" };
  }
  if (typeof value === "boolean") {
    return { type: "boolean", format: "boolean" };
  }
  if (typeof value === "string") {
    for (let valueFormat of Object.values(formatPatterns)) {
      if (valueFormat.pattern.test(value)) {
        return { type: valueFormat.type, format: valueFormat.format };
      }
    }
  }
  return { type, format };
};
export const getDataFormat = (dataRows: any[], headers: string[]) => {
  const headerTrack = headers.reduce<Record<string, boolean>>((acc, header) => {
    return { ...acc, [header]: false };
  }, {});

  let columns: any = [];
  let _id: number = 1;

  for (let row of dataRows) {
    for (let [header, value] of Object.entries(row)) {
      if (!value) continue;
      if (headerTrack[header]) continue;
      const valueFormat = getValueType(value);
      columns = [...columns, { ...valueFormat, name: header, _id }];
      _id++;
      headerTrack[header] = true;
    }
    if (Object.values(headerTrack).every((value) => value)) return columns;
  }

  return columns;
};
