import { gluestackUIConfig } from "@config/gluestack-ui.config"
import { Text } from "@gluestack-ui/themed"
import { Center } from "@gluestack-ui/themed"
import Package from "phosphor-react-native/src/icons/Package"

export function EmptyProducts() {
  const { tokens } = gluestackUIConfig
  return (
    <Center gap={"$2"} mt={"$8"}>
      <Package size={tokens.space[32]} color={tokens.colors.gray500} />
      <Text fontSize={"$xs"} color="$gray400">
        Nenhum anúncio encontrado...
      </Text>
    </Center>
  )
}
