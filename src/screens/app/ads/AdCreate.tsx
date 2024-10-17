import { Button } from "@components/Button"
import { Center, Text } from "@gluestack-ui/themed"
import { useNavigation } from "@react-navigation/native"
import { AppNavigatorRoutesProps } from "@routes/app.routes"

export function AdCreate() {
  const navigation = useNavigation<AppNavigatorRoutesProps>()

  function handleAdPreview() {
    navigation.navigate("adPreview")
  }
  function handleGoBack() {
    navigation.goBack()
  }
  return (
    <Center flex={1} justifyContent="center" px={"$12"}>
      <Text fontFamily={"$body"} fontSize={"$lg"}>
        AdCreate
      </Text>
      <Button label="Avançar" onPress={handleAdPreview} />
      <Button label="Voltar" onPress={handleGoBack} />
    </Center>
  )
}
