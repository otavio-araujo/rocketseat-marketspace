import { useNavigation } from "@react-navigation/native"
import {
  HStack,
  ScrollView,
  Text,
  VStack,
  Button as GluestackButton,
  ButtonText,
  ButtonIcon,
  Input,
  InputField,
  Center,
} from "@gluestack-ui/themed"

import { gluestackUIConfig } from "../../../config/gluestack-ui.config"

import Tag from "phosphor-react-native/src/icons/Tag"
import Plus from "phosphor-react-native/src/icons/Plus"
import Sliders from "phosphor-react-native/src/icons/Sliders"
import ArrowRight from "phosphor-react-native/src/icons/ArrowRight"
import MagnifyingGlass from "phosphor-react-native/src/icons/MagnifyingGlass"

import { AppNavigatorRoutesProps } from "@routes/app.routes"

import { Button } from "@components/Button"
import { Avatar } from "@components/Avatar"
import { Divider } from "@gluestack-ui/themed"
import { ProductCard } from "@components/ProductCard"
import { FlatList } from "react-native"

export function Home() {
  const navigation = useNavigation<AppNavigatorRoutesProps>()

  const { tokens } = gluestackUIConfig
  const adsList = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10]

  return (
    <VStack flex={1} px={"$8"} pt={"$8"}>
      {/* Header */}
      <HStack justifyContent="space-between" alignItems="center">
        <HStack gap={"$2"} alignItems="center">
          <Avatar />
          <VStack>
            <Text fontFamily={"$body"} fontSize={"$md"}>
              Boas vindas,
            </Text>
            <Text fontFamily={"$heading"} fontSize={"$md"}>
              Maria!
            </Text>
          </VStack>
        </HStack>
        <Button label="Criar anúncio" buttonVariant="dark" icon={Plus} />
      </HStack>
      {/* End - Header */}

      {/* User Ads - Stats */}
      <VStack mt={"$8"}>
        <Text fontFamily={"$body"} fontSize={"$sm"} color={"$gray300"}>
          Seus produtos anunciados para venda
        </Text>

        <HStack
          mt={"$3"}
          py={"$3"}
          pl={"$4"}
          pr={"$5"}
          bg="$bgBlueLight"
          rounded="$md"
          minHeight={"$16"}
          maxHeight={"$16"}
          alignItems="center"
          justifyContent="space-between"
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
            <ButtonText fontFamily="$heading" fontSize="$xs" color="$blue">
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
              color="$gray200"
              fontSize={"$md"}
              fontFamily={"$body"}
            />
          </Input>
          <HStack alignItems="center" gap={"$3"}>
            <MagnifyingGlass
              size={tokens.space[5]}
              color={tokens.colors.gray200}
              weight="bold"
            />
            <Divider orientation="vertical" bg="$gray400" h={18} w={1} />
            <Sliders
              size={tokens.space[5]}
              color={tokens.colors.gray200}
              weight="bold"
            />
          </HStack>
        </HStack>
      </VStack>
      {/* End - Search and Filters */}

      {/* Ads List */}
      <FlatList
        data={adsList}
        keyExtractor={(item) => String(item)}
        renderItem={({ item }) => <ProductCard />}
        contentContainerStyle={{
          paddingBottom: 68,
          width: "100%",
          gap: 24,
        }}
        columnWrapperStyle={{
          flex: 1,
          justifyContent: "space-between",
          gap: 20,
        }}
        numColumns={2}
        showsVerticalScrollIndicator={false}
      />
      {/* End - Ads List */}
    </VStack>
  )
}
