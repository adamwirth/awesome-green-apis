import {
  Card,
  ColorMode,
  defaultDarkModeOverride,
  Text,
  ThemeProvider,
  ToggleButton,
  ToggleButtonGroup,
} from "@aws-amplify/ui-react";
import * as React from "react";

export const DefaultDarkMode = ({ children, ...props }: any) => {
  const [colorMode, setColorMode] = React.useState<ColorMode>("system");

  const theme = {
    name: "default-theme",
    overrides: [defaultDarkModeOverride],
  };

  return (
    <ThemeProvider theme={theme} colorMode={colorMode} {...props}>
      <Card>
        <ToggleButtonGroup
          value={colorMode}
          isExclusive
          onChange={(value) => setColorMode(value as ColorMode)}
        >
          <ToggleButton value="light">Light</ToggleButton>
          <ToggleButton value="dark">Dark</ToggleButton>
          <ToggleButton value="system">System</ToggleButton>
        </ToggleButtonGroup>
        <Text>Current color mode: {colorMode}</Text>
      </Card>
      {children}
    </ThemeProvider>
  );
};
