import { useEffect, useState } from 'react'
import { listarCategorias } from '../services/categoriasService'

export function useCategorias() {
    const [categorias, setCategorias] = useState([])
    const [carregando, setCarregando] = useState(true)
    const [erro, setErro] = useState(null)

    useEffect(() => {
        const controller = new AbortController()
        listarCategorias(controller.signal)
            .then(dados => setCategorias(dados))
            .catch(e => {
                if (e.name !== 'AbortError') setErro(e.message)
            })
            .finally(() => {
                if (!controller.signal.aborted) setCarregando(false)
            })
        return () => controller.abort()
    }, []) // [] = só na primeira renderização

    return { categorias, carregando, erro }
}