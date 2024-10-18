import { Center, Text } from "@gluestack-ui/themed"

import { Button } from "@components/Button"
import { AppNavigatorRoutesProps } from "@routes/app.routes"
import { useNavigation } from "@react-navigation/native"

export function UserAds() {
  const navigation = useNavigation<AppNavigatorRoutesProps>()
  function handleUserAdDetail() {
    navigation.navigate("userAdDetail")
  }

  function handleAdCreate() {
    navigation.navigate("adCreate")
  }

  function handleGoBack() {
    navigation.goBack()
  }
  return (
    <Center flex={1} justifyContent="center" px={"$12"} gap={"$4"}>
      <Text fontFamily={"$body"} fontSize={"$lg"}>
        UserAds
      </Text>
      <Button label="Criar anúncio" onPress={handleAdCreate} width={"$full"} />
      <Button
        label="Detalhes do anúncio"
        onPress={handleUserAdDetail}
        width={"$full"}
      />
      <Button label="Voltar" onPress={handleGoBack} width={"$full"} />
    </Center>
  )
}
