import { ComponentProps, useState } from "react"

import {
  Input as GluestackInput,
  InputField,
  FormControl,
  FormControlError,
  FormControlErrorText,
  InputSlot,
  InputIcon,
  EyeIcon,
  EyeOffIcon,
} from "@gluestack-ui/themed"
import { Text } from "@gluestack-ui/themed"

type Props = ComponentProps<typeof InputField> & {
  errorMessages?: string | null
  isInvalid?: boolean
  isReadOnly?: boolean
  inputVariant?: "money" | "normal"
}

export function Input({
  isReadOnly = false,
  type = "text",
  isInvalid = false,
  errorMessages = null,
  inputVariant = "normal",
  ...rest
}: Props) {
  const invalid = !!errorMessages || isInvalid
  const [showPassword, setShowPassword] = useState(false)

  const handleState = () => {
    setShowPassword((showState) => {
      return !showState
    })
  }

  return (
    <FormControl w={"$full"} isInvalid={invalid}>
      <GluestackInput
        borderWidth={0}
        bg={"$gray700"}
        px={"$4"}
        py={"$3"}
        minHeight={"$11"}
        maxHeight={"$11"}
        rounded={"$md"}
        $focus={{
          borderWidth: 1,
          borderColor: invalid ? "$redLight" : "$blue",
        }}
        isReadOnly={isReadOnly}
        isInvalid={invalid}
        $invalid={{ borderWidth: 1, borderColor: "$redLight" }}
        opacity={isReadOnly ? 0.5 : 1}
      >
        {inputVariant === "money" && (
          <InputSlot>
            <Text fontFamily="$body" fontSize="$md" color="$gray100">
              R$
            </Text>
          </InputSlot>
        )}
        <InputField
          {...rest}
          type={type === "password" && !showPassword ? "password" : "text"}
          color={"$gray200"}
          placeholderTextColor={"$gray400"}
          fontFamily="$body"
          fontSize={"$md"}
        />

        {type === "password" && (
          <InputSlot pr={"$2"} onPress={handleState}>
            <InputIcon
              as={showPassword ? EyeIcon : EyeOffIcon}
              color={"$gray300"}
            />
          </InputSlot>
        )}
      </GluestackInput>
      <FormControlError>
        <FormControlErrorText
          color="$redLight"
          fontFamily="$body"
          fontSize={"$xs"}
          ml={"$2"}
        >
          {errorMessages}
        </FormControlErrorText>
      </FormControlError>
    </FormControl>
  )
}
