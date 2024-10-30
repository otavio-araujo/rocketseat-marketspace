function formatCurrency(value: string): string {
  // Remove qualquer caractere que não seja número
  const onlyNumbers = value.replace(/\D/g, "")

  // Converte para um número de ponto flutuante para aplicar o formato de moeda
  const numericValue = parseFloat(onlyNumbers) / 100

  // Formata como moeda brasileira
  return numericValue.toLocaleString("pt-BR", {
    style: "currency",
    currency: "BRL",
    signDisplay: "never",
  })
}

function parseCurrency(value: string): string {
  const onlyNumbers = value.replace(/\D/g, "")
  return onlyNumbers
}

export { formatCurrency, parseCurrency }
