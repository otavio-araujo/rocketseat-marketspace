import { useEffect, useState } from "react"
import * as FileSystem from "expo-file-system"
import * as ImagePicker from "expo-image-picker"
import { useNavigation, useRoute } from "@react-navigation/native"
import { Platform, ScrollView, TouchableOpacity } from "react-native"

import * as yup from "yup"
import { yupResolver } from "@hookform/resolvers/yup"

import {
  Box,
  Switch,
  HStack,
  CircleIcon,
  Text,
  VStack,
  RadioGroup,
  Radio,
  RadioIndicator,
  RadioIcon,
  RadioLabel,
  CheckboxGroup,
  useToast,
  set,
} from "@gluestack-ui/themed"
import { gluestackUIConfig } from "@config/gluestack-ui.config"

import { AppError } from "@utils/AppError"

import { api } from "@services/api"
import { ProductImageDTO } from "@dtos/ProductImageDTO"

import { AppNavigatorRoutesProps } from "@routes/app.routes"

import Plus from "phosphor-react-native/src/regular/Plus"

import { Input } from "@components/Input"
import { Toast } from "@components/Toast"
import { Button } from "@components/Button"
import { Header } from "@components/Header"
import { Textarea } from "@components/Textarea"
import { Checkbox } from "@components/Checkbox"
import { ProductPhoto } from "@components/ProductPhoto"
import { Controller, useForm } from "react-hook-form"
import { useAuth } from "@hooks/useAuth"
import { ProductDTO } from "@dtos/ProductDTO"
import { paymentMethods, PaymentMethodsDTO } from "@dtos/PaymentMethodDTO"
import { formatCurrency, parseCurrency } from "@utils/CurrencyMask"
import { Loading } from "@components/Loading"

type RouteParamsProps = {
  isEditing?: boolean
  productID?: string
}

type FormData = {
  name: string
  description: string
  price: string
}

const productSchema = yup.object({
  name: yup.string().required("Nome do produto é obrigatório."),

  description: yup.string().required("A descrição do produto é obrigatória."),

  price: yup.string().required("O valor do produto é obrigatório."),
})

