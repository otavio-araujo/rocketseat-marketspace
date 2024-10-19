import { TouchableOpacity, TouchableOpacityProps } from "react-native"

import { gluestackUIConfig } from "../../config/gluestack-ui.config"
import { HStack, Text } from "@gluestack-ui/themed"

import ArrowLeft from "phosphor-react-native/src/icons/ArrowLeft"
import Plus from "phosphor-react-native/src/icons/Plus"
import PencilSimpleLine from "phosphor-react-native/src/icons/PencilSimpleLine"

type Props = TouchableOpacityProps & {
  headerVariant?: "simple" | "create" | "adDetails" | "userAds"
  title?: string
  handleEditAd?: () => void
  handleCreateAd?: () => void
}

export function Header({
  headerVariant = "simple",
  handleEditAd,
  handleCreateAd,
  title,
  ...rest
}: Props) {
  const { tokens } = gluestackUIConfig
  return (
    <HStack alignItems="center" justifyContent="space-between" flex={1}>
      {headerVariant !== "userAds" && (
        <TouchableOpacity {...rest}>
          <ArrowLeft size={24} color={tokens.colors.gray100} />
        </TouchableOpacity>
      )}

      {headerVariant !== "simple" && headerVariant !== "adDetails" && (
        <Text
          flex={1}
          fontFamily={"$heading"}
          fontSize={"$lg"}
          textAlign="center"
          ml={headerVariant === "userAds" ? "$6" : "$0"}
          mr={headerVariant === "create" ? "$6" : "$0"}
        >
          {title}
        </Text>
      )}

      <TouchableOpacity {...rest} onPress={handleEditAd}>
        {headerVariant === "userAds" ? (
          <Plus size={24} color={tokens.colors.gray100} />
        ) : (
          headerVariant !== "simple" &&
          headerVariant !== "create" && (
            <PencilSimpleLine size={24} color={tokens.colors.gray100} />
          )
        )}
      </TouchableOpacity>
    </HStack>
  )
}
