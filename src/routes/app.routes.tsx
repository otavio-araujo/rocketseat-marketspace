import {
  createBottomTabNavigator,
  BottomTabNavigationProp,
} from "@react-navigation/bottom-tabs"

import { gluestackUIConfig } from "../../config/gluestack-ui.config"

import { Home } from "@screens/app/Home"
import { UserAds } from "@screens/app/ads/UserAds"
import { AdCreate } from "@screens/app/ads/AdCreate"
import { AdDetail } from "@screens/app/ads/AdDetail"
import { AdPreview } from "@screens/app/ads/AdPreview"
import { UserAdDetail } from "@screens/app/ads/UserAdDetail"

import Tag from "phosphor-react-native/src/icons/Tag"
import House from "phosphor-react-native/src/icons/House"
import SignOut from "phosphor-react-native/src/icons/SignOut"
import { Platform } from "react-native"
import { LogOUt } from "@screens/app/LogOut"
import { createNativeStackNavigator } from "@react-navigation/native-stack"
import { HomeTabs } from "./homeTabs.routes"

export type AppRoutes = {
  home: undefined
  homeTabs: undefined
  userAds: undefined
  logout: undefined
  adCreate: undefined
  adDetail: undefined
  adPreview: undefined
  userAdDetail: undefined
}

export type AppNavigatorRoutesProps = BottomTabNavigationProp<AppRoutes>

const { Navigator, Screen } = createNativeStackNavigator<AppRoutes>()

export function AppRoutes() {
  const { tokens } = gluestackUIConfig
  const iconSize = tokens.space["6"]
  return (
    <Navigator
      screenOptions={{
        headerShown: false,
      }}
    >
      <Screen name="homeTabs" component={HomeTabs} />
      <Screen name="userAds" component={UserAds} />
      <Screen name="adCreate" component={AdCreate} />
      <Screen name="adDetail" component={AdDetail} />
      <Screen name="adPreview" component={AdPreview} />
      <Screen name="userAdDetail" component={UserAdDetail} />
    </Navigator>
  )
}
