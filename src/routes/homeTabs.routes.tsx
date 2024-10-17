import { Platform } from "react-native"
import {
  createBottomTabNavigator,
  BottomTabNavigationProp,
} from "@react-navigation/bottom-tabs"

import { gluestackUIConfig } from "../../config/gluestack-ui.config"

import { Home } from "@screens/app/Home"
import { UserAds } from "@screens/app/ads/UserAds"
import { LogOUt } from "@screens/app/LogOut"

import Tag from "phosphor-react-native/src/icons/Tag"
import House from "phosphor-react-native/src/icons/House"
import SignOut from "phosphor-react-native/src/icons/SignOut"

import { AppRoutes } from "@routes/app.routes"

const { Navigator, Screen } = createBottomTabNavigator<AppRoutes>()

export function HomeTabs() {
  const { tokens } = gluestackUIConfig
  const iconSize = tokens.space["6"]
  return (
    <Navigator
      screenOptions={{
        headerShown: false,
        tabBarShowLabel: false,
        tabBarActiveTintColor: tokens.colors.gray200,
        tabBarInactiveTintColor: tokens.colors.gray400,
        tabBarStyle: {
          backgroundColor: tokens.colors.gray700,
          borderTopWidth: 0,
          height: Platform.OS === "android" ? tokens.space["18"] : 96,
          paddingBottom: tokens.space["7"],
          paddingTop: tokens.space["5"],
        },
      }}
    >
      <Screen
        name="home"
        component={Home}
        options={{
          tabBarIcon: ({ color }) => <House size={iconSize} color={color} />,
        }}
      />
      <Screen
        name="userAds"
        component={UserAds}
        options={{
          tabBarIcon: ({ color }) => <Tag size={iconSize} color={color} />,
        }}
      />
      <Screen
        name="logout"
        component={LogOUt}
        options={{
          tabBarIcon: ({ color }) => (
            <SignOut size={iconSize} color={tokens.colors.redLight} />
          ),
        }}
      />
    </Navigator>
  )
}
