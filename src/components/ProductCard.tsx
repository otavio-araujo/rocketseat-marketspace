import { HStack, Image, Text, VStack } from "@gluestack-ui/themed"
import { Avatar } from "./Avatar"
import { Badge } from "./Badge"

export function ProductCard() {
  const image =
    "https://images.unsplash.com/photo-1523275335684-37898b6baf30?q=80&w=1999&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
  return (
    <VStack flex={0.5} maxWidth={"47%"} position="relative">
      <Image
        h={"$25"}
        w={"$full"}
        rounded={"$md"}
        source={{
          uri: image,
        }}
        alt="Product image"
        resizeMode="cover"
      />
      <HStack
        width={"$full"}
        position="absolute"
        justifyContent="space-between"
        top={4}
        right={0}
        px={"$1"}
      >
        <Avatar isCardAd />
        <Badge label="usado" badgeVariant="dark" />
      </HStack>
      <Text fontFamily={"$body"} fontSize={"$sm"} mt={"$1"} color={"$gray200"}>
        Relógio Apple
      </Text>
      <HStack alignItems="flex-end">
        <Text fontFamily={"$heading"} fontSize={"$xs"} color={"$gray100"}>
          R$
        </Text>
        <Text
          fontFamily={"$heading"}
          fontSize={"$md"}
          ml={"$1"}
          color={"$gray100"}
        >
          59,90
        </Text>
      </HStack>
    </VStack>
  )
}
