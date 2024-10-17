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

type AppRoutes = {
  home: undefined
  userAds: undefined
  logout: undefined
  adCreate: undefined
  adDetail: undefined
  adPreview: undefined
  userAdDetail: undefined
}

export type AppNavigatorRoutesProps = BottomTabNavigationProp<AppRoutes>

const { Navigator, Screen } = createBottomTabNavigator<AppRoutes>()

export function AppRoutes() {
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
      <Screen
        name="adCreate"
        component={AdCreate}
        options={() => ({
          tabBarStyle: {
            display: "none",
          },
          tabBarButton: () => null,
        })}
      />
      <Screen
        name="adDetail"
        component={AdDetail}
        options={() => ({
          tabBarStyle: {
            display: "none",
          },
          tabBarButton: () => null,
        })}
      />
      <Screen
        name="adPreview"
        component={AdPreview}
        options={() => ({
          tabBarStyle: {
            display: "none",
          },
          tabBarButton: () => null,
        })}
      />
      <Screen
        name="userAdDetail"
        component={UserAdDetail}
        options={() => ({
          tabBarStyle: {
            display: "none",
          },
          tabBarButton: () => null,
        })}
      />
    </Navigator>
  )
}
