export const FORMULARIO_VAZIO = {
    nome: '',
    descricao: '',
    preco: '',
    precoPromocional: '',
    estoque: '',
    categoriaId: '',
}

export function paraDto(form) {
    return {
        nome: form.nome.trim(),
        descricao: form.descricao.trim() || null,
        preco: Number(form.preco),
        precoPromocional:
            form.precoPromocional === '' ? null : Number(form.precoPromocional),
        estoque: Number(form.estoque),
        categoriaId: Number(form.categoriaId),
    }
}

export function validar(form) {
    const erros = {}
    if (!form.nome.trim()) erros.nome = 'Informe o nome.'
    if (form.preco === '') erros.preco = 'Informe o preço.'
    if (form.estoque === '') erros.estoque = 'Informe o estoque.'
    if (!form.categoriaId) erros.categoriaId = 'Escolha uma categoria.'
    return erros
}

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