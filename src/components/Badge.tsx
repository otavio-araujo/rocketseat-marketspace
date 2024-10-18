import { Text, View } from "@gluestack-ui/themed"
import { ViewProps } from "react-native"

type BadgeProps = ViewProps & {
  label: string
  badgeVariant?: "primary" | "muted" | "dark"
}

export function Badge({ label, badgeVariant = "muted", ...rest }: BadgeProps) {
  return (
    <View
      {...rest}
      backgroundColor={
        badgeVariant === "dark"
          ? "$gray200"
          : badgeVariant === "muted"
          ? "$gray500"
          : "$blue"
      }
      px={"$2.5"}
      height={"$6"}
      rounded="$full"
      alignItems="center"
      justifyContent="center"
    >
      <Text
        px={"$1"}
        fontFamily={"$heading"}
        fontSize={"$xxs"}
        color={badgeVariant === "muted" ? "$gray200" : "$white"}
        style={{
          textTransform: "uppercase",
        }}
      >
        {label}
      </Text>
    </View>
  )
}
