import { Button as GluestackButton, ButtonText } from "@gluestack-ui/themed"
import { ComponentProps } from "react"

type Props = ComponentProps<typeof GluestackButton> & {
  label: string
  buttonVariant?: "primary" | "muted" | "dark"
  isLoading?: boolean
}

export function Button({
  label,
  buttonVariant = "primary",
  isLoading = false,
  ...rest
}: Props) {
  return (
    <GluestackButton
      {...rest}
      size="sm"
      mt={"$4"}
      w={"$full"}
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
      <ButtonText
        color={buttonVariant === "muted" ? "$gray200" : "$white"}
        fontFamily="$heading"
        fontSize={"$sm"}
      >
        {label}
      </ButtonText>
    </GluestackButton>
  )
}
