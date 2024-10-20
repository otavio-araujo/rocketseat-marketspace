import { useEffect, useRef, useState } from "react"
import { FlatList, TouchableOpacity } from "react-native"
import { useNavigation } from "@react-navigation/native"
import {
  Icon,
  Text,
  VStack,
  HStack,
  Switch,
  ButtonText,
  ButtonIcon,
  Button as GluestackButton,
  Input,
  InputField,
  Modal,
  ModalBody,
  ModalHeader,
  ModalFooter,
  ModalContent,
  ModalBackdrop,
  ModalCloseButton,
  Divider,
  CloseIcon,
  CheckboxGroup,
} from "@gluestack-ui/themed"

import { gluestackUIConfig } from "../../../config/gluestack-ui.config"

import Tag from "phosphor-react-native/src/icons/Tag"
import Plus from "phosphor-react-native/src/icons/Plus"
import Sliders from "phosphor-react-native/src/icons/Sliders"
import ArrowRight from "phosphor-react-native/src/icons/ArrowRight"
import MagnifyingGlass from "phosphor-react-native/src/icons/MagnifyingGlass"

import { AppNavigatorRoutesProps } from "@routes/app.routes"

import { Badge } from "@components/Badge"
import { Avatar } from "@components/Avatar"
import { Button } from "@components/Button"
import { Checkbox } from "@components/Checkbox"
import { ProductCard } from "@components/ProductCard"

