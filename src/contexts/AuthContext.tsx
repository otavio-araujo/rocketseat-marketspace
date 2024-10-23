import { createContext, ReactNode, useEffect, useState } from "react"

import { api } from "@services/api"
import { UserDTO } from "@dtos/UserDTO"

import { storageUserSave, storageUserGet } from "@storage/storageUser"

export type AuthContextDataProps = {
  user: UserDTO
  signIn: (email: string, password: string) => Promise<void>
}

type AuthContextProviderProps = {
  children: ReactNode
}

export const AuthContext = createContext<AuthContextDataProps>(
  {} as AuthContextDataProps
)

export function AuthContextProvider({ children }: AuthContextProviderProps) {
  const [user, setUser] = useState<UserDTO>({} as UserDTO)

  async function signIn(email: string, password: string) {
    try {
      const { data } = await api.post("/sessions", { email, password })

      if (data.user) {
        setUser(data.user)
        await storageUserSave(data.user)
      }
    } catch (error) {
      throw error
    }
  }

  async function loadUserData() {
    const loggedUser = await storageUserGet()
    if (loggedUser) {
      setUser(loggedUser)
    }
  }

  useEffect(() => {
    loadUserData()
  }, [])
  return (
    <AuthContext.Provider value={{ user, signIn }}>
      {children}
    </AuthContext.Provider>
  )
}
