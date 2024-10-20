import { ComponentProps } from "react"
import {
  FormControl,
  FormControlError,
  FormControlErrorText,
  Textarea as GluestackTextarea,
  TextareaInput,
} from "@gluestack-ui/themed"

type Props = ComponentProps<typeof TextareaInput> & {
  errorMessages?: string | null
  isInvalid?: boolean
  isReadOnly?: boolean
}

export function Textarea({
  isReadOnly = false,
  type = "text",
  isInvalid = false,
  errorMessages = null,
  ...rest
}: Props) {
  const invalid = !!errorMessages || isInvalid

  return (
    <FormControl w={"$full"} isInvalid={invalid}>
      <GluestackTextarea
        borderWidth={0}
        px={"$4"}
        py={"$3"}
        w={"$full"}
        minHeight={160}
        maxHeight={160}
        backgroundColor="$gray700"
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
        <TextareaInput
          {...rest}
          fontFamily={"$body"}
          fontSize={"$md"}
          color={"$gray200"}
          placeholderTextColor={"$gray400"}
        />
      </GluestackTextarea>

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
