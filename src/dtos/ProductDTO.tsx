import { ProductImageDTO } from "@dtos/ProductImageDTO"
import { PaymentMethodsDTO } from "@dtos/PaymentMethodDTO"

export type ProductDTO = {
  id?: string
  name: string
  description: string
  is_new: boolean
  price: number | string
  accept_trade: boolean
  user_id?: string
  is_active?: boolean
  created_at?: Date
  updated_at?: Date
  product_images?: ProductImageDTO[]
  payment_methods: PaymentMethodsDTO[]
  user?: {
    avatar: string
    name: string
    tel: string
  }
}
