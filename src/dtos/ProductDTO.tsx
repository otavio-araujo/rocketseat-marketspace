export type ProductDTO = {
  id: string
  name: string
  description: string
  is_new: boolean
  price: number
  accept_trade: boolean
  payment_methods: "credit_card" | "boleto" | "pix"
  user_id: string
  is_active: boolean
  created_at: Date
  updated_at: Date
}
