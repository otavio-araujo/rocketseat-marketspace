import { ComponentProps } from "react"

import { HStack, Text, View } from "@gluestack-ui/themed"
import { gluestackUIConfig } from "../../config/gluestack-ui.config"

import XCircle from "phosphor-react-native/src/icons/XCircle"

type BadgeProps = ComponentProps<typeof View> & {
  label: string
  badgeVariant?: "primary" | "muted" | "dark" | "primaryLight"
  hasIcon?: boolean
}

export function Badge({
  badgeVariant = "muted",
  hasIcon = false,
  label,
  ...rest
}: BadgeProps) {
  const { tokens } = gluestackUIConfig
  return (
    <View
      {...rest}
      backgroundColor={
        badgeVariant === "dark"
          ? "$gray200"
          : badgeVariant === "muted"
          ? "$gray500"
          : badgeVariant === "primary"
          ? "$blue"
          : "$blueLight"
      }
      justifyContent="center"
      alignItems="center"
      rounded="$full"
      height={"$6"}
      px={"$2.5"}
    >
      <HStack alignItems="center" gap={"$1"} justifyContent="center">
        <Text
          color={
            badgeVariant === "muted"
              ? tokens.colors.gray200
              : tokens.colors.white
          }
          style={{
            textTransform: "uppercase",
          }}
          fontFamily={"$heading"}
          fontSize={"$xxs"}
          px={"$1"}
        >
          {label}
        </Text>

        {hasIcon && (
          <XCircle
            color={
              badgeVariant === "muted"
                ? tokens.colors.gray200
                : tokens.colors.white
            }
            weight="fill"
            size={16}
          />
        )}
      </HStack>
    </View>
  )
}
