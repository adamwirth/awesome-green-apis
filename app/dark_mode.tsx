import {
  ColorMode,
  defaultDarkModeOverride,
  ThemeProvider,
} from "@aws-amplify/ui-react";
import * as React from "react";
import { createContext, useState } from "react";

// Create a context to share the color mode state
export const ColorModeContext = createContext({
  colorMode: 'system' as ColorMode,
  setColorMode: (_: ColorMode) => { }
});

export const DefaultDarkMode = ({ children, ...props }:
  React.PropsWithChildren<React.HTMLAttributes<HTMLDivElement>>
) => {
  // Set default to dark mode, rather than "system"
  const [colorMode, setColorMode] = useState<ColorMode>("dark");

  const theme = {
    name: "default-theme",
    overrides: [defaultDarkModeOverride],
  };

  return (
    <ColorModeContext.Provider value={{ colorMode, setColorMode }}>
      <ThemeProvider theme={theme} colorMode={colorMode} {...props}>
        {children}
      </ThemeProvider>
    </ColorModeContext.Provider>
  );
};
