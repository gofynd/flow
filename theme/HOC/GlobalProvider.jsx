import { useFPI } from "fdk-core/utils";
import React from "react";

export function ThemeProvider({ children }) {
  const fpi = useFPI();
  console.log("I am provider from theme", { fpi });

  return <div className="provider">{children}</div>;
}
