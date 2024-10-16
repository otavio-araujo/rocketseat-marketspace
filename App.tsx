import { Text, View, StatusBar } from "react-native"

import {
  useFonts,
  Karla_400Regular,
  Karla_700Bold,
} from "@expo-google-fonts/karla"

export default function App() {
  const [fontsLoaded] = useFonts({
    Karla_400Regular,
    Karla_700Bold,
  })

  return (
    <View
      style={{
        flex: 1,
        alignItems: "center",
        justifyContent: "center",
        backgroundColor: "#EDECEE",
      }}
    >
      <StatusBar
        barStyle="dark-content"
        backgroundColor="#EDECEE"
        translucent
      />
      {fontsLoaded ? <Text>Home</Text> : <View />}
    </View>
  )
}
