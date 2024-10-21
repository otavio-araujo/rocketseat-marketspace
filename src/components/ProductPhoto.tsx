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
