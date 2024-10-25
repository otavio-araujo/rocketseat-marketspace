import { Platform } from "react-native"
import { useCallback, useEffect, useState } from "react"
import {
  useFocusEffect,
  useNavigation,
  useRoute,
} from "@react-navigation/native"

import { gluestackUIConfig } from "../../../../config/gluestack-ui.config"
import { VStack, Text, HStack, useToast } from "@gluestack-ui/themed"

import { AppNavigatorRoutesProps } from "@routes/app.routes"

import { ProductDTO } from "@dtos/ProductDTO"
import { ProductImageDTO } from "@dtos/ProductImageDTO"

import { Badge } from "@components/Badge"
import { Avatar } from "@components/Avatar"
import { Button } from "@components/Button"
import { Header } from "@components/Header"
import { ProductCarousel } from "@components/ProductCarousel"

import Bank from "phosphor-react-native/src/icons/Bank"
import Power from "phosphor-react-native/src/icons/Power"
import Money from "phosphor-react-native/src/icons/Money"
import QrCode from "phosphor-react-native/src/icons/QrCode"
import Barcode from "phosphor-react-native/src/icons/Barcode"
import CreditCard from "phosphor-react-native/src/icons/CreditCard"
import TrashSimple from "phosphor-react-native/src/icons/TrashSimple"

export type AdDetails = {
  id: number
  uri: string
  title: string
}

type RouteParamsProps = {
  productItem: ProductDTO
}

export function UserAdDetail() {
  const navigation = useNavigation<AppNavigatorRoutesProps>()

  const toast = useToast()

  const { tokens } = gluestackUIConfig

  const { productItem } = useRoute().params as RouteParamsProps

  console.log(productItem)

  const [isActive, setIsActive] = useState(true)

  const images: ProductImageDTO[] = [
    {
      id: "0",
      path: "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    }, // https://unsplash.com/photos/Jup6QMQdLnM
    {
      id: "1",
      path: "https://images.unsplash.com/photo-1532298229144-0ec0c57515c7?q=80&w=2022&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    }, // https://unsplash.com/photos/oO62CP-g1EA
    {
      id: "2",
      path: "https://images.unsplash.com/photo-1542291026-7eec264c27ff?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
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
      <ProductCarousel
        data={productItem.product_images}
        mt={"$3"}
        isActive={isActive}
      />

      <VStack w={"$full"} px={"$6"} mt={"$5"} pb={"$7"} gap={"$6"}>
        <HStack alignItems="center">
          <Avatar imageSource={productItem.user.avatar} />
          <Text fontFamily={"$body"} fontSize={"$md"} ml={"$2"}>
            {productItem.user.name}
          </Text>
        </HStack>

        <VStack alignItems="flex-start" gap={"$2"}>
          <HStack>
            <Badge
              badgeVariant="muted"
              label={productItem.is_new ? "novo" : "usado"}
              mx={"auto"}
            />
          </HStack>

          <HStack
            w={"$full"}
            justifyContent="space-between"
            alignItems="center"
          >
            <Text fontFamily={"$heading"} fontSize={"$lg"} color={"$gray100"}>
              {productItem.name}
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
                {(productItem.price / 100).toFixed(2)}
              </Text>
            </HStack>
          </HStack>

          <Text fontFamily={"$body"} fontSize={"$sm"} color={"$gray200"}>
            {productItem.description}
          </Text>
        </VStack>

        <HStack w={"$full"} gap={"$2"}>
          <Text fontFamily={"$heading"} fontSize={"$sm"} color={"$gray200"}>
            Aceita troca?
          </Text>
          <Text fontFamily={"$body"} fontSize={"$sm"} color={"$gray200"}>
            {productItem.accept_trade ? "Sim" : "Não"}
          </Text>
        </HStack>

        <VStack w={"$full"} gap={"$2"}>
          <Text fontFamily={"$heading"} fontSize={"$sm"} color={"$gray200"}>
            Meios de pagamento:{" "}
          </Text>

          {productItem.payment_methods.map((method) => (
            <HStack w={"$full"} gap={"$2"} key={method.key}>
              {method.key === "boleto" && (
                <Barcode size={18} color={tokens.colors.gray100} />
              )}
              {method.key === "pix" && (
                <QrCode size={18} color={tokens.colors.gray100} />
              )}
              {method.key === "cash" && (
                <Money size={18} color={tokens.colors.gray100} />
              )}
              {method.key === "card" && (
                <CreditCard size={18} color={tokens.colors.gray100} />
              )}
              {method.key === "deposit" && (
                <Bank size={18} color={tokens.colors.gray100} />
              )}
              <Text
                textTransform="capitalize"
                fontFamily={"$body"}
                fontSize={"$sm"}
                color={"$gray200"}
              >
                {method.name}
              </Text>
            </HStack>
          ))}
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
