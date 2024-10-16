import { View } from "react-native"

import {
  useFonts,
  Karla_400Regular,
  Karla_700Bold,
  Karla_300Light,
} from "@expo-google-fonts/karla"

import {
  GluestackUIProvider,
  Text,
  Center,
  StatusBar,
  SafeAreaView,
  VStack,
} from "@gluestack-ui/themed"
import { config } from "./config/gluestack-ui.config"

import { Loading } from "@components/Loading"
import { SignIn } from "@screens/auth/SignIn"
import { SignUp } from "@screens/auth/SignUp"

export default function App() {
  const [fontsLoaded] = useFonts({
    Karla_400Regular,
    Karla_700Bold,
    Karla_300Light,
  })

  return (
    <GluestackUIProvider config={config}>
      <StatusBar
        barStyle="dark-content"
        backgroundColor="$gray600"
        translucent
      />
      <VStack bg="$gray700" flex={1}>
        {fontsLoaded ? <SignUp /> : <Loading />}
      </VStack>
    </GluestackUIProvider>
  )
}
