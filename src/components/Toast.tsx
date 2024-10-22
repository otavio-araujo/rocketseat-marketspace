import {
  Toast as GluestackToast,
  ToastTitle,
  ToastDescription,
  Pressable,
  Icon,
  VStack,
  HStack,
} from "@gluestack-ui/themed"

import X from "phosphor-react-native/src/icons/X"

import { gluestackUIConfig } from "../../config/gluestack-ui.config"
import { TouchableOpacity } from "react-native"

type Props = {
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
}: Props) {
  const { tokens } = gluestackUIConfig

  return (
    <GluestackToast
      nativeID={`toast-${id}`}
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
    >
      <VStack flex={1} gap={"$2"}>
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
            <X
              size={16}
              color={
                toastVariant === "success"
                  ? tokens.colors.green900
                  : toastVariant === "error"
                  ? tokens.colors.red900
                  : toastVariant === "warning"
                  ? tokens.colors.orange900
                  : tokens.colors.blue900
              }
            />
          </TouchableOpacity>
        </HStack>
        <ToastDescription
          flex={1}
          fontFamily={"$body"}
          fontSize={"$sm"}
          color={
            toastVariant === "success"
              ? "$green800"
              : toastVariant === "error"
              ? "$red800"
              : toastVariant === "warning"
              ? "$orange800"
              : "$blue800"
          }
        >
          {description}
        </ToastDescription>
      </VStack>
    </GluestackToast>
  )
}
