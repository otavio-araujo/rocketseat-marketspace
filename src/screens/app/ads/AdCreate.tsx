import { useState } from "react"
import { ScrollView, TouchableOpacity } from "react-native"
import { useNavigation } from "@react-navigation/native"

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
} from "@gluestack-ui/themed"
import { gluestackUIConfig } from "../../../../config/gluestack-ui.config"

import { AppNavigatorRoutesProps } from "@routes/app.routes"

import Plus from "phosphor-react-native/src/regular/Plus"

import { Input } from "@components/Input"
import { Button } from "@components/Button"
import { Header } from "@components/Header"
import { Textarea } from "@components/Textarea"
import { Checkbox } from "@components/Checkbox"
import { ProductPhoto } from "@components/ProductPhoto"

export type ProductPhotoProps = {
  id: number
  uri: string
  title: string
}

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
  const [productCondition, setProductCondition] = useState("")
  const [isExchangeable, setIsExchangeable] = useState(false)
  const [payments, setPayments] = useState([])

  function handleGoToAdPreview() {
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

            <Input placeholder="Título do anúncio" />

            <Textarea placeholder="Descrição do produto" />

            <RadioGroup value={productCondition} onChange={setProductCondition}>
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

            <Input
              placeholder="Valor do produto"
              inputVariant="money"
              keyboardType="numeric"
            />

            <VStack gap={"$3"}>
              <Text fontFamily={"$heading"} fontSize={"$md"} color={"$gray200"}>
                Aceita troca?
              </Text>

              <HStack
                bg={isExchangeable ? "$blueLight" : "$gray500"}
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
                  onChange={() => setIsExchangeable(!isExchangeable)}
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
                  <Checkbox label="Dinheiro" value="dinheiro" />
                  <Checkbox label="Cartão de crédito" value="cartao" />
                  <Checkbox label="Depósito bancário" value="deposito" />
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
          onPress={handleGoToAdPreview}
        />
      </HStack>
    </VStack>
  )
}
