import { useEffect, useState } from 'react'
import { buscarProduto } from '../services/produtosService'

// Carrega um produto pelo id. Com id null (produto novo), não busca nada.
export function useProduto(id) {
    const [produto, setProduto] = useState(null)
    const [carregando, setCarregando] = useState(id != null)
    const [erro, setErro] = useState(null)

    useEffect(() => {
        if (id == null) return
        const controller = new AbortController()
        buscarProduto(id, controller.signal)
            .then(dados => setProduto(dados))
            .catch(e => {
                if (e.name !== 'AbortError') setErro(e.message)
            })
            .finally(() => {
                if (!controller.signal.aborted) setCarregando(false)
            })
        return () => controller.abort()
    }, [id])

    return { produto, carregando, erro }
}