import { useCallback, useEffect, useState } from "react"
import { Linking, Platform } from "react-native"
import {
  useFocusEffect,
  useNavigation,
  useRoute,
} from "@react-navigation/native"

import { AppError } from "@utils/AppError"

import {
  VStack,
  Text,
  HStack,
  ScrollView,
  useToast,
} from "@gluestack-ui/themed"
import { gluestackUIConfig } from "@config/gluestack-ui.config"

import { AppNavigatorRoutesProps } from "@routes/app.routes"

import { api } from "@services/api"
import { ProductDTO } from "@dtos/ProductDTO"

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

type RouteParamsProps = {
  productItem: ProductDTO
}

export function AdDetails() {
  const navigation = useNavigation<AppNavigatorRoutesProps>()
  const { productItem } = useRoute().params as RouteParamsProps

  const toast = useToast()
  const { tokens } = gluestackUIConfig

  function handleGoBack() {
    navigation.goBack()
  }

  return (
    /* Container */
    <VStack pt={Platform.OS === "android" ? "$12" : "$16"} flex={1}>
      <Header headerVariant="simple" onPress={handleGoBack} />

      <ProductCarousel
        data={productItem.product_images || []}
        mt={"$3"}
        isActive={productItem.is_active}
      />

      {/* Content */}
      <ScrollView showsVerticalScrollIndicator={false}>
        <VStack w={"$full"} px={"$6"} mt={"$5"} gap={"$6"}>
          <HStack alignItems="center">
            <Avatar imageSource={productItem.user?.avatar} />
            <Text fontFamily={"$body"} fontSize={"$md"} ml={"$2"}>
              {productItem.user?.name}
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

            {productItem.payment_methods.map((payment) => (
              <HStack w={"$full"} gap={"$2"} key={payment.key}>
                {payment.key === "boleto" && (
                  <Barcode size={18} color={tokens.colors.gray100} />
                )}
                {payment.key === "pix" && (
                  <QrCode size={18} color={tokens.colors.gray100} />
                )}
                {payment.key === "cash" && (
                  <Money size={18} color={tokens.colors.gray100} />
                )}
                {payment.key === "card" && (
                  <CreditCard size={18} color={tokens.colors.gray100} />
                )}
                {payment.key === "deposit" && (
                  <Bank size={18} color={tokens.colors.gray100} />
                )}
                <Text
                  textTransform="capitalize"
                  fontFamily={"$body"}
                  fontSize={"$sm"}
                  color={"$gray200"}
                >
                  {payment.name}
                </Text>
              </HStack>
            ))}
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
            {(productItem.price / 100).toFixed(2)}
          </Text>
        </HStack>
        <Button
          buttonVariant="primary"
          label="Entrar em contato"
          icon={WhatsappLogo}
          mt={"$6"}
          onPress={() =>
            Linking.openURL(`https://wa.me/${productItem.user?.tel}`)
          }
        />
      </HStack>
      {/* End - Footer */}
    </VStack>
    /* End - Container */
  )
}
