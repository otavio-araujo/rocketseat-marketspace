import { ViewProps } from "react-native"
import { HStack, Text, View } from "@gluestack-ui/themed"
import { gluestackUIConfig } from "../../config/gluestack-ui.config"

import XCircle from "phosphor-react-native/src/icons/XCircle"

type BadgeProps = ViewProps & {
  label: string
  badgeVariant?: "primary" | "muted" | "dark" | "primaryLight"
  hasIcon?: boolean
}

export function Badge({
  label,
  badgeVariant = "muted",
  hasIcon = false,
  ...rest
}: BadgeProps) {
  const { tokens } = gluestackUIConfig
  return (
    <View
      {...rest}
      flexShrink={0}
      backgroundColor={
        badgeVariant === "dark"
          ? "$gray200"
          : badgeVariant === "muted"
          ? "$gray500"
          : badgeVariant === "primary"
          ? "$blue"
          : "$blueLight"
      }
      px={"$2.5"}
      height={"$6"}
      rounded="$full"
      alignItems="center"
      justifyContent="center"
    >
      <HStack alignItems="center" gap={"$1"} justifyContent="center">
        <Text
          px={"$1"}
          fontFamily={"$heading"}
          fontSize={"$xxs"}
          color={
            badgeVariant === "muted"
              ? tokens.colors.gray200
              : tokens.colors.white
          }
          style={{
            textTransform: "uppercase",
          }}
        >
          {label}
        </Text>

        {hasIcon && (
          <XCircle
            size={16}
            weight="fill"
            color={
              badgeVariant === "muted"
                ? tokens.colors.gray200
                : tokens.colors.white
            }
          />
        )}
      </HStack>
    </View>
  )
}
