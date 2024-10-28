import { TouchableOpacity } from "react-native"

import { Box, Image } from "@gluestack-ui/themed"
import { gluestackUIConfig } from "../../config/gluestack-ui.config"

import X from "phosphor-react-native/src/icons/X"

import { ProductPhotoProps } from "@screens/app/ads/AdCreate"
import { ProductImageDTO } from "@dtos/ProductImageDTO"

type Props = {
  photo: ProductImageDTO
  handleRemoveProductImage?: () => void
}

export function ProductPhoto({ photo, handleRemoveProductImage }: Props) {
  const { tokens } = gluestackUIConfig
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
        source={{ uri: photo.path }}
        w={100}
        h={100}
        rounded={"$md"}
        alt="Foto do produto"
        resizeMode="cover"
      />
    </Box>
  )
}
