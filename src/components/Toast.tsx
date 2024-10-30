import { ComponentProps } from "react"
import { TouchableOpacity } from "react-native"

import {
  VStack,
  HStack,
  ToastTitle,
  ToastDescription,
  Toast as GluestackToast,
} from "@gluestack-ui/themed"

import { gluestackUIConfig } from "@config/gluestack-ui.config"

import X from "phosphor-react-native/src/icons/X"

type Props = ComponentProps<typeof GluestackToast> & {
  id: string
  title?: string
  description: string
  toastVariant?: "success" | "error" | "warning" | "info"
  onClose: () => void
}
export function Toast({
  id,
  title,
  description,
  toastVariant = "info",
  onClose,
  ...rest
}: Props) {
  const { tokens } = gluestackUIConfig

  return (
    <GluestackToast
      nativeID={`toast-${id}`}
      mt={"$10"}
      bg={
        toastVariant === "success"
          ? "$green100"
          : toastVariant === "error"
          ? "$red100"
          : toastVariant === "warning"
          ? "$orange100"
          : "$blue100"
      }
      borderWidth={1}
      borderColor={
        toastVariant === "success"
          ? "$green300"
          : toastVariant === "error"
          ? "$red300"
          : toastVariant === "warning"
          ? "$orange300"
          : "$blue300"
      }
      rounded={"$md"}
      {...rest}
    >
      <VStack width={"$full"} gap={"$2"}>
        <HStack alignItems="center" gap={"$2"}>
          <ToastTitle
            flex={1}
            fontFamily={"$heading"}
            fontSize={"$md"}
            color={
              toastVariant === "success"
                ? "$green900"
                : toastVariant === "error"
                ? "$red900"
                : toastVariant === "warning"
                ? "$orange900"
                : "$blue900"
            }
            numberOfLines={1}
          >
            {title}
          </ToastTitle>
          <TouchableOpacity onPress={onClose}>
            <X size={16} color={tokens.colors.gray400} />
          </TouchableOpacity>
        </HStack>
        <ToastDescription
          flex={1}
          fontFamily={"$body"}
          fontSize={"$sm"}
          color={tokens.colors.gray200}
        >
          {description}
        </ToastDescription>
      </VStack>
    </GluestackToast>
  )
}
