import React, { useCallback } from "react"
import { useFocusEffect, useNavigation } from "@react-navigation/native"

import { AppNavigatorRoutesProps } from "@routes/app.routes"
import { useAuth } from "@hooks/useAuth"

export function LogOUt() {
  const navigation = useNavigation<AppNavigatorRoutesProps>()
  const { signOut } = useAuth()
  async function handleLogOut() {
    await signOut()
  }

  useFocusEffect(
    useCallback(() => {
      handleLogOut()
    }, [])
  )

  return <></>
}
