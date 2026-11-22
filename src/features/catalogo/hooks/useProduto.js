import { useEffect, useState, useCallback } from 'react'
import { listarProdutos } from '../services/produtosService'

// Carrega a lista de produtos, opcionalmente filtrada por categoria.
export function useProduto(categoriaId) {
    const [produtos, setProdutos] = useState([])
    const [carregando, setCarregando] = useState(true)
    const [erro, setErro] = useState(null)

    useEffect(() => {
        const controller = new AbortController()
        setCarregando(true)
        setErro(null)

        listarProdutos(categoriaId, controller.signal)
            .then(dados => setProdutos(dados))
            .catch(e => {
                if (e.name !== 'AbortError') setErro(e.message)
            })
            .finally(() => {
                if (!controller.signal.aborted) setCarregando(false)
            })

        return () => controller.abort()
    }, [categoriaId])

    const removerDaLista = useCallback(id => {
        setProdutos(atual => atual.filter(p => p.id !== id))
    }, [])

    return { produtos, carregando, erro, removerDaLista }
}