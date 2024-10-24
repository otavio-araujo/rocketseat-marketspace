import { ProductImageDTO } from "@dtos/ProductImageDTO"
import { PaymentMethodsDTO } from "@dtos/PaymentMethodDTO"

export type ProductDTO = {
  id: string
  name: string
  price: number
  is_new: boolean
  accept_trade: boolean
  product_images: ProductImageDTO[]
  payment_methods: PaymentMethodsDTO[]
  is_active: boolean
  created_at: Date
  updated_at: Date
  user: {
    avatar: string
  }
}
