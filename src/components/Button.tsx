import { ComponentProps, ReactNode } from "react"
import {
  Button as GluestackButton,
  ButtonText,
  ButtonIcon,
} from "@gluestack-ui/themed"
import { IconProps } from "phosphor-react-native"

type Props = ComponentProps<typeof GluestackButton> & {
  label: string
  buttonVariant?: "primary" | "muted" | "dark"
  isLoading?: boolean
  icon?: any
}

export function Button({
  label,
  buttonVariant = "primary",
  icon = false,
  isLoading = false,
  ...rest
}: Props) {
  return (
    <GluestackButton
      {...rest}
      p={"$3"}
      minHeight={"$11"}
      maxHeight={"$11"}
      borderRadius={"$md"}
      bgColor={
        buttonVariant === "dark"
          ? "$gray100"
          : buttonVariant === "primary"
          ? "$blueLight"
          : "$gray500"
      }
      $active-bg={
        buttonVariant === "dark"
          ? "$gray200"
          : buttonVariant === "primary"
          ? "$blue"
          : "$gray400"
      }
      disabled={isLoading}
    >
      {icon !== false && (
        <ButtonIcon
          as={icon}
          mr="$2"
          color={buttonVariant === "muted" ? "$gray300" : "$gray600"}
        />
      )}
      <ButtonText
        color={buttonVariant === "muted" ? "$gray200" : "$gray700"}
        fontFamily="$heading"
        fontSize={"$sm"}
      >
        {label}
      </ButtonText>
    </GluestackButton>
  )
}
