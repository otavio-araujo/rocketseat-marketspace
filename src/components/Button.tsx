import { ComponentProps, ReactNode } from "react"
import {
  Button as GluestackButton,
  ButtonText,
  ButtonIcon,
  ButtonSpinner,
} from "@gluestack-ui/themed"
import { Loading } from "./Loading"

type Props = ComponentProps<typeof GluestackButton> & {
  buttonVariant?: "primary" | "muted" | "dark"
  isLoading?: boolean
  label: string
  icon?: any
}

export function Button({
  buttonVariant = "primary",
  isLoading = false,
  icon = false,
  label,
  ...rest
}: Props) {
  return (
    <GluestackButton
      {...rest}
      flex={1}
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
      {isLoading ? (
        <ButtonSpinner
          color={buttonVariant === "muted" ? "$gray300" : "$gray600"}
        />
      ) : (
        icon !== false && (
          <ButtonIcon
            as={icon}
            mr="$2"
            color={buttonVariant === "muted" ? "$gray300" : "$gray600"}
          />
        )
      )}
      {!isLoading && (
        <ButtonText
          color={buttonVariant === "muted" ? "$gray200" : "$gray700"}
          fontFamily="$heading"
          fontSize={"$sm"}
        >
          {label}
        </ButtonText>
      )}
    </GluestackButton>
  )
}
