import { StackActions, useNavigation } from "@react-navigation/native"

import { gluestackUIConfig } from "../../../../config/gluestack-ui.config"
import {
  VStack,
  Text,
  HStack,
  ScrollView,
  Center,
  SafeAreaView,
  useToast,
} from "@gluestack-ui/themed"

import { AppNavigatorRoutesProps } from "@routes/app.routes"

import { Badge } from "@components/Badge"
import { Avatar } from "@components/Avatar"
import { Button } from "@components/Button"
import { StatusBar } from "@components/StatusBar"
import { ProductCarousel } from "@components/ProductCarousel"

import Tag from "phosphor-react-native/src/icons/Tag"
import Bank from "phosphor-react-native/src/icons/Bank"
import Money from "phosphor-react-native/src/icons/Money"
import QrCode from "phosphor-react-native/src/icons/QrCode"
import Barcode from "phosphor-react-native/src/icons/Barcode"
import ArrowLeft from "phosphor-react-native/src/icons/ArrowLeft"
import CreditCard from "phosphor-react-native/src/icons/CreditCard"

import { Platform } from "react-native"
import { useAuth } from "@hooks/useAuth"
import { AppError } from "@utils/AppError"
import { Toast } from "@components/Toast"
import { api } from "@services/api"

export function AdPreview() {
  const navigation = useNavigation<AppNavigatorRoutesProps>()

  const toast = useToast()

  const { tokens } = gluestackUIConfig

  const { productCreate, productCreateImages, user } = useAuth()

  function handleGoBack() {
    navigation.goBack()
  }

  async function handleProductCreateImage(productID: string) {
    try {
      productCreateImages.map(async (image) => {
        const fileExtension = image.path.split(".").pop()

        const productImage = {
          name: `${Date.now()}.${fileExtension}`,
          uri: image.path,
          type: `image/${fileExtension}`,
        } as any

        const formData = new FormData()
        formData.append("product_id", productID)
        formData.append("images", productImage)

        const { data } = await api.post("/products/images", formData, {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        })
      })
    } catch (error) {
      const isAppError = error instanceof AppError

      const description = isAppError
        ? error.message
        : "Anúncio criado. Porém, as imagens não foram carregadas."

      toast.show({
        placement: "top",
        render: ({ id }) => (
          <Toast
            id={id}
            title="Upload das imagens do anúncio"
            toastVariant="error"
            description={description}
            onClose={() => toast.close(id)}
          />
        ),
      })
    }
  }

  async function handleCreateAd() {
    const paymentsFiltered = productCreate.payment_methods.map((payment) => {
      return payment.key
    })

    const productCreateData = {
      ...productCreate,
      payment_methods: paymentsFiltered,
    }

    try {
      const { data, status } = await api.post("/products", productCreateData)
      if (status === 201) {
        await handleProductCreateImage(data.id)
      }
      navigation.navigate("home")
    } catch (error) {
      const isAppError = error instanceof AppError

      const description = isAppError
        ? error.message
        : "Não foi possível criar o anúncio."

      toast.show({
        placement: "top",
        render: ({ id }) => (
          <Toast
            id={id}
            title="Criar anúncio"
            toastVariant="error"
            description={description}
            onClose={() => toast.close(id)}
          />
        ),
      })
    }
  }

  return (
    <VStack flex={1}>
      <StatusBar
        barStyle="dark-content"
        backgroundColor={tokens.colors.blueLight}
        translucent
      />
      <Center
        pt={Platform.OS === "android" ? "$12" : "$18"}
        bg={"$blueLight"}
        gap={2}
        px={"$6"}
        pb={"$4"}
        justifyContent="center"
      >
        <Text fontFamily={"$heading"} fontSize={"$md"} color={"$gray700"}>
          Pré visualização do anúncio
        </Text>
        <Text fontFamily={"$body"} fontSize={"$sm"} color={"$gray700"}>
          É assim que seu produto vai aparecer!
        </Text>
      </Center>

      <ProductCarousel data={productCreateImages} isPreviewing />
      <ScrollView showsVerticalScrollIndicator={false}>
        <VStack w={"$full"} px={"$6"} mt={"$5"} gap={"$6"}>
          <HStack alignItems="center">
            <Avatar imageSource={user.avatar} />
            <Text fontFamily={"$body"} fontSize={"$sm"} ml={"$2"}>
              {user.name}
            </Text>
          </HStack>

          <VStack alignItems="flex-start" gap={"$2"}>
            <HStack>
              <Badge
                badgeVariant="muted"
                label={productCreate.is_new ? "novo" : "usado"}
                mx={"auto"}
              />
            </HStack>

            <HStack
              w={"$full"}
              justifyContent="space-between"
              alignItems="center"
            >
              <Text fontFamily={"$heading"} fontSize={"$lg"} color={"$gray100"}>
                {productCreate.name}
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
                  {productCreate.price.toFixed(2)}
                </Text>
              </HStack>
            </HStack>

            <Text fontFamily={"$body"} fontSize={"$sm"} color={"$gray200"}>
              {productCreate.description}
            </Text>
          </VStack>

          <HStack w={"$full"} gap={"$2"}>
            <Text fontFamily={"$heading"} fontSize={"$sm"} color={"$gray200"}>
              Aceita troca?
            </Text>
            <Text fontFamily={"$body"} fontSize={"$sm"} color={"$gray200"}>
              {productCreate.accept_trade ? "Sim" : "Nao"}
            </Text>
          </HStack>

          <VStack w={"$full"} gap={"$2"}>
            <Text fontFamily={"$heading"} fontSize={"$sm"} color={"$gray200"}>
              Meios de pagamento:{" "}
            </Text>

            {productCreate.payment_methods.map((payment) => (
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

      <HStack
        w={"$full"}
        px={"$6"}
        mt={"$5"}
        pb={"$7"}
        bg={"$gray700"}
        h={"$24"}
        gap={"$3"}
        alignItems="center"
        justifyContent="space-between"
      >
        <Button
          buttonVariant="muted"
          label="Voltar e editar"
          mt={"$6"}
          flex={1}
          icon={ArrowLeft}
          onPress={handleGoBack}
        />

        <Button
          buttonVariant="primary"
          label="Publicar"
          mt={"$6"}
          flex={1}
          icon={Tag}
          onPress={handleCreateAd}
        />
      </HStack>
    </VStack>
  )
}
