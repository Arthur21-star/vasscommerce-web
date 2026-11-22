// src/shared/utils/formatarMoeda.js
const formatador = new Intl.NumberFormat('pt-BR', {
    style: 'currency',
    currency: 'BRL',
})
// brl(1299) -> "R$ 1.299,00"
export const brl = valor => formatador.format(valor)