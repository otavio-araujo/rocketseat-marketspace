import { BottomTabNavigationProp } from "@react-navigation/bottom-tabs"
import { createNativeStackNavigator } from "@react-navigation/native-stack"

import { HomeTabs } from "@routes/homeTabs.routes"
import { UserAds } from "@screens/app/ads/UserAds"
import { AdCreate } from "@screens/app/ads/AdCreate"
import { AdDetails } from "@screens/app/ads/AdDetails"
import { AdPreview } from "@screens/app/ads/AdPreview"
import { UserAdDetail } from "@screens/app/ads/UserAdDetail"
import { ProductDTO } from "@dtos/ProductDTO"

export type AppRoutes = {
  home: undefined
  homeTabs: undefined
  userAds: undefined
  logout: undefined
  adCreate: undefined
  adDetails: {
    productItem: ProductDTO
  }
  adPreview: undefined
  userAdDetail: {
    productItem?: ProductDTO
    updatedProduct?: ProductDTO
  }
}

export type AppNavigatorRoutesProps = BottomTabNavigationProp<AppRoutes>

const { Navigator, Screen } = createNativeStackNavigator<AppRoutes>()

export function AppRoutes() {
  return (
    <Navigator
      screenOptions={{
        headerShown: false,
      }}
    >
      <Screen name="homeTabs" component={HomeTabs} />
      <Screen name="userAds" component={UserAds} />
      <Screen name="adCreate" component={AdCreate} />
      <Screen name="adDetails" component={AdDetails} />
      <Screen name="adPreview" component={AdPreview} />
      <Screen name="userAdDetail" component={UserAdDetail} />
    </Navigator>
  )
}
