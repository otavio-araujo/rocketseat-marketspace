import { createContext, ReactNode } from "react"

import { UserDTO } from "@dtos/userDTO"

export type AuthContextDataProps = {
  user: UserDTO
}

type AuthContextProviderProps = {
  children: ReactNode
}

export const AuthContext = createContext<AuthContextDataProps>(
  {} as AuthContextDataProps
)

export function AuthContextProvider({ children }: AuthContextProviderProps) {
  return (
    <AuthContext.Provider
      value={{
        user: {
          id: "1",
          name: "Otavio",
          email: "otavio@email.com",
          tel: "123456789",
          avatar: "https://github.com/otavio-araujo.png",
        },
      }}
    >
      {children}
    </AuthContext.Provider>
  )
}
