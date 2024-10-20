import { SafeAreaView } from "react-native-safe-area-context"
import { GestureHandlerRootView } from "react-native-gesture-handler"

import {
  useFonts,
  Karla_400Regular,
  Karla_700Bold,
  Karla_300Light,
} from "@expo-google-fonts/karla"

import { GluestackUIProvider, StatusBar, VStack } from "@gluestack-ui/themed"
import { config } from "./config/gluestack-ui.config"

import { Routes } from "@routes/index"

import { Loading } from "@components/Loading"

export default function App() {
  const [fontsLoaded] = useFonts({
    Karla_400Regular,
    Karla_700Bold,
    Karla_300Light,
  })

  return (
    <GluestackUIProvider config={config}>
      <GestureHandlerRootView style={{ flex: 1 }}>
        <SafeAreaView style={{ flex: 1 }}>
          <StatusBar
            barStyle="dark-content"
            backgroundColor="$gray600"
            translucent
          />
          {fontsLoaded ? <Routes /> : <Loading />}
        </SafeAreaView>
      </GestureHandlerRootView>
    </GluestackUIProvider>
  )
}
