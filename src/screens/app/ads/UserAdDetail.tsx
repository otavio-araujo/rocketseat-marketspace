import { Platform } from "react-native"
import { useCallback, useEffect, useState } from "react"
import {
  useFocusEffect,
  useNavigation,
  useRoute,
} from "@react-navigation/native"

import { gluestackUIConfig } from "../../../../config/gluestack-ui.config"
import {
  VStack,
  Text,
  HStack,
  useToast,
  Modal,
  ModalBackdrop,
  ModalContent,
  ModalHeader,
  Heading,
  ModalCloseButton,
  ModalFooter,
  Icon,
  CloseIcon,
} from "@gluestack-ui/themed"

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
import { AppError } from "@utils/AppError"
import { Toast } from "@components/Toast"
import { api } from "@services/api"
import { paymentMethods } from "@dtos/PaymentMethodDTO"
import { ModalBody } from "@gluestack-ui/themed"
import { formatCurrency } from "@utils/CurrencyMask"

export type AdDetails = {
  id: number
  uri: string
  title: string
}

type RouteParamsProps = {
  productItem?: ProductDTO
  updatedProduct?: ProductDTO
}

export function UserAdDetail() {
  const navigation = useNavigation<AppNavigatorRoutesProps>()

  const toast = useToast()
  const [showModal, setShowModal] = useState(false)

  const { tokens } = gluestackUIConfig

  const { productItem, updatedProduct } = useRoute().params as RouteParamsProps

  const [product, setProduct] = useState<ProductDTO>(productItem as ProductDTO)

  function handleGoBack() {
    navigation.goBack()
  }

  async function handleIsActive() {
    try {
      const response = await api.patch(`/products/${product.id}`, {
        is_active: !product.is_active,
      })
      if (response.status === 204) {
        toast.show({
          placement: "top",
          render: ({ id }) => (
            <Toast
              id={id}
              title="Visibilidade do anúncio"
              toastVariant="success"
              description="Visibilidade do anúncio alterada com sucesso."
              onClose={() => toast.close(id)}
            />
          ),
        })
      }

      const { data } = await api.get(`/products/${product.id}`)

      const updatedProduct: ProductDTO = data
      setProduct(updatedProduct)
    } catch (error) {
      const isAppError = error instanceof AppError
      const description = isAppError
        ? error.message
        : "Não foi possível ativar ou desativar o anúncio."

      toast.show({
        placement: "top",
        render: ({ id }) => (
          <Toast
            id={id}
            title="Ativar ou desativar anúncio"
            toastVariant="error"
            description={description}
            onClose={() => toast.close(id)}
          />
        ),
      })
    }
  }

  async function handleDeleteAd(productId: string) {
    try {
      await api.delete(`/products/${productId}`)

      navigation.goBack()
    } catch (error) {
      const isAppError = error instanceof AppError

      const description = isAppError
        ? error.message
        : "Não foi possível deletar o anúncio."

      toast.show({
        placement: "top",
        render: ({ id }) => (
          <Toast
            id={id}
            title="Meus anúncios"
            toastVariant="error"
            description={description}
            onClose={() => toast.close(id)}
          />
        ),
      })
    } finally {
      setShowModal(false)
    }
  }

  async function handleEditAd(productID: string) {
    navigation.navigate("adCreate", { productID, isEditing: true })
  }

  useFocusEffect(
    useCallback(() => {
      if (productItem) {
        setProduct(productItem)
      }

      if (updatedProduct) {
        setProduct(updatedProduct)
      }
    }, [productItem])
  )

  return (
    <VStack pt={Platform.OS === "android" ? "$8" : "$12"}>
      <Header
        handleCreateAd={() => {}}
        handleEditAd={() => handleEditAd(product.id || "")}
        headerVariant="adDetails"
        onPress={handleGoBack}
      />
      <ProductCarousel
        data={product.product_images || []}
        mt={"$3"}
        isActive={product.is_active}
      />

      <VStack w={"$full"} px={"$6"} mt={"$5"} pb={"$7"} gap={"$6"}>
        <HStack alignItems="center">
          <Avatar imageSource={product.user?.avatar || null} />
          <Text fontFamily={"$body"} fontSize={"$md"} ml={"$2"}>
            {product.user?.name}
          </Text>
        </HStack>

        <VStack alignItems="flex-start" gap={"$2"}>
          <HStack>
            <Badge
              badgeVariant="muted"
              label={product.is_new ? "novo" : "usado"}
              mx={"auto"}
            />
          </HStack>

          <HStack
            w={"$full"}
            justifyContent="space-between"
            alignItems="center"
          >
            <Text fontFamily={"$heading"} fontSize={"$lg"} color={"$gray100"}>
              {product.name}
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
                {formatCurrency(String(product.price))}
              </Text>
            </HStack>
          </HStack>

          <Text fontFamily={"$body"} fontSize={"$sm"} color={"$gray200"}>
            {product.description}
          </Text>
        </VStack>

        <HStack w={"$full"} gap={"$2"}>
          <Text fontFamily={"$heading"} fontSize={"$sm"} color={"$gray200"}>
            Aceita troca?
          </Text>
          <Text fontFamily={"$body"} fontSize={"$sm"} color={"$gray200"}>
            {product.accept_trade ? "Sim" : "Não"}
          </Text>
        </HStack>

        <VStack w={"$full"} gap={"$2"}>
          <Text fontFamily={"$heading"} fontSize={"$sm"} color={"$gray200"}>
            Meios de pagamento:{" "}
          </Text>

          {product.payment_methods.map((payment) => (
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

        <VStack w={"$full"} gap={"$2"}>
          {product.is_active ? (
            <Button
              label="Desativar anúncio"
              buttonVariant="dark"
              icon={Power}
              onPress={handleIsActive}
            />
          ) : (
            <Button
              label="Reativar anúncio"
              buttonVariant="primary"
              icon={Power}
              onPress={handleIsActive}
            />
          )}
          <Button
            label="Excluir anúncio"
            buttonVariant="muted"
            icon={TrashSimple}
            onPress={() => setShowModal(true)}
          />
        </VStack>
      </VStack>
      <Modal
        isOpen={showModal}
        onClose={() => {
          setShowModal(false)
        }}
        size={"lg"}
      >
        <ModalBackdrop />
        <ModalContent>
          <ModalHeader>
            <Heading fontFamily={"$heading"} color="$gray100" fontSize={"$xl"}>
              Apagar anúncio
            </Heading>
            <ModalCloseButton>
              <Icon as={CloseIcon} />
            </ModalCloseButton>
          </ModalHeader>
          <ModalBody my={"$2"}>
            <Text color={"$gray200"} fontFamily={"$body"} fontSize={"$md"}>
              Deseja realmente apagar o anúncio "{product.name}"?
            </Text>
          </ModalBody>
          <ModalFooter gap={"$2"}>
            <Button
              buttonVariant="muted"
              label="Cancelar"
              onPress={() => setShowModal(false)}
            />
            <Button
              buttonVariant="dark"
              label="Sim, apagar."
              onPress={() => handleDeleteAd(product.id || "")}
            />
          </ModalFooter>
        </ModalContent>
      </Modal>
    </VStack>
  )
}
