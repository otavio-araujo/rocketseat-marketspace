import { Center, Text } from "@gluestack-ui/themed"

import { AppNavigatorRoutesProps } from "@routes/app.routes"

import { Button } from "@components/Button"
import { useNavigation } from "@react-navigation/native"

export function Home() {
  const navigation = useNavigation<AppNavigatorRoutesProps>()

  function handleAdDetail() {
    navigation.navigate("adDetail")
  }
  return (
    <Center flex={1} justifyContent="center" px={"$12"}>
      <Text fontFamily={"$body"} fontSize={"$lg"}>
        Home
      </Text>
      <Button label="Detalhes do anúncio" onPress={handleAdDetail} />
    </Center>
  )
}
