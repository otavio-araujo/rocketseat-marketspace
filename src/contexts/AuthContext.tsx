import { createContext, ReactNode, useState } from "react"

import { UserDTO } from "@dtos/UserDTO"

export type AuthContextDataProps = {
  user: UserDTO
  signIn: (email: string, password: string) => void
}

type AuthContextProviderProps = {
  children: ReactNode
}

export const AuthContext = createContext<AuthContextDataProps>(
  {} as AuthContextDataProps
)

export function AuthContextProvider({ children }: AuthContextProviderProps) {
  const [user, setUser] = useState<UserDTO>({
    id: "1",
    name: "Otávio Araújo",
    email: "otavio@email.com",
    tel: "123456789",
    avatar: "https://github.com/otavio-araujo.png",
  } as UserDTO)

  function signIn(email: string, password: string) {
    setUser({ email, id: "", name: "", tel: "", avatar: "" })
  }
  return (
    <AuthContext.Provider value={{ user, signIn }}>
      {children}
    </AuthContext.Provider>
  )
}
