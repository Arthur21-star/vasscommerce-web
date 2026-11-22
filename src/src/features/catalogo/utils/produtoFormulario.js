// ProdutoResponse (vindo da API) -> valores dos campos
export function paraFormulario(produto) {
    return {
        nome: produto.nome,
        descricao: produto.descricao ?? '',
        preco: String(produto.preco),
        precoPromocional:
            produto.precoPromocional == null ? '' : String(produto.precoPromocional),
        estoque: String(produto.estoque),
        categoriaId: String(produto.categoria.id),
    }
}