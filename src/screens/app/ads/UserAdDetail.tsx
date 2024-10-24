import { useState } from "react"
import { useNavigation } from "@react-navigation/native"

import { gluestackUIConfig } from "../../../../config/gluestack-ui.config"
import { VStack, Text, HStack } from "@gluestack-ui/themed"

import { AppNavigatorRoutesProps } from "@routes/app.routes"

import { Badge } from "@components/Badge"
import { Avatar } from "@components/Avatar"
import { Button } from "@components/Button"
import { Header } from "@components/Header"
import { ProductCarousel } from "@components/ProductCarousel"

import Barcode from "phosphor-react-native/src/icons/Barcode"
import QrCode from "phosphor-react-native/src/icons/QrCode"
import Bank from "phosphor-react-native/src/icons/Bank"
import Power from "phosphor-react-native/src/icons/Power"
import TrashSimple from "phosphor-react-native/src/icons/TrashSimple"
import { Platform } from "react-native"

export type AdDetails = {
  id: number
  uri: string
  title: string
}

export function UserAdDetail() {
  const navigation = useNavigation<AppNavigatorRoutesProps>()
  const { tokens } = gluestackUIConfig

  const [isActive, setIsActive] = useState(true)

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
    <VStack pt={Platform.OS === "android" ? "$8" : "$12"}>
      <Header
        handleCreateAd={() => {}}
        handleEditAd={() => {}}
        headerVariant="adDetails"
        onPress={handleGoBack}
        title="Criar anúncio"
      />

      <ProductCarousel data={images} mt={"$3"} isActive={isActive} />

      <VStack w={"$full"} px={"$6"} mt={"$5"} pb={"$7"} gap={"$6"}>
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
            <Text fontFamily={"$body"} fontSize={"$sm"} color={"$gray200"}>
              Boleto
            </Text>
          </HStack>
          <HStack w={"$full"} gap={"$2"}>
            <QrCode size={18} color={tokens.colors.gray100} />
            <Text fontFamily={"$body"} fontSize={"$sm"} color={"$gray200"}>
              Pix
            </Text>
          </HStack>
          <HStack w={"$full"} gap={"$2"}>
            <Bank size={18} color={tokens.colors.gray100} />
            <Text fontFamily={"$body"} fontSize={"$sm"} color={"$gray200"}>
              Depósito Bancário
            </Text>
          </HStack>
        </VStack>

        <VStack w={"$full"} gap={"$2"}>
          {isActive ? (
            <Button
              label="Desativar anúncio"
              buttonVariant="dark"
              icon={Power}
              onPress={() => setIsActive(false)}
            />
          ) : (
            <Button
              label="Reativar anúncio"
              buttonVariant="primary"
              icon={Power}
              onPress={() => setIsActive(true)}
            />
          )}
          <Button
            label="Excluir anúncio"
            buttonVariant="muted"
            icon={TrashSimple}
          />
        </VStack>
      </VStack>
    </VStack>
  )
}
