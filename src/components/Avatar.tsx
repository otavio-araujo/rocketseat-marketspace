import { ComponentProps } from "react"
import { EyeIcon, Icon, Image, View } from "@gluestack-ui/themed"

type Props = ComponentProps<typeof View>

export function Avatar({ ...rest }: Props) {
  return (
    <View
      bgColor="$gray500"
      borderWidth={"$2"}
      borderColor={"$blueLight"}
      minHeight={"$22"}
      maxHeight={"$22"}
      minWidth={"$22"}
      maxWidth={"$22"}
      borderRadius={"$full"}
      alignItems="center"
      justifyContent="center"
      {...rest}
    >
      {/* User is imported from 'lucide-react-native' */}
      <Icon as={EyeIcon} color="white" size="lg" />
    </View>
  )
}
