import { useState } from 'react'
import { Aviso } from '@/shared/components'
import { FiltroProdutos, ListaProdutos } from '../components'
import { useCategorias } from '../hooks/useCategorias'
import { useProduto } from '../hooks/useProduto.js'
import { excluirProduto } from '../services/produtosService'

export default function CatalogoPage({ aviso, onAviso, onNovo, onEditar }) {
    const [categoriaId, setCategoriaId] = useState('')
    const [busca, setBusca] = useState('')

    const { categorias } = useCategorias()
    const { produtos, carregando, erro, removerDaLista } = useProduto(categoriaId)

    // Derivado do estado: filtra o que já chegou, sem nova requisição
    const termo = busca.trim().toLowerCase()
    const visiveis = produtos.filter(p => p.nome.toLowerCase().includes(termo))

    async function excluir(produto) {
        if (!window.confirm(`Excluir "${produto.nome}"?`)) return
        try {
            await excluirProduto(produto.id)
            removerDaLista(produto.id)
            onAviso({ tipo: 'sucesso', texto: `"${produto.nome}" foi excluído.` })
        } catch (e) {
            onAviso({ tipo: 'erro', texto: e.message })
        }
    }

    return (
        <section>
            <div className="topo">
                <h2>Produtos</h2>
                <button type="button" onClick={onNovo}>+ Novo produto</button>
            </div>

            {aviso && <Aviso tipo={aviso.tipo}>{aviso.texto}</Aviso>}

            <FiltroProdutos
                categorias={categorias}
                categoriaId={categoriaId}
                onCategoriaChange={setCategoriaId}
                busca={busca}
                onBuscaChange={setBusca}
            />
            {carregando && <p>Carregando produtos...</p>}
            {erro && <Aviso tipo="erro">Erro: {erro}</Aviso>}
            {!carregando && !erro && (
                <ListaProdutos produtos={visiveis} onEditar={onEditar} onExcluir={excluir} />
            )}
        </section>
    )
}