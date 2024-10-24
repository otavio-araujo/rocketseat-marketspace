export type PaymentMethodsDTO = {
  key: string
  name: string
}

export const paymentMethods: PaymentMethodsDTO[] = [
  { key: "pix", name: "Pix" },
  { key: "card", name: "Cartão de Crédito" },
  { key: "boleto", name: "Boleto" },
  { key: "cash", name: "Dinheiro" },
  { key: "deposit", name: "Depósito" },
]
