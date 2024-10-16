import { ComponentProps } from "react"
import {
  Input as GluestackInput,
  InputField,
  FormControl,
  FormControlError,
  FormControlErrorText,
} from "@gluestack-ui/themed"

type Props = ComponentProps<typeof InputField> & {
  errorMessages?: string | null
  isInvalid?: boolean
  isReadOnly?: boolean
}

export function Input({
  isReadOnly = false,
  type = "text",
  isInvalid = false,
  errorMessages = null,
  ...rest
}: Props) {
  const invalid = !!errorMessages || isInvalid

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
        <InputField
          {...rest}
          type={type}
          color={"$gray200"}
          placeholderTextColor={"$gray400"}
          fontFamily="$body"
          fontSize={"$md"}
        />
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
