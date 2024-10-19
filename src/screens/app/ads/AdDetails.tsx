import { useNavigation } from "@react-navigation/native"

import { HStack, Text } from "@gluestack-ui/themed"
import { gluestackUIConfig } from "../../../../config/gluestack-ui.config"

import { AppNavigatorRoutesProps } from "@routes/app.routes"

import ArrowLeft from "phosphor-react-native/src/icons/ArrowLeft"

import { Button } from "@components/Button"
import { TouchableOpacity } from "react-native"
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
