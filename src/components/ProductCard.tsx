import { TouchableOpacity, TouchableOpacityProps } from "react-native"

import { HStack, Image, Text, VStack } from "@gluestack-ui/themed"

import { Badge } from "./Badge"
import { Avatar } from "./Avatar"

import { api } from "@services/api"
import { ProductDTO } from "@dtos/ProductDTO"
import { formatCurrency } from "@utils/CurrencyMask"

type Props = TouchableOpacityProps & {
  hasAvatar?: boolean
  handleOnClick?: () => void
  productData: ProductDTO
}

export function ProductCard({
  hasAvatar = false,
  handleOnClick,
  productData,
  ...rest
}: Props) {
  function getImage() {
    if (
      Array.isArray(productData?.product_images) &&
      productData.product_images.length > 0
    ) {
      return `${api.defaults.baseURL}/images/${productData.product_images[0]?.path}`
    } else {
      return "@assets/product/placeholder.png"
    }
  }

  return (
    <VStack flex={0.5} maxWidth={"47%"} position="relative">
      <TouchableOpacity onPress={handleOnClick} {...rest}>
        <Image
          h={"$25"}
          w={"$full"}
          rounded={"$md"}
          source={{
            uri: getImage(),
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
            <Avatar isCardAd imageSource={productData.user?.avatar || null} />
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
          w={"$full"}
          numberOfLines={2}
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
            {formatCurrency(String(productData.price))}
          </Text>
        </HStack>
      </TouchableOpacity>
    </VStack>
  )
}
