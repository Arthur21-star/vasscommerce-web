import { Aviso } from '@/shared/components'
import { ProdutoForm } from '../components'
import { useCategorias } from '../hooks/useCategorias'
import { useProduto } from '../hooks/useProduto'
import { atualizarProduto, criarProduto } from '../services/produtosService'
import { FORMULARIO_VAZIO, paraFormulario } from '../utils/produtoFormulario'

// produtoId == null -> novo produto (POST); com id -> edição (PUT)
export default function ProdutoFormPage({ produtoId, onSalvo, onCancelar }) {
    const editando = produtoId != null
    const categorias = useCategorias()
    const existente = useProduto(produtoId)

    async function salvar(dto) {
        const salvo = editando
            ? await atualizarProduto(produtoId, dto)
            : await criarProduto(dto)
        onSalvo(salvo)
    }

    if (categorias.carregando || existente.carregando) {
        return <p>Carregando...</p>
    }

    const erro = categorias.erro || existente.erro
    if (erro) {
        return (
            <>
                <Aviso tipo="erro">Erro: {erro}</Aviso>
                <button type="button" className="secundario" onClick={onCancelar}>
                    Voltar
                </button>
            </>
        )
    }

    return (
        <section>
            <h2>{editando ? 'Editar produto' : 'Novo produto'}</h2>
            <ProdutoForm
                categorias={categorias.categorias}
                valoresIniciais={editando ? paraFormulario(existente.produto) : FORMULARIO_VAZIO}
                onEnviar={salvar}
                onCancelar={onCancelar}
            />
        </section>
    )
}