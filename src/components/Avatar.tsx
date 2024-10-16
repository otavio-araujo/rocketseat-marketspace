import { ComponentProps } from "react"
import {
  Avatar as GluestackAvatar,
  Fab,
  FabIcon,
  View,
  AvatarImage,
} from "@gluestack-ui/themed"

import User from "phosphor-react-native/src/icons/User"
import PencilSimpleLine from "phosphor-react-native/src/icons/PencilSimpleLine"
import { Image } from "react-native"

type Props = ComponentProps<typeof GluestackAvatar> & {
  imageSource?: string
  isEditable?: boolean
  handleAvatar?: () => void
}

export function Avatar({
  isEditable = false,
  imageSource,
  handleAvatar,
  ...rest
}: Props) {
  return (
    <GluestackAvatar
      borderColor={"$blueLight"}
      borderRadius={"$full"}
      justifyContent="center"
      alignItems="center"
      bgColor="$gray500"
      minHeight={isEditable ? "$22" : "$11"}
      maxHeight={isEditable ? "$22" : "$11"}
      minWidth={isEditable ? "$22" : "$11"}
      maxWidth={isEditable ? "$22" : "$11"}
      style={{
        borderWidth: isEditable ? 3 : 2,
      }}
      {...rest}
    >
      {isEditable ? (
        <User size={44} color="#9F9BA1" weight="bold" />
      ) : (
        <AvatarImage
          source={{
            uri: "https://i.pravatar.cc/300",
          }}
          alt="Foto de perfil do usuário logado"
        />
      )}

      {isEditable && (
        <Fab
          bg="$blueLight"
          size="lg"
          style={{ position: "absolute", right: -16, bottom: -4 }}
          onPress={handleAvatar}
          $active-bg={"$blue"}
        >
          {/* ShoppingCartIcon is imported from 'lucide-react-native' */}
          <FabIcon as={PencilSimpleLine} h="$5" w="$5" color="$white" />
        </Fab>
      )}
    </GluestackAvatar>
  )
}
