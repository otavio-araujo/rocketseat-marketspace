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

import defaultUser from "@assets/defaultUser.jpg"

import { api } from "@services/api"
import { useAuth } from "@hooks/useAuth"

type Props = ComponentProps<typeof GluestackAvatar> & {
  imageSource?: string | null
  isEditable?: boolean
  isCardAd?: boolean
  isWelcomeAvatar?: boolean
  handleAvatar?: () => void
}

export function Avatar({
  isWelcomeAvatar = false,
  isEditable = false,
  isCardAd = false,
  imageSource = null,
  handleAvatar,
  ...rest
}: Props) {
  const { tokens } = gluestackUIConfig
  const { user } = useAuth()

  return (
    <GluestackAvatar
      borderColor={isCardAd ? "$gray700" : "$blueLight"}
      borderRadius={"$full"}
      justifyContent="center"
      alignItems="center"
      bgColor="$gray500"
      minHeight={
        isEditable ? "$22" : isCardAd ? "$8" : isWelcomeAvatar ? "$14" : "$8"
      }
      maxHeight={
        isEditable ? "$22" : isCardAd ? "$8" : isWelcomeAvatar ? "$14" : "$8"
      }
      minWidth={
        isEditable ? "$22" : isCardAd ? "$8" : isWelcomeAvatar ? "$14" : "$8"
      }
      maxWidth={
        isEditable ? "$22" : isCardAd ? "$8" : isWelcomeAvatar ? "$14" : "$8"
      }
      style={{
        borderWidth: isEditable ? 3 : isCardAd || isWelcomeAvatar ? 1 : 2,
      }}
      {...rest}
    >
      {isEditable && imageSource === null ? (
        <User size={44} color={tokens.colors.gray400} weight="bold" />
      ) : (
        <AvatarImage
          source={
            imageSource !== null
              ? { uri: `${api.defaults.baseURL}/images/${imageSource}` }
              : user.avatar === null
              ? defaultUser
              : {
                  uri: `${api.defaults.baseURL}/images/${user.avatar}`,
                }
          }
          alt="Foto de perfil do usuário logado"
        />
      )}

      {isEditable && (
        <Fab
          style={{ position: "absolute", right: -16, bottom: -4 }}
          onPress={handleAvatar}
          $active-bg={"$blue"}
          bg="$blueLight"
          size="lg"
        >
          {/* ShoppingCartIcon is imported from 'lucide-react-native' */}
          <FabIcon as={PencilSimpleLine} h="$5" w="$5" color="$white" />
        </Fab>
      )}
    </GluestackAvatar>
  )
}
