import { useNavigation } from "@react-navigation/native"

import { HStack } from "@gluestack-ui/themed"
import { gluestackUIConfig } from "../../../../config/gluestack-ui.config"

import { AppNavigatorRoutesProps } from "@routes/app.routes"

import { Header } from "@components/Header"

export function AdDetails() {
  const navigation = useNavigation<AppNavigatorRoutesProps>()
  const { tokens } = gluestackUIConfig
  function handleGoBack() {
    navigation.goBack()
  }
  return (
    <HStack px={"$6"} mt={"$6"}>
      <Header
        handleCreateAd={() => {}}
        handleEditAd={() => {}}
        headerVariant="simple"
        onPress={handleGoBack}
        title="Criar anúncio"
      />
    </HStack>
  )
}
