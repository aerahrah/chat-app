const bgColorMap = {
  black: "#171717",
  gray: "#6b7280",
  red: "#F56565",
  orange: "#ED8936",
  amber: "#f59e0b",
  yellow: "#ECC94B",
  lime: "#84cc16",
  green: "#48BB78",
  emerald: "#10b981",
  teal: "#38B2AC",
  cyan: "#06b6d4",
  sky: "#0ea5e9",
  blue: "#4299E1",
  indigo: "#667EEA",
  violet: "#8b5cf6",
  fuchsia: "#d946ef",
  purple: "#9F7AEA",
  pink: "#ED64A6",
  rose: "#f43f5e",
};

const textColorMap = {
  black: "#f5f5f5",
  gray: "#f9fafb",
  red: "#fef2f2",
  orange: "#fff7ed",
  amber: "#fffbeb",
  yellow: "#fefce8",
  lime: "#1a2e05",
  green: "#f0fdf4",
  emerald: "#ecfdf5",
  teal: "#f0fdfa",
  cyan: "#ecfeff",
  sky: "#f0f9ff",
  blue: "#eff6ff",
  indigo: "#eef2ff",
  violet: "#f5f3ff",
  fuchsia: "#fdf4ff",
  purple: "#faf5ff",
  pink: "#fdf2f8",
  rose: "#fff1f2",
};

export const getBgColorTheme = (color) => {
  return bgColorMap[color] || "#4299E1";
};

export const getTextColorTheme = (color) => {
  return textColorMap[color] || "#eff6ff";
};
