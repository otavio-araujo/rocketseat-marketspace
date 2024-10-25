import { Icon, View } from "@gluestack-ui/themed"
import { SelectIcon } from "@gluestack-ui/themed"
import { SelectInput } from "@gluestack-ui/themed"
import { SelectTrigger } from "@gluestack-ui/themed"
import { SelectPortal } from "@gluestack-ui/themed"
import { SelectBackdrop } from "@gluestack-ui/themed"
import { SelectContent } from "@gluestack-ui/themed"
import { SelectDragIndicatorWrapper } from "@gluestack-ui/themed"
import { SelectDragIndicator } from "@gluestack-ui/themed"
import { SelectItem } from "@gluestack-ui/themed"
import { Select as GluestackSelect } from "@gluestack-ui/themed"

import CaretDown from "phosphor-react-native/src/icons/CaretDown"

import { gluestackUIConfig } from "../../config/gluestack-ui.config"
import { ComponentProps } from "react"

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
          {/* <SelectItem label="Todos" value="todos" />
          <SelectItem label="Ativos" value="ativos" />
          <SelectItem label="Desativados" value="desativados" /> */}
        </SelectContent>
      </SelectPortal>
    </GluestackSelect>
  )
}
