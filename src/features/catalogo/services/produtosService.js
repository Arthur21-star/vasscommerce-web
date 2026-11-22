import { request } from '@/shared/api/http'

// GET /produtos ou /produtos?categoriaId=2
export function listarProdutos(categoriaId, signal) {
    const filtro = categoriaId ? `?categoriaId=${categoriaId}` : ''
    return request(`/produtos${filtro}`, { signal })
}

export function buscarProduto(id, signal) {
    return request(`/produtos/${id}`, { signal })
}

export function criarProduto(dto) {
    return request('/produtos', { method: 'POST', body: dto })
}

export function atualizarProduto(id, dto) {
    return request(`/produtos/${id}`, { method: 'PUT', body: dto })
}

export function excluirProduto(id) {
    return request(`/produtos/${id}`, { method: 'DELETE' })
}