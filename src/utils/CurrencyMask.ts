import { Platform } from "react-native"

function formatCurrency(value: string): string {
  // Remove qualquer caractere que não seja número
  const onlyNumbers = value.replace(/\D/g, "")

  // Converte para um número de ponto flutuante para aplicar o formato de moeda
  const numericValue = parseFloat(onlyNumbers) / 100

  const formattedValue = new Intl.NumberFormat("pt-BR", {
    style: "currency",
    currency: "BRL",
    signDisplay: "never",
  }).format(numericValue)

  if (Platform.OS === "ios") {
    return formattedValue.replace("R$", "")
  }

  return formattedValue
}

function parseCurrency(value: string): string {
  const onlyNumbers = value.replace(/\D/g, "")
  return onlyNumbers
}

export { formatCurrency, parseCurrency }