export function AdCreate() {
  const navigation = useNavigation<AppNavigatorRoutesProps>()
  const { isEditing, productID } = useRoute().params as RouteParamsProps
  const [isLoading, setIsLoading] = useState(false)

  const { tokens } = gluestackUIConfig
  const toast = useToast()

  const { contextProductCreate, contextProductCreateImages } = useAuth()

  const [payments, setPayments] = useState<PaymentMethodsDTO[]>([])
  const [isNew, setIsNew] = useState<"novo" | "usado">("novo")
  const [acceptTrade, setAcceptTrade] = useState(false)

  const [name, setName] = useState("")
  const [description, setDescription] = useState("")
  const [price, setPrice] = useState("")

  const [editingProduct, setEditingProduct] = useState<ProductDTO>(
    {} as ProductDTO
  )

  const [productImages, setProductImages] = useState<ProductImageDTO[]>(
    [] as ProductImageDTO[]
  )

  const {
    control,
    handleSubmit,
    setValue,
    register,
    formState: { errors },
  } = useForm<FormData>({
    resolver: yupResolver(productSchema),
  })

  function handleGoBack() {
    navigation.goBack()
  }

  async function handleGoToAdPreview(productData: FormData) {
    if (productImages.length === 0) {
      return toast.show({
        placement: "top",
        render: ({ id }) => (
          <Toast
            id={id}
            title="Fotos do produto"
            toastVariant="warning"
            description="Por favor, selecione pelo menos uma foto do produto."
            onClose={() => toast.close(id)}
          />
        ),
      })
    }

    if (payments.length < 1) {
      return toast.show({
        placement: "top",
        render: ({ id }) => (
          <Toast
            id={id}
            title="Formas de pagamento"
            toastVariant="warning"
            description="Por favor, selecione pelo menos 1 forma de pagamento."
            onClose={() => toast.close(id)}
          />
        ),
      })
    }

    const is_new = isNew === "novo" ? true : false

    if (payments.length > 0) {
      const productCreate: ProductDTO = {
        id: productID ? productID : "",
        name: productData.name,
        description: productData.description,
        price: Number(parseCurrency(productData.price)),
        is_new: is_new,
        accept_trade: acceptTrade,
        payment_methods: payments,
      }

      contextProductCreate(productCreate)
      contextProductCreateImages(productImages)

      navigation.navigate("adPreview", { isEditing })
    }
  }

  async function handleProductImageSelect() {
    try {
      const productImageSelected = await ImagePicker.launchImageLibraryAsync({
        mediaTypes: ImagePicker.MediaTypeOptions.Images,
        allowsEditing: true,
        aspect: [4, 3],
        quality: 1,
      })

      if (productImageSelected.canceled) {
        return
      }

      const photoSelected = productImageSelected.assets[0]

      if (photoSelected.uri) {
        const fileInfo = (await FileSystem.getInfoAsync(photoSelected.uri)) as {
          size: number
        }

        if (fileInfo.size && fileInfo.size / (1024 * 1024) > 6) {
          return toast.show({
            placement: "top",
            render: ({ id }) => (
              <Toast
                id={id}
                title="Foto de perfil"
                toastVariant="error"
                description="A imagem não pode ter mais que 5MB."
                onClose={() => toast.close(id)}
              />
            ),
          })
        }

        const newProductImage: ProductImageDTO = {
          id: `local:${Date.now()}`,
          path: photoSelected.uri,
        } as ProductImageDTO

        setProductImages((prevState) => [...prevState, newProductImage])
      }
    } catch (error) {
      console.log(error)
    }
  }

  function handleRemoveProductImage(id: string) {
    setProductImages((prevState) =>
      prevState.filter((image) => image.id !== id)
    )
  }

  async function fetchEditingProduct() {
    setIsLoading(true)
    try {
      const { data } = await api.get(`/products/${productID}`)
      if (data) {
        setEditingProduct(data)
      }
    } catch (error) {
      const isAppError = error instanceof AppError

      const description = isAppError
        ? error.message
        : "Não foi possível carregar os dados do anúncio."

      toast.show({
        placement: "top",
        render: ({ id }) => (
          <Toast
            id={id}
            title="Anúncio"
            toastVariant="error"
            description={description}
            onClose={() => toast.close(id)}
          />
        ),
      })
    } finally {
      setIsLoading(false)
    }
  }

  function handlePriceMask(price: string) {
    const formattedPrice = formatCurrency(price)

    setValue("price", formattedPrice)
  }

  useEffect(() => {
    if (isEditing) {
      fetchEditingProduct()
    }
  }, [isEditing])

  useEffect(() => {
    if (isEditing) {
      setProductImages(editingProduct.product_images || [])
      setIsNew(editingProduct.is_new ? "novo" : "usado")
      setAcceptTrade(editingProduct.accept_trade === true ? true : false)
      setPayments(editingProduct.payment_methods)

      setValue("name", editingProduct.name)
      setValue("description", editingProduct.description)
      setValue("price", formatCurrency(String(editingProduct.price)))
    }
  }, [editingProduct])

  return isLoading && isEditing ? (
    <Loading />
  ) : (
    <VStack flex={1} gap={"$4"} pt={Platform.OS === "android" ? "$12" : "$16"}>
      {/* Header */}
      <Header
        title={isEditing ? "Editar anúncio" : "Criar anúncio"}
        headerVariant="create"
        onPress={handleGoBack}
      />
      {/* End - Header */}
      <ScrollView showsVerticalScrollIndicator={false}>
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
              {productImages.map((image) => (
                <ProductPhoto
                  photo={image}
                  key={image.id}
                  handleRemoveProductImage={() =>
                    handleRemoveProductImage(image.id)
                  }
                />
              ))}

              {productImages.length < 3 && (
                <TouchableOpacity onPress={handleProductImageSelect}>
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
              )}
            </HStack>
          </VStack>
          {/* End - Product Photos */}

          {/* About Product */}
          <VStack gap={"$4"}>
            <Text fontFamily={"$heading"} fontSize={"$md"} color={"$gray200"}>
              Sobre o produto
            </Text>

            <Controller
              control={control}
              name="name"
              render={({ field: { onChange, value } }) => (
                <Input
                  type="text"
                  placeholder="Título do anúncio"
                  onChangeText={onChange}
                  value={value}
                  errorMessages={errors.name?.message}
                />
              )}
            />

            <Controller
              control={control}
              name="description"
              render={({ field: { onChange, value } }) => (
                <Textarea
                  placeholder="Descrição do anúncio"
                  onChangeText={onChange}
                  value={value}
                  errorMessages={errors.name?.message}
                />
              )}
            />

            <RadioGroup value={isNew} onChange={setIsNew}>
              <HStack gap={"$5"}>
                <Radio value="novo">
                  <RadioIndicator mr="$2" $checked-borderColor="$blueLight">
                    <RadioIcon
                      as={CircleIcon}
                      color={tokens.colors.blueLight}
                    />
                  </RadioIndicator>
                  <RadioLabel
                    fontFamily={"$body"}
                    fontSize={"$md"}
                    color={"$gray200"}
                  >
                    Produto novo
                  </RadioLabel>
                </Radio>
                <Radio value="usado">
                  <RadioIndicator mr="$2" $checked-borderColor="$blueLight">
                    <RadioIcon
                      as={CircleIcon}
                      color={tokens.colors.blueLight}
                    />
                  </RadioIndicator>
                  <RadioLabel
                    fontFamily={"$body"}
                    fontSize={"$md"}
                    color={"$gray200"}
                  >
                    Produto usado
                  </RadioLabel>
                </Radio>
              </HStack>
            </RadioGroup>
          </VStack>
          {/* End - About Product */}

          {/* Sales Details */}
          <VStack gap={"$4"}>
            <Text fontFamily={"$heading"} fontSize={"$md"} color={"$gray200"}>
              Vendas
            </Text>

            <Controller
              control={control}
              name="price"
              render={({ field: { onChange, value } }) => (
                <Input
                  placeholder="Valor do produto"
                  onChangeText={(value) => handlePriceMask(value)}
                  value={value}
                  inputVariant="money"
                  keyboardType="numeric"
                  errorMessages={errors.price?.message}
                />
              )}
            />

            <VStack gap={"$3"}>
              <Text fontFamily={"$heading"} fontSize={"$md"} color={"$gray200"}>
                Aceita troca?
              </Text>

              <HStack
                bg={acceptTrade ? "$blueLight" : "$gray500"}
                rounded="$full"
                p={"$0"}
                px={"$1"}
                mr={"auto"}
                minHeight={"$8"}
                maxHeight={"$8"}
              >
                <Switch
                  p={"$0"}
                  m={"$0"}
                  value={acceptTrade}
                  onChange={() => setAcceptTrade(!acceptTrade)}
                  sx={{
                    _light: {
                      props: {
                        trackColor: {
                          false: "$gray500",
                          true: "$blueLight",
                        },
                        transform: [
                          {
                            scale: 1.25,
                          },
                        ],
                      },
                    },
                  }}
                />
              </HStack>
            </VStack>

            <VStack gap={"$3"}>
              <Text fontFamily={"$heading"} fontSize={"$md"} color={"$gray200"}>
                Meios de pagamentos aceitos:
              </Text>

              <CheckboxGroup
                value={payments?.map((payment) => payment.key) || []}
                onChange={(keys: string[]) => {
                  setPayments(keys.map((key) => ({ key, name: key })))
                }}
              >
                <VStack gap={"$2"}>
                  <Checkbox label="Boleto" value="boleto" />
                  <Checkbox label="Pix" value="pix" />
                  <Checkbox label="Dinheiro" value="cash" />
                  <Checkbox label="Cartão de crédito" value="card" />
                  <Checkbox label="Depósito bancário" value="deposit" />
                </VStack>
              </CheckboxGroup>
            </VStack>
          </VStack>
          {/* End - Sales Details */}
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
          label="Cancelar"
          mt={"$6"}
          flex={1}
          onPress={handleGoBack}
        />

        <Button
          buttonVariant="dark"
          label="Avançar"
          mt={"$6"}
          flex={1}
          onPress={handleSubmit(handleGoToAdPreview)}
        />
      </HStack>
    </VStack>
  )
}