export function Home() {
  const navigation = useNavigation<AppNavigatorRoutesProps>()

  const { tokens } = gluestackUIConfig
  const [payments, setPayments] = useState([
    "boleto",
    "pix",
    "cartao",
    "deposito",
    "dinheiro",
  ])
  const adsList = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10]
  const [showModal, setShowModal] = useState(false)
  const [isExchangeable, setIsExchangeable] = useState<boolean>(false)
  const ref = useRef(null)

  function handleGoToAdDetails() {
    navigation.navigate("adDetails")
  }

  function handleGoToAdCreate() {
    navigation.navigate("adCreate")
  }

  function handleGoToUserAds() {
    navigation.navigate("userAds")
  }

  return (
    /* Container */
    <VStack flex={1} px={"$8"} pt={"$8"}>
      {/* Header */}
      <HStack justifyContent="space-between" alignItems="center" gap={"$3"}>
        <HStack gap={"$2"} alignItems="center">
          <Avatar isWelcomeAvatar />
          <VStack>
            <Text fontFamily={"$body"} fontSize={"$md"}>
              Boas vindas,
            </Text>
            <Text fontFamily={"$heading"} fontSize={"$md"}>
              Maria!
            </Text>
          </VStack>
        </HStack>
        <Button
          onPress={handleGoToAdCreate}
          label="Criar anúncio"
          buttonVariant="dark"
          icon={Plus}
        />
      </HStack>
      {/* End - Header */}

      {/* User Ads - Stats */}
      <VStack mt={"$8"}>
        <Text fontFamily={"$body"} fontSize={"$sm"} color={"$gray300"}>
          Seus produtos anunciados para venda
        </Text>

        <HStack
          justifyContent="space-between"
          alignItems="center"
          bg="$bgBlueLight"
          minHeight={"$16"}
          maxHeight={"$16"}
          rounded="$md"
          mt={"$3"}
          py={"$3"}
          pl={"$4"}
          pr={"$5"}
        >
          <HStack gap={"$4"} alignItems="center">
            <Tag size={tokens.space[6]} color={tokens.colors.blue} />
            <VStack>
              <Text fontFamily={"$heading"} fontSize={"$lg"} color={"$gray200"}>
                5
              </Text>
              <Text fontFamily={"$body"} fontSize={"$xs"} color={"$gray200"}>
                Anúncios ativos
              </Text>
            </VStack>
          </HStack>
          <GluestackButton variant="link">
            <ButtonText
              onPress={handleGoToUserAds}
              fontFamily="$heading"
              fontSize="$xs"
              color="$blue"
            >
              Meus anúncios
            </ButtonText>
            <ButtonIcon as={ArrowRight} size="xs" color="$blue" ml="$1" />
          </GluestackButton>
        </HStack>
      </VStack>
      {/* End - User Ads - Stats */}

      {/* Search and Filters */}
      <VStack mt={"$8"} mb={"$6"}>
        <Text fontFamily={"$body"} fontSize={"$sm"} color={"$gray300"}>
          Compre produtos variados
        </Text>
        <HStack
          justifyContent="space-between"
          alignItems="center"
          minHeight={"$11"}
          maxHeight={"$11"}
          bg={"$gray700"}
          rounded="$md"
          mt={"$3"}
          px={"$4"}
          py={"$3"}
          gap={"$3"}
        >
          <Input flex={1} h={"auto"} borderWidth={0}>
            <InputField
              placeholderTextColor={"$gray400"}
              placeholder="Buscar anúncio"
              fontFamily={"$body"}
              color="$gray200"
              fontSize={"$md"}
            />
          </Input>
          <HStack alignItems="center" gap={"$3"}>
            <TouchableOpacity onPress={() => {}}>
              <MagnifyingGlass
                color={tokens.colors.gray200}
                size={tokens.space[5]}
                weight="bold"
              />
            </TouchableOpacity>
            <Divider orientation="vertical" bg="$gray400" h={18} w={1} />
            <TouchableOpacity onPress={() => setShowModal(true)} ref={ref}>
              <Sliders
                color={tokens.colors.gray200}
                size={tokens.space[5]}
                weight="bold"
              />
            </TouchableOpacity>
          </HStack>
        </HStack>
      </VStack>
      {/* End - Search and Filters */}

      {/* Ads List */}
      <FlatList
        data={adsList}
        keyExtractor={(item) => String(item)}
        renderItem={({ item }) => (
          <ProductCard onPress={handleGoToAdDetails} hasAvatar />
        )}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{
          paddingBottom: 68,
          width: "100%",
          gap: 24,
        }}
        columnWrapperStyle={{
          justifyContent: "space-between",
          flex: 1,
          gap: 20,
        }}
        numColumns={2}
      />
      {/* End - Ads List */}

      {/* Filter Modal */}
      <Modal
        isOpen={showModal}
        onClose={() => {
          setShowModal(false)
        }}
        finalFocusRef={ref}
      >
        <ModalBackdrop />
        <ModalContent
          borderTopLeftRadius={"$3xl"}
          borderTopRightRadius={"$3xl"}
          position="absolute"
          w={"$full"}
          bottom={0}
          pt={"$12"}
          px={"$6"}
          pb={"$8"}
          flex={1}
        >
          <ModalHeader>
            <Text size="lg" fontFamily="$heading" color="$gray100">
              Filtrar anúncios
            </Text>
            <ModalCloseButton>
              <Icon as={CloseIcon} />
            </ModalCloseButton>
          </ModalHeader>
          <ModalBody mt={"$6"}>
            <VStack gap={"$3"}>
              <Text fontFamily="$heading" color="$gray200" fontSize="$sm">
                Condição
              </Text>
              <HStack gap={"$3"}>
                <Badge label="Novo" badgeVariant="primaryLight" hasIcon />
                <Badge label="Usado" badgeVariant="muted" />
              </HStack>
            </VStack>

            <VStack gap={"$3"} mt={"$3"} alignItems="flex-start">
              <Text fontFamily="$heading" color="$gray200" fontSize="$sm">
                Aceita troca?
              </Text>
              <HStack
                bg={isExchangeable ? "$blueLight" : "$gray500"}
                minHeight={"$8"}
                maxHeight={"$8"}
                rounded="$full"
                p={"$0"}
                px={"$1"}
                m={"$0"}
              >
                <Switch
                  onChange={() => setIsExchangeable(!isExchangeable)}
                  p={"$0"}
                  m={"$0"}
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

            <VStack gap={"$3"} mt={"$3"} alignItems="flex-start">
              <Text fontFamily="$heading" color="$gray200" fontSize="$sm">
                Meios de pagamento aceitos
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
                  <Checkbox label="Cartão de credito" value="cartao" />
                  <Checkbox label="Depósito bancário" value="deposito" />
                </VStack>
              </CheckboxGroup>
            </VStack>
          </ModalBody>
          <ModalFooter>
            <HStack flex={1} gap={"$3"} justifyContent="space-between">
              <Button
                label="Resetar filtros"
                buttonVariant="muted"
                onPress={() => {}}
              />
              <Button label="Aplicar filtros" onPress={() => {}} />
            </HStack>
          </ModalFooter>
        </ModalContent>
      </Modal>
      {/* End - Filter Modal */}
    </VStack>
    /* End - Container */
  )
}
