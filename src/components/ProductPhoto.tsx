import { TouchableOpacity } from "react-native"

import { Box, Image } from "@gluestack-ui/themed"
import { gluestackUIConfig } from "../../config/gluestack-ui.config"

import X from "phosphor-react-native/src/icons/X"

import { ProductImageDTO } from "@dtos/ProductImageDTO"
import { api } from "@services/api"

type Props = {
  photo: ProductImageDTO
  handleRemoveProductImage?: () => void
}

export function ProductPhoto({ photo, handleRemoveProductImage }: Props) {
  const { tokens } = gluestackUIConfig

  console.log(`${api.defaults.baseURL}/images/${photo.path}`)

  return (
    <Box
      justifyContent="center"
      alignItems="center"
      position="relative"
      bg={"$gray500"}
      rounded={"$md"}
      w={100}
      h={100}
    >
      <TouchableOpacity
        style={{
          backgroundColor: tokens.colors.gray100,
          justifyContent: "center",
          position: "absolute",
          alignItems: "center",
          borderRadius: 9999,
          height: 16,
          width: 16,
          zIndex: 1,
          right: 4,
          top: 4,
        }}
        onPress={handleRemoveProductImage}
      >
        <X size={12} color={tokens.colors.gray700} />
      </TouchableOpacity>
      <Image
        source={{
          uri: `${api.defaults.baseURL}/images/${photo.path}`
            ? `${api.defaults.baseURL}/images/${photo.path}`
            : photo.path,
        }}
        w={100}
        h={100}
        rounded={"$md"}
        alt="Foto do produto"
        resizeMode="cover"
      />
    </Box>
  )
}
