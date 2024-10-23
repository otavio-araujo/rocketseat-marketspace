import { View } from "@gluestack-ui/themed"
import { ComponentProps } from "react"
import { Platform, StatusBar as RNStatusBar } from "react-native"

type Props = ComponentProps<typeof RNStatusBar> & {
  barStyle?: "dark-content" | "light-content"
  backgroundColor?: string
  translucent?: boolean
}

export function StatusBar({
  barStyle,
  backgroundColor,
  translucent,
  ...rest
}: Props) {
  return (
    <View bg={backgroundColor}>
      <RNStatusBar
        barStyle={barStyle}
        backgroundColor={backgroundColor}
        translucent={translucent}
        {...rest}
      />
    </View>
  )
}
