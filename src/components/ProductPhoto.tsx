import { TouchableOpacity } from "react-native"

import { Box, Image } from "@gluestack-ui/themed"
import { gluestackUIConfig } from "../../config/gluestack-ui.config"

import X from "phosphor-react-native/src/icons/X"

import { ProductPhotoProps } from "@screens/app/ads/AdCreate"

type Props = {
  photo: ProductPhotoProps
  handleRemovePhoto?: () => void
}

export function ProductPhoto({ photo, handleRemovePhoto }: Props) {
  const { tokens } = gluestackUIConfig
  return (
    <Box
      w={100}
      h={100}
      bg={"$gray500"}
      rounded={"$md"}
      alignItems="center"
      justifyContent="center"
      position="relative"
    >
      <TouchableOpacity
        style={{
          position: "absolute",
          top: 4,
          right: 4,
          width: 16,
          height: 16,
          backgroundColor: tokens.colors.gray100,
          zIndex: 1,
          alignItems: "center",
          justifyContent: "center",
          borderRadius: 9999,
        }}
        onPress={handleRemovePhoto}
      >
        <X size={12} color={tokens.colors.gray700} />
      </TouchableOpacity>
      <Image
        source={{ uri: photo.uri }}
        w={100}
        h={100}
        rounded={"$md"}
        alt={photo.title}
        resizeMode="cover"
      />
    </Box>
  )
}
