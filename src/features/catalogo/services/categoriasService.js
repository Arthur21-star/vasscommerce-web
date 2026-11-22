import { request } from '@/shared/api/http'

export function listarCategorias(signal) {
    return request('/categorias', { signal })
}