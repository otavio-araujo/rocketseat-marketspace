import { Center, FlatList, HStack, Text, VStack } from "@gluestack-ui/themed"

import { Button } from "@components/Button"
import { AppNavigatorRoutesProps } from "@routes/app.routes"
import { useNavigation } from "@react-navigation/native"
import { Header } from "@components/Header"
import { Selectbox } from "@components/Selectbox"
import { ProductCard } from "@components/ProductCard"

export function UserAds() {
  const navigation = useNavigation<AppNavigatorRoutesProps>()

  const adsList = [1, 2, 3, 4, 5]
  function handleUserAdDetail() {
    navigation.navigate("userAdDetail")
  }

  function handleAdCreate() {
    navigation.navigate("adCreate")
  }

  function handleGoBack() {
    navigation.goBack()
  }
  return (
    <VStack flex={1} px={"$6"} gap={"$4"} pt={"$5"}>
      <Header title="Meus anúncios" headerVariant="userAds" />

      <HStack
        mt={"$8"}
        justifyContent="space-between"
        alignItems="center"
        px={"$6"}
      >
        <Text flex={1}>9 anúncios</Text>
        <Selectbox />
      </HStack>

      {/* Ads List */}
      <FlatList
        data={adsList}
        keyExtractor={(item) => String(item)}
        renderItem={({ item }) => (
          <ProductCard onPress={() => handleUserAdDetail()} />
        )}
        contentContainerStyle={{
          paddingBottom: 68,
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

      {/* <Text fontFamily={"$body"} fontSize={"$lg"}>
        UserAds
      </Text>
      <Button label="Criar anúncio" onPress={handleAdCreate} width={"$full"} />
      <Button
        label="Detalhes do anúncio"
        onPress={handleUserAdDetail}
        width={"$full"}
      />
      <Button label="Voltar" onPress={handleGoBack} width={"$full"} /> */}
    </VStack>
  )
}
