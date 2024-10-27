import { useState } from "react"
import { useNavigation } from "@react-navigation/native"
import { Platform, ScrollView, TouchableOpacity } from "react-native"
import * as yup from "yup"

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
  FormControlError,
  FormControl,
} from "@gluestack-ui/themed"
import { gluestackUIConfig } from "@config/gluestack-ui.config"

import { AppError } from "@utils/AppError"

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
import { yupResolver } from "@hookform/resolvers/yup"
import { FormControlErrorText } from "@gluestack-ui/themed"

export type ProductPhotoProps = {
  id: number
  uri: string
  title: string
}

type FormData = {
  name: string
  description: string
  price: number
}

const productSchema = yup.object({
  name: yup.string().required("Nome do produto é obrigatório."),

  description: yup.string().required("A descrição do produto é obrigatória."),

  price: yup.number().required("O valor do produto é obrigatório."),
})

export function AdCreate() {
  const images: ProductPhotoProps[] = [
    {
      id: 0,
      uri: "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
      title: "HeadPhones",
    }, // https://unsplash.com/photos/Jup6QMQdLnM
  ]

  const navigation = useNavigation<AppNavigatorRoutesProps>()

  const { tokens } = gluestackUIConfig
  const toast = useToast()

  const [payments, setPayments] = useState([])
  const [isNew, setIsNew] = useState<"novo" | "usado">("novo")
  const [acceptTrade, setAcceptTrade] = useState(false)

  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<FormData>({
    resolver: yupResolver(productSchema),
  })

  function handleGoToAdPreview(productData: FormData) {
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
    console.log("Payment Methods: ", payments)
    console.log("Accept Trade: ", acceptTrade)
    console.log("É novo?: ", isNew)
    console.log("Product Data: ", productData)

    // navigation.navigate("adPreview")
  }
  function handleGoBack() {
    navigation.goBack()
  }

  return (
    <VStack flex={1} gap={"$4"} pt={Platform.OS === "android" ? "$12" : "$16"}>
      {/* Header */}
      <Header
        title="Criar anúncio"
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
              {images.map((image) => (
                <ProductPhoto photo={image} key={image.id} />
              ))}

              {images.length < 3 && (
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
                  onChangeText={onChange}
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
                value={payments}
                onChange={(keys) => {
                  setPayments(keys)
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
