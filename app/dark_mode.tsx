import {
  ColorMode,
  defaultDarkModeOverride,
  ThemeProvider,
} from "@aws-amplify/ui-react";
import * as React from "react";

// Create a context to share the color mode state
export const ColorModeContext = React.createContext({
  colorMode: 'system' as ColorMode,
  setColorMode: (mode: ColorMode) => {}
});

export const DefaultDarkMode = ({ children, ...props }: any) => {
  const [colorMode, setColorMode] = React.useState<ColorMode>("system");

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
