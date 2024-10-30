import { ComponentProps } from "react"
import {
  SelectIcon,
  SelectItem,
  SelectInput,
  SelectPortal,
  SelectTrigger,
  SelectContent,
  SelectBackdrop,
  SelectDragIndicator,
  Select as GluestackSelect,
  SelectDragIndicatorWrapper,
} from "@gluestack-ui/themed"

import CaretDown from "phosphor-react-native/src/icons/CaretDown"

import { gluestackUIConfig } from "../../config/gluestack-ui.config"

type SelectboxProps = ComponentProps<typeof GluestackSelect> & {
  selectedValue: string
  values: string[]
}

export function Selectbox({ selectedValue, values, ...rest }: SelectboxProps) {
  const { tokens } = gluestackUIConfig
  return (
    <GluestackSelect flex={1} selectedValue={selectedValue} {...rest}>
      <SelectTrigger
        variant="outline"
        size="md"
        borderColor={"$gray500"}
        pr={"$3"}
      >
        <SelectInput
          fontFamily={"$body"}
          textTransform="capitalize"
          placeholder="Selecione uma opção"
        />
        <SelectIcon>
          <CaretDown size={16} color={tokens.colors.gray300} />
        </SelectIcon>
      </SelectTrigger>
      <SelectPortal>
        <SelectBackdrop />
        <SelectContent>
          <SelectDragIndicatorWrapper>
            <SelectDragIndicator />
          </SelectDragIndicatorWrapper>
          {values.map((value) => (
            <SelectItem
              key={value}
              textStyle={{ textTransform: "capitalize" }}
              label={value}
              value={value}
            />
          ))}
        </SelectContent>
      </SelectPortal>
    </GluestackSelect>
  )
}
