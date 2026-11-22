import { useState } from 'react'
import { CatalogoPage, ProdutoFormPage } from '@/features/catalogo'
import { Cabecalho } from '@/shared/components'

export default function App() {
    const [tela, setTela] = useState('catalogo') // 'catalogo' | 'formulario'
    const [produtoId, setProdutoId] = useState(null) // null = produto novo
    const [aviso, setAviso] = useState(null) // { tipo, texto }

    function abrirFormulario(id = null) {
        setProdutoId(id)
        setAviso(null)
        setTela('formulario')
    }

    function voltarAoCatalogo(novoAviso = null) {
        setAviso(novoAviso)
        setTela('catalogo')
    }

    function aoSalvar(produto) {
        voltarAoCatalogo({ tipo: 'sucesso', texto: `"${produto.nome}" foi salvo.` })
    }

    return (
        <>
            <Cabecalho onInicio={() => voltarAoCatalogo()} />
            <main className="container">
                {tela === 'catalogo' && (
                    <CatalogoPage
                        aviso={aviso}
                        onAviso={setAviso}
                        onNovo={() => abrirFormulario()}
                        onEditar={abrirFormulario}
                    />
                )}
                {tela === 'formulario' && (
                    <ProdutoFormPage
                        produtoId={produtoId}
                        onSalvo={aoSalvar}
                        onCancelar={() => voltarAoCatalogo()}
                    />
                )}
            </main>
        </>
    )
}
