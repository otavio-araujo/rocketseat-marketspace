import { useCallback, useEffect, useState } from "react"
import { useFocusEffect, useNavigation } from "@react-navigation/native"

import { FlatList, HStack, Text, VStack, useToast } from "@gluestack-ui/themed"

import { AppNavigatorRoutesProps } from "@routes/app.routes"

import { api } from "@services/api"

import { ProductDTO } from "@dtos/ProductDTO"

import { AppError } from "@utils/AppError"

import { Toast } from "@components/Toast"
import { Header } from "@components/Header"
import { Selectbox } from "@components/Selectbox"
import { ProductCard } from "@components/ProductCard"

export function UserAds() {
  const navigation = useNavigation<AppNavigatorRoutesProps>()
  const toast = useToast()
  const adStatuses = ["todos", "ativos", "desativados"]
  const [adStatus, setAdStatus] = useState("todos")
  const [adsList, setAdsList] = useState<ProductDTO[]>([] as ProductDTO[])

  function handleUserAdDetail() {
    navigation.navigate("userAdDetail")
  }

  function handleGoToAdCreate() {
    navigation.navigate("adCreate")
  }

  async function fetchProducts() {
    try {
      const { data } = await api.get("/users/products")

      setAdsList(data)
    } catch (error) {
      const isAppError = error instanceof AppError

      const description = isAppError
        ? error.message
        : "Não foi possível carregar os anúncios."

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
    }
  }

  function handleGoBack() {
    navigation.goBack()
  }

  useFocusEffect(
    useCallback(() => {
      fetchProducts()
    }, [])
  )

  return (
    /* Container */
    <VStack flex={1} gap={"$4"} pt={"$12"}>
      <Header
        title="Meus anúncios"
        headerVariant="userAds"
        handleCreateAd={handleGoToAdCreate}
      />
      {/* Ads and Filter */}
      <HStack
        mt={"$8"}
        justifyContent="space-between"
        alignItems="center"
        px={"$6"}
      >
        <Text flex={1}>9 anúncios</Text>
        <Selectbox
          selectedValue="todos"
          values={adStatuses}
          onValueChange={(value) => setAdStatus(value)}
        />
      </HStack>
      {/* End - Ads and Filter */}

      {/* Ads List */}
      <FlatList
        data={adsList}
        keyExtractor={(item: any) => item.id.toString()}
        renderItem={({ item }) => (
          <ProductCard
            onPress={() => handleUserAdDetail()}
            productData={item as ProductDTO}
          />
        )}
        contentContainerStyle={{
          paddingBottom: 68,
          paddingHorizontal: 24,
          width: "100%",
          gap: 24,
          marginTop: 20,
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
    /* End - Container */
  )
}
