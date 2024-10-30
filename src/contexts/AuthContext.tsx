import { createContext, ReactNode, useEffect, useState } from "react"

import { api } from "@services/api"
import { UserDTO } from "@dtos/UserDTO"

import {
  storageUserSave,
  storageUserGet,
  storageUserRemove,
} from "@storage/storageUser"
import {
  storageAuthTokenSave,
  storageAuthTokenGet,
  storageAuthTokenRemove,
} from "@storage/storageAuthToken"
import { ProductDTO } from "@dtos/ProductDTO"
import { ProductImageDTO } from "@dtos/ProductImageDTO"

export type AuthContextDataProps = {
  user: UserDTO
  productCreate: ProductDTO
  productCreateImages: ProductImageDTO[]
  isLoadingUserStorageData: boolean
  signOut: () => Promise<void>
  signIn: (email: string, password: string) => Promise<void>
  contextProductCreate: (product: ProductDTO) => void
  contextProductCreateImages: (productImages: ProductImageDTO[]) => void
}

type AuthContextProviderProps = {
  children: ReactNode
}

export const AuthContext = createContext<AuthContextDataProps>(
  {} as AuthContextDataProps
)

export function AuthContextProvider({ children }: AuthContextProviderProps) {
  const [user, setUser] = useState<UserDTO>({} as UserDTO)
  const [productCreate, setProductCreate] = useState<ProductDTO>(
    {} as ProductDTO
  )
  const [productCreateImages, setProductCreateImages] = useState<
    ProductImageDTO[]
  >([] as ProductImageDTO[])

  const [isLoadingUserStorageData, setIsLoadingUserStorageData] = useState(true)

  async function loadUserData() {
    try {
      setIsLoadingUserStorageData(true)

      const loggedUser = await storageUserGet()
      const { token } = await storageAuthTokenGet()

      if (token && loggedUser) {
        userAndTokenUpdate(loggedUser, token)
      }
    } catch (error) {
      throw error
    } finally {
      setIsLoadingUserStorageData(false)
    }
  }

  function userAndTokenUpdate(userData: UserDTO, token: string) {
    api.defaults.headers.common["Authorization"] = `Bearer ${token}`

    setUser(userData)
  }

  function contextProductCreate(product: ProductDTO) {
    setProductCreate(product)
  }

  function contextProductCreateImages(productImages: ProductImageDTO[]) {
    setProductCreateImages(productImages)
  }

  async function storageUserAndTokenSave(
    userData: UserDTO,
    token: string,
    refresh_token: string
  ) {
    try {
      setIsLoadingUserStorageData(true)

      await storageUserSave(userData)
      await storageAuthTokenSave({ token, refresh_token })
    } catch (error) {
      throw error
    } finally {
      setIsLoadingUserStorageData(false)
    }
  }

  async function signIn(email: string, password: string) {
    try {
      const { data } = await api.post("/sessions", { email, password })

      if (data.user && data.token && data.refresh_token) {
        await storageUserAndTokenSave(data.user, data.token, data.refresh_token)

        userAndTokenUpdate(data.user, data.token)
      }
    } catch (error) {
      throw error
    }
  }

  async function signOut() {
    try {
      setIsLoadingUserStorageData(true)

      setUser({} as UserDTO)

      await storageUserRemove()
      await storageAuthTokenRemove()
    } catch (error) {
      throw error
    } finally {
      setIsLoadingUserStorageData(false)
    }
  }

  useEffect(() => {
    loadUserData()
  }, [])

  useEffect(() => {
    const subscribe = api.registerInterceptTokenManager(signOut)

    return () => {
      subscribe()
    }
  }, [signOut])

  return (
    <AuthContext.Provider
      value={{
        user,
        productCreate,
        productCreateImages,
        contextProductCreateImages,
        contextProductCreate,
        signIn,
        isLoadingUserStorageData,
        signOut,
      }}
    >
      {children}
    </AuthContext.Provider>
  )
}
