import { FlatList, HStack, Text, VStack } from "@gluestack-ui/themed"

import { AppNavigatorRoutesProps } from "@routes/app.routes"
import { useNavigation } from "@react-navigation/native"
import { Header } from "@components/Header"
import { Selectbox } from "@components/Selectbox"
import { ProductCard } from "@components/ProductCard"
import { useEffect, useState } from "react"

export function UserAds() {
  const navigation = useNavigation<AppNavigatorRoutesProps>()
  const adStatuses = ["todos", "ativos", "desativados"]
  const [adStatus, setAdStatus] = useState("todos")

  const adsList = [1, 2, 3, 4, 5]
  function handleUserAdDetail() {
    navigation.navigate("userAdDetail")
  }

  function handleGoToAdCreate() {
    navigation.navigate("adCreate")
  }

  function handleGoBack() {
    navigation.goBack()
  }

  return (
    /* Container */
    <VStack flex={1} gap={"$4"} pt={"$5"}>
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
        keyExtractor={(item) => String(item)}
        renderItem={({ item }) => (
          <ProductCard onPress={() => handleUserAdDetail()} />
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
