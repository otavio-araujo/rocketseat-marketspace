import { GestureHandlerRootView } from "react-native-gesture-handler"

import {
  useFonts,
  Karla_400Regular,
  Karla_700Bold,
  Karla_300Light,
} from "@expo-google-fonts/karla"

import { GluestackUIProvider } from "@gluestack-ui/themed"
import { config, gluestackUIConfig } from "./config/gluestack-ui.config"

const { tokens } = gluestackUIConfig

import { Routes } from "@routes/index"

import { Loading } from "@components/Loading"

import { AuthContextProvider } from "@contexts/AuthContext"
import { SafeAreaView } from "react-native"
import { Fragment } from "react"
import { StatusBar } from "@components/StatusBar"

export default function App() {
  const [fontsLoaded] = useFonts({
    Karla_400Regular,
    Karla_700Bold,
    Karla_300Light,
  })

  return (
    <Fragment>
      <GluestackUIProvider config={config}>
        <GestureHandlerRootView>
          <StatusBar
            barStyle="dark-content"
            backgroundColor={tokens.colors.gray600}
            translucent
          />
          <AuthContextProvider>
            {fontsLoaded ? <Routes /> : <Loading />}
          </AuthContextProvider>
        </GestureHandlerRootView>
      </GluestackUIProvider>
    </Fragment>
  )
}
