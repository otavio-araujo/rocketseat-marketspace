import { Button } from "@components/Button"
import { Center, Text } from "@gluestack-ui/themed"
import { useNavigation } from "@react-navigation/native"
import { AppNavigatorRoutesProps } from "@routes/app.routes"

export function AdDetail() {
  const navigation = useNavigation<AppNavigatorRoutesProps>()
  function handleGoBack() {
    navigation.goBack()
  }
  return (
    <Center flex={1} justifyContent="center" px={"$12"}>
      <Text fontFamily={"$body"} fontSize={"$lg"}>
        AdDetail
      </Text>

      <Button label="Voltar" onPress={handleGoBack} />
    </Center>
  )
}
