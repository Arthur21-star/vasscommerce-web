// src/shared/api/http.js
const BASE_URL = '/api'
// Erro com o que a API contou: status HTTP e mensagens por campo.
export class ApiError extends Error {
    constructor(mensagem, status, campos = {}) {
        super(mensagem)
        this.name = 'ApiError'
        this.status = status
        this.campos = campos
    }
}
// Algumas respostas não têm corpo JSON: devolve null em vez de quebrar.
async function safeJson(res) {
    try {
        return await res.json()
    } catch {
        return null
    }
}
// Única função do projeto que chama fetch.
export async function request(caminho, { method = 'GET', body, signal } = {}) {
    const headers = { Accept: 'application/json' }
    if (body !== undefined) {
        headers['Content-Type'] = 'application/json'
    }
    let res
    try {
        res = await fetch(`${BASE_URL}${caminho}`, {
            method,
            headers,
            body: body !== undefined ? JSON.stringify(body) : undefined,
            signal,
        })
    } catch (e) {
        if (e.name === 'AbortError') throw e // cancelamento proposital
        throw new ApiError('Sem conexão com a API.', 0)
    }
    12
    if (res.status === 204) return null // DELETE bem-sucedido: sem corpo
    const dados = await safeJson(res)
    if (!res.ok) {
        const mensagem = dados?.error
            || (res.status >= 500
                ? 'A API não respondeu. Ela está rodando na porta 8080?'
                : `Erro HTTP ${res.status}`)
        throw new ApiError(mensagem, res.status, dados?.fields ?? {})
    }
    return dados
}