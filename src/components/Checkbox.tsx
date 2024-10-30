import {
  CheckIcon,
  CheckboxIcon,
  CheckboxLabel,
  CheckboxIndicator,
  Checkbox as GluestackCheckbox,
} from "@gluestack-ui/themed"
import { ComponentProps } from "react"

type CheckboxProps = ComponentProps<typeof GluestackCheckbox> & {
  label: string
}
export function Checkbox({ label, ...rest }: CheckboxProps) {
  return (
    <GluestackCheckbox isInvalid={false} isDisabled={false} {...rest}>
      <CheckboxIndicator
        mr="$2"
        $checked-backgroundColor="$blueLight"
        $checked-borderColor="$blueLight"
        borderColor="$gray400"
        padding={"$2"}
      >
        <CheckboxIcon as={CheckIcon} color="white" />
      </CheckboxIndicator>
      <CheckboxLabel fontFamily={"$body"} color="$gray200">
        {label}
      </CheckboxLabel>
    </GluestackCheckbox>
  )
}
