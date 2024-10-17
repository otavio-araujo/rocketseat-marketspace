import React, { useCallback } from "react"
import { useFocusEffect, useNavigation } from "@react-navigation/native"

import { AppNavigatorRoutesProps } from "@routes/app.routes"

export function LogOUt() {
  const navigation = useNavigation<AppNavigatorRoutesProps>()
  function handleLogOut() {
    console.log("LogOut")
    navigation.navigate("home")
  }

  useFocusEffect(
    useCallback(() => {
      handleLogOut()
    }, [])
  )

  return <></>
}
