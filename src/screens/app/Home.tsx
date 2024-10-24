import { useCallback, useEffect, useRef, useState } from "react"
import { FlatList, Platform, TouchableOpacity } from "react-native"
import { useFocusEffect, useNavigation } from "@react-navigation/native"
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
  Image,
  useToast,
  set,
} from "@gluestack-ui/themed"
import { gluestackUIConfig } from "@config/gluestack-ui.config"

import Tag from "phosphor-react-native/src/icons/Tag"
import Plus from "phosphor-react-native/src/icons/Plus"
import Sliders from "phosphor-react-native/src/icons/Sliders"
import ArrowRight from "phosphor-react-native/src/icons/ArrowRight"
import MagnifyingGlass from "phosphor-react-native/src/icons/MagnifyingGlass"

import { AppNavigatorRoutesProps } from "@routes/app.routes"

import { useAuth } from "@hooks/useAuth"

import { api } from "@services/api"
import { AppError } from "@utils/AppError"

import { ProductDTO } from "@dtos/ProductDTO"

import { Badge } from "@components/Badge"
import { Toast } from "@components/Toast"
import { Avatar } from "@components/Avatar"
import { Button } from "@components/Button"
import { Checkbox } from "@components/Checkbox"
import { ProductCard } from "@components/ProductCard"

export function Home() {
  const navigation = useNavigation<AppNavigatorRoutesProps>()
  const { user } = useAuth()

  const { tokens } = gluestackUIConfig

  const toast = useToast()

  const [adsList, setAdsList] = useState<ProductDTO[]>([] as ProductDTO[])
  const [userTotalActiveAds, setUserTotalActiveAds] = useState(0)
  const [paymentQuery, setPaymentQuery] = useState("")
  const [payments, setPayments] = useState<string[]>([
    "pix",
    "boleto",
    "cash",
    "deposit",
    "card",
  ])
  const [isNew, setIsNew] = useState<boolean>(true)
  const [acceptTrade, setAcceptTrade] = useState<boolean>(false)
  const modalRef = useRef(null)
  const [showModal, setShowModal] = useState(false)

  function handleGoToAdDetails() {
    navigation.navigate("adDetails")
  }

  function handleGoToAdCreate() {
    navigation.navigate("adCreate")
  }

  function handleGoToUserAds() {
    navigation.navigate("userAds")
  }

  async function fetchProducts() {
    try {
      const { data } = await api.get("/products/")

      setAdsList(data)
    } catch (error) {
      const isAppError = error instanceof AppError

      const description = isAppError
        ? error.message
        : "Não foi possível carregar os anúncios."

      toast.show({
        placement: "top",
        render: ({ id }) => (
          <Toast
            id={id}
            title="Anúncios"
            toastVariant="error"
            description={description}
            onClose={() => toast.close(id)}
          />
        ),
      })
    }
  }

  async function getUserTotalActiveAds() {
    try {
      const { data } = await api.get("/users/products")

      setUserTotalActiveAds(data.filter((ad: any) => ad.is_active).length)
    } catch (error) {
      const isAppError = error instanceof AppError

      const description = isAppError
        ? error.message
        : "Não foi possível carregar o total de anúncios do usuário logado."

      toast.show({
        placement: "top",
        render: ({ id }) => (
          <Toast
            id={id}
            title="Total de anúncios do usuário logado."
            toastVariant="error"
            description={description}
            onClose={() => toast.close(id)}
          />
        ),
      })
    }
  }

  async function handleApplyFilters() {
    let payment_methods = ""

    payments.map(
      (payment) => (payment_methods += `&payment_methods=${payment}`)
    )

    const query = `?is_new=${isNew}&accept_trade=${acceptTrade}&${payment_methods}`

    try {
      const { data } = await api.get(`/products/${query}`)

      setAdsList(data)
      setShowModal(false)
    } catch (error) {
      const isAppError = error instanceof AppError

      const description = isAppError
        ? error.message
        : "Não foi possível carregar os anúncios."

      toast.show({
        placement: "top",
        render: ({ id }) => (
          <Toast
            id={id}
            title="Anúncios"
            toastVariant="error"
            description={description}
            onClose={() => toast.close(id)}
          />
        ),
      })
    }
  }

  function handleResetFilters() {
    setIsNew(true)
    setAcceptTrade(false)
    setPayments(["pix", "boleto", "cash", "deposit", "card"])
    setShowModal(false)
    fetchProducts()
  }

  useFocusEffect(
    useCallback(() => {
      fetchProducts()
      getUserTotalActiveAds()
    }, [])
  )

  return (
    /* Container */
    <VStack flex={1} px={"$8"} pt={Platform.OS === "android" ? "$12" : "$16"}>
      {/* Header */}
      <HStack justifyContent="space-between" alignItems="center" gap={"$3"}>
        <HStack gap={"$2"} alignItems="center">
          <Avatar isWelcomeAvatar />

          <VStack>
            <Text fontFamily={"$body"} fontSize={"$md"}>
              Boas vindas,
            </Text>
            <Text fontFamily={"$heading"} fontSize={"$md"}>
              {user.name}!
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
                {userTotalActiveAds}
              </Text>
              <Text fontFamily={"$body"} fontSize={"$xs"} color={"$gray200"}>
                {userTotalActiveAds > 1 ? "Anúncios ativos" : "Anúncio ativo"}
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
            <TouchableOpacity onPress={() => setShowModal(true)} ref={modalRef}>
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
        keyExtractor={(item) => item.id.toString()}
        renderItem={({ item }) => (
          <ProductCard
            onPress={handleGoToAdDetails}
            hasAvatar
            productData={item}
          />
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
                <TouchableOpacity onPress={() => setIsNew(true)}>
                  <Badge
                    label="Novo"
                    badgeVariant={isNew ? "primaryLight" : "muted"}
                    hasIcon={isNew ? true : false}
                  />
                </TouchableOpacity>

                <TouchableOpacity onPress={() => setIsNew(false)}>
                  <Badge
                    label="Usado"
                    badgeVariant={isNew ? "muted" : "primaryLight"}
                    hasIcon={isNew ? false : true}
                  />
                </TouchableOpacity>
              </HStack>
            </VStack>

            <VStack gap={"$3"} mt={"$3"} alignItems="flex-start">
              <Text fontFamily="$heading" color="$gray200" fontSize="$sm">
                Aceita troca?
              </Text>
              <HStack
                bg={acceptTrade ? "$blueLight" : "$gray500"}
                minHeight={"$8"}
                maxHeight={"$8"}
                rounded="$full"
                p={"$0"}
                px={"$1"}
                m={"$0"}
              >
                <Switch
                  onChange={() => setAcceptTrade(!acceptTrade)}
                  value={acceptTrade}
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
                  <Checkbox label="Dinheiro" value="cash" />
                  <Checkbox label="Cartão de credito" value="card" />
                  <Checkbox label="Depósito bancário" value="deposit" />
                </VStack>
              </CheckboxGroup>
            </VStack>
          </ModalBody>
          <ModalFooter>
            <HStack flex={1} gap={"$3"} justifyContent="space-between">
              <Button
                label="Resetar filtros"
                buttonVariant="muted"
                onPress={handleResetFilters}
              />
              <Button label="Aplicar filtros" onPress={handleApplyFilters} />
            </HStack>
          </ModalFooter>
        </ModalContent>
      </Modal>
      {/* End - Filter Modal */}
    </VStack>
    /* End - Container */
  )
}
