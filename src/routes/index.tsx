import { NavigationContainer, DefaultTheme } from "@react-navigation/native"

import { AuthRoutes } from "./auth.routes"
import { AppRoutes } from "./app.routes"

import { gluestackUIConfig } from "../../config/gluestack-ui.config"

export function Routes() {
  const theme = DefaultTheme

  theme.colors.background = gluestackUIConfig.tokens.colors.gray600
  return (
    <NavigationContainer theme={theme}>
      <AppRoutes />
    </NavigationContainer>
  )
}
