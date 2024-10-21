import { useNavigation } from "@react-navigation/native"

import { VStack, Text, HStack, ScrollView } from "@gluestack-ui/themed"
import { gluestackUIConfig } from "../../../../config/gluestack-ui.config"

import { AppNavigatorRoutesProps } from "@routes/app.routes"

import { Badge } from "@components/Badge"
import { Avatar } from "@components/Avatar"
import { Button } from "@components/Button"
import { Header } from "@components/Header"
import { ProductCarousel } from "@components/ProductCarousel"

import Bank from "phosphor-react-native/src/icons/Bank"
import Money from "phosphor-react-native/src/icons/Money"
import QrCode from "phosphor-react-native/src/icons/QrCode"
import Barcode from "phosphor-react-native/src/icons/Barcode"
import CreditCard from "phosphor-react-native/src/icons/CreditCard"
import WhatsappLogo from "phosphor-react-native/src/icons/WhatsappLogo"

export type AdDetails = {
  id: number
  uri: string
  title: string
}

export function AdDetails() {
  const navigation = useNavigation<AppNavigatorRoutesProps>()
  const { tokens } = gluestackUIConfig

  const images: AdDetails[] = [
    {
      id: 0,
      uri: "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
      title: "HeadPhones",
    }, // https://unsplash.com/photos/Jup6QMQdLnM
    {
      id: 1,
      uri: "https://images.unsplash.com/photo-1532298229144-0ec0c57515c7?q=80&w=2022&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
      title: "PlayStation5",
    }, // https://unsplash.com/photos/oO62CP-g1EA
    {
      id: 2,
      uri: "https://images.unsplash.com/photo-1542291026-7eec264c27ff?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
      title: "Cocooil",
    }, // https://unsplash.com/photos/gKMmJEvcyA8
  ]

  function handleGoBack() {
    navigation.goBack()
  }
  return (
    /* Container */
    <VStack mt={"$4"} flex={1}>
      <Header
        handleCreateAd={() => {}}
        handleEditAd={() => {}}
        headerVariant="simple"
        onPress={handleGoBack}
        title="Criar anúncio"
      />

      <ProductCarousel data={images} mt={"$3"} />

      {/* Content */}
      <ScrollView showsVerticalScrollIndicator={false}>
        <VStack w={"$full"} px={"$6"} mt={"$5"} gap={"$6"}>
          <HStack alignItems="center">
            <Avatar imageSource="https://i.pravatar.cc/300" />
            <Text fontFamily={"$body"} fontSize={"$sm"} ml={"$2"}>
              Maria Gomes{" "}
            </Text>
          </HStack>

          <VStack alignItems="flex-start" gap={"$2"}>
            <HStack>
              <Badge badgeVariant="muted" label="usado" mx={"auto"} />
            </HStack>

            <HStack
              w={"$full"}
              justifyContent="space-between"
              alignItems="center"
            >
              <Text fontFamily={"$heading"} fontSize={"$lg"} color={"$gray100"}>
                Luminária pendente
              </Text>
              <HStack alignItems="baseline">
                <Text
                  fontFamily={"$heading"}
                  fontSize={"$sm"}
                  color={"$blueLight"}
                >
                  R${" "}
                </Text>
                <Text
                  fontFamily={"$heading"}
                  fontSize={"$lg"}
                  color={"$blueLight"}
                >
                  45,00
                </Text>
              </HStack>
            </HStack>

            <Text fontFamily={"$body"} fontSize={"$sm"} color={"$gray200"}>
              Cras congue cursus in tortor sagittis placerat nunc, tellus arcu.
              Vitae ante leo eget maecenas urna mattis cursus.
            </Text>
          </VStack>

          <HStack w={"$full"} gap={"$2"}>
            <Text fontFamily={"$heading"} fontSize={"$sm"} color={"$gray200"}>
              Aceita troca?
            </Text>
            <Text fontFamily={"$body"} fontSize={"$sm"} color={"$gray200"}>
              Não
            </Text>
          </HStack>

          <VStack w={"$full"} gap={"$2"}>
            <Text fontFamily={"$heading"} fontSize={"$sm"} color={"$gray200"}>
              Meios de pagamento:{" "}
            </Text>

            <HStack w={"$full"} gap={"$2"}>
              <Barcode size={18} color={tokens.colors.gray100} />
              <Text
                textTransform="capitalize"
                fontFamily={"$body"}
                fontSize={"$sm"}
                color={"$gray200"}
              >
                Boleto
              </Text>
            </HStack>
            <HStack w={"$full"} gap={"$2"}>
              <QrCode size={18} color={tokens.colors.gray100} />
              <Text
                textTransform="capitalize"
                fontFamily={"$body"}
                fontSize={"$sm"}
                color={"$gray200"}
              >
                Pix
              </Text>
            </HStack>
            <HStack w={"$full"} gap={"$2"}>
              <Money size={18} color={tokens.colors.gray100} />
              <Text
                textTransform="capitalize"
                fontFamily={"$body"}
                fontSize={"$sm"}
                color={"$gray200"}
              >
                Dinheiro
              </Text>
            </HStack>
            <HStack w={"$full"} gap={"$2"}>
              <CreditCard size={18} color={tokens.colors.gray100} />
              <Text
                textTransform="capitalize"
                fontFamily={"$body"}
                fontSize={"$sm"}
                color={"$gray200"}
              >
                Caratão de Crédito
              </Text>
            </HStack>
            <HStack w={"$full"} gap={"$2"}>
              <Bank size={18} color={tokens.colors.gray100} />
              <Text
                textTransform="capitalize"
                fontFamily={"$body"}
                fontSize={"$sm"}
                color={"$gray200"}
              >
                Depósito Bancário
              </Text>
            </HStack>
          </VStack>
        </VStack>
      </ScrollView>
      {/* End - Content */}

      {/* Footer */}
      <HStack
        w={"$full"}
        px={"$6"}
        mt={"$5"}
        pb={"$7"}
        bg={"$gray700"}
        h={"$24"}
        gap={"$15"}
        alignItems="center"
        justifyContent="space-between"
      >
        <HStack alignItems="baseline" mt={"$6"}>
          <Text fontFamily="$heading" fontSize={"$md"} color={"$blue"}>
            R${" "}
          </Text>
          <Text fontFamily="$heading" fontSize={"$xl"} color={"$blue"}>
            45,00
          </Text>
        </HStack>
        <Button
          buttonVariant="primary"
          label="Entrar em contato"
          icon={WhatsappLogo}
          mt={"$6"}
        />
      </HStack>
      {/* End - Footer */}
    </VStack>
    /* End - Container */
  )
}
