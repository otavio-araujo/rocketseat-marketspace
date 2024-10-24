import { TouchableOpacity, TouchableOpacityProps } from "react-native"

import { HStack, Image, Text, VStack } from "@gluestack-ui/themed"

import { Badge } from "./Badge"
import { Avatar } from "./Avatar"

import { api } from "@services/api"
import { getRandomIntInclusive } from "@utils/MathUtils"

type Props = TouchableOpacityProps & {
  hasAvatar?: boolean
  handleOnClick?: () => void
  productData: any
}

export function ProductCard({
  hasAvatar = false,
  handleOnClick,
  productData,
  ...rest
}: Props) {
  const image =
    "https://images.unsplash.com/photo-1523275335684-37898b6baf30?q=80&w=1999&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
  console.log(productData.product_images.length)

  const getRandomProductImage = () => {
    return productData.product_images[
      getRandomIntInclusive(0, productData.product_images.length - 1)
    ].path
  }

  return (
    <VStack flex={0.5} maxWidth={"47%"} position="relative">
      <TouchableOpacity onPress={handleOnClick} {...rest}>
        <Image
          h={"$25"}
          w={"$full"}
          rounded={"$md"}
          source={{
            uri: `${api.defaults.baseURL}/images/${getRandomProductImage()}`,
          }}
          alt="Product image"
          resizeMode="cover"
        />
        <HStack
          width={"$full"}
          position="absolute"
          justifyContent={hasAvatar ? "space-between" : "flex-end"}
          top={4}
          right={0}
          px={"$1"}
        >
          {hasAvatar && (
            <Avatar isCardAd imageSource={productData.user.avatar} />
          )}
          <Badge
            label={productData.is_new ? "novo" : "usado"}
            badgeVariant={productData.is_new ? "primary" : "dark"}
          />
        </HStack>
        <Text
          fontFamily={"$body"}
          fontSize={"$sm"}
          mt={"$1"}
          color={"$gray200"}
        >
          {productData.name}
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
            {(productData.price / 100).toFixed(2)}
          </Text>
        </HStack>
      </TouchableOpacity>
    </VStack>
  )
}
