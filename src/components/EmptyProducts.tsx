import { Text, Center } from "@gluestack-ui/themed"
import Package from "phosphor-react-native/src/icons/Package"
import { gluestackUIConfig } from "@config/gluestack-ui.config"

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
