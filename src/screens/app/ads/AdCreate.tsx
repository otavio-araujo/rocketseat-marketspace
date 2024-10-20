import { useNavigation } from "@react-navigation/native"

import { Box, HStack, Text, VStack } from "@gluestack-ui/themed"
import { gluestackUIConfig } from "../../../../config/gluestack-ui.config"

import { AppNavigatorRoutesProps } from "@routes/app.routes"

import { Header } from "@components/Header"

import Plus from "phosphor-react-native/src/regular/Plus"
import { TouchableOpacity } from "react-native"
import { Input } from "@components/Input"
import { Textarea } from "@components/Textarea"

export function AdCreate() {
  const navigation = useNavigation<AppNavigatorRoutesProps>()
  const { tokens } = gluestackUIConfig

  function handleAdPreview() {
    navigation.navigate("adPreview")
  }
  function handleGoBack() {
    navigation.goBack()
  }
  return (
    <VStack flex={1} gap={"$4"} pt={"$5"}>
      {/* Header */}
      <Header
        title="Criar anúncio"
        headerVariant="create"
        onPress={handleGoBack}
      />
      {/* End - Header */}

      <VStack mt={"$6"} px={"$6"} gap={"$8"}>
        {/* Product Photos */}
        <VStack>
          <Text fontFamily={"$heading"} fontSize={"$md"} color={"$gray200"}>
            Imagens
          </Text>

          <Text
            fontFamily={"$body"}
            fontSize={"$sm"}
            color={"$gray300"}
            mt={"$1"}
          >
            Escolha até 3 imagens para mostrar o quando o seu produto é
            incrível!
          </Text>

          <HStack mt={"$4"} gap={"$2"}>
            <TouchableOpacity>
              <Box
                w={100}
                h={100}
                bg={"$gray500"}
                rounded={"$md"}
                alignItems="center"
                justifyContent="center"
              >
                <Plus size={24} color={tokens.colors.gray400} />
              </Box>
            </TouchableOpacity>
          </HStack>
        </VStack>
        {/* End - Product Photos */}

        {/* About Product */}
        <VStack gap={"$4"}>
          <Text fontFamily={"$heading"} fontSize={"$md"} color={"$gray200"}>
            Sobre o produto
          </Text>

          <Input placeholder="Título do anúncio" />

          <Textarea />
        </VStack>
        {/* End - About Product */}
      </VStack>
    </VStack>
  )
}
