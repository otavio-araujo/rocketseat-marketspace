import { ComponentProps } from "react"
import {
  Avatar as GluestackAvatar,
  Fab,
  FabIcon,
  AvatarImage,
} from "@gluestack-ui/themed"

import { gluestackUIConfig } from "../../config/gluestack-ui.config"

import User from "phosphor-react-native/src/icons/User"
import PencilSimpleLine from "phosphor-react-native/src/icons/PencilSimpleLine"

type Props = ComponentProps<typeof GluestackAvatar> & {
  imageSource?: string
  isEditable?: boolean
  isCardAd?: boolean
  isWelcomeAvatar?: boolean
  handleAvatar?: () => void
}

export function Avatar({
  isEditable = false,
  isCardAd = false,
  isWelcomeAvatar = false,
  imageSource,
  handleAvatar,
  ...rest
}: Props) {
  const { tokens } = gluestackUIConfig
  return (
    <GluestackAvatar
      borderColor={isCardAd ? "$gray700" : "$blueLight"}
      borderRadius={"$full"}
      justifyContent="center"
      alignItems="center"
      bgColor="$gray500"
      minHeight={
        isEditable ? "$22" : isCardAd ? "$8" : isWelcomeAvatar ? "$14" : "$6"
      }
      maxHeight={
        isEditable ? "$22" : isCardAd ? "$8" : isWelcomeAvatar ? "$14" : "$6"
      }
      minWidth={
        isEditable ? "$22" : isCardAd ? "$8" : isWelcomeAvatar ? "$14" : "$6"
      }
      maxWidth={
        isEditable ? "$22" : isCardAd ? "$8" : isWelcomeAvatar ? "$14" : "$6"
      }
      style={{
        borderWidth: isEditable ? 3 : isCardAd || isWelcomeAvatar ? 1 : 2,
      }}
      {...rest}
    >
      {isEditable ? (
        <User size={44} color={tokens.colors.gray400} weight="bold" />
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
