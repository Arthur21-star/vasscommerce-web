import { useState } from 'react'
import { Aviso, Campo } from '@/shared/components'
import { paraDto, validar } from '../utils/produtoFormulario'

export default function ProdutoForm({ categorias, valoresIniciais, onEnviar, onCancelar }) {
    const [form, setForm] = useState(valoresIniciais)
    const [erros, setErros] = useState({})
    const [erroGeral, setErroGeral] = useState(null)
    const [enviando, setEnviando] = useState(false)

    // Um único handler para todos os campos: usa o atributo name
    function handleChange(e) {
        const { name, value } = e.target
        setForm(anterior => ({ ...anterior, [name]: value }))
        setErros(anteriores => ({ ...anteriores, [name]: undefined }))
    }

    async function handleSubmit(e) {
        e.preventDefault()
        const errosLocais = validar(form)
        setErros(errosLocais)
        setErroGeral(null)
        if (Object.keys(errosLocais).length > 0) return

        setEnviando(true)
        try {
            await onEnviar(paraDto(form))
        } catch (ex) {
            setErros(ex.campos ?? {}) // 400: mensagens por campo vindas da API
            setErroGeral(ex.message) // 400, 404, 422...: mensagem geral
        } finally {
            setEnviando(false)
        }
    }

    // Liga o campo à sua mensagem de erro (leitores de tela)
    function acessibilidade(campo) {
        return {
            'aria-invalid': Boolean(erros[campo]),
            'aria-describedby': erros[campo] ? `${campo}-erro` : undefined,
        }
    }

    return (
        <form className="formulario" onSubmit={handleSubmit} noValidate>
            {erroGeral && <Aviso tipo="erro">{erroGeral}</Aviso>}

            <Campo id="nome" rotulo="Nome" erro={erros.nome}>
                <input id="nome" name="nome" value={form.nome} onChange={handleChange} {...acessibilidade('nome')} />
            </Campo>

            <Campo id="descricao" rotulo="Descrição (opcional)" erro={erros.descricao}>
                <textarea id="descricao" name="descricao" rows="3" value={form.descricao} onChange={handleChange} {...acessibilidade('descricao')} />
            </Campo>

            <div className="linha">
                <Campo id="preco" rotulo="Preço (R$)" erro={erros.preco}>
                    <input id="preco" name="preco" type="number" step="0.01" value={form.preco} onChange={handleChange} {...acessibilidade('preco')} />
                </Campo>

                <Campo id="precoPromocional" rotulo="Promoção (opcional)" erro={erros.precoPromocional}>
                    <input id="precoPromocional" name="precoPromocional" type="number" step="0.01" value={form.precoPromocional} onChange={handleChange} {...acessibilidade('precoPromocional')} />
                </Campo>

                <Campo id="estoque" rotulo="Estoque" erro={erros.estoque}>
                    <input id="estoque" name="estoque" type="number" step="1" value={form.estoque} onChange={handleChange} {...acessibilidade('estoque')} />
                </Campo>
            </div>

            <Campo id="categoriaId" rotulo="Categoria" erro={erros.categoriaId}>
                <select id="categoriaId" name="categoriaId" value={form.categoriaId} onChange={handleChange} {...acessibilidade('categoriaId')}>
                    <option value="">Selecione...</option>
                    {categorias.map(c => (
                        <option key={c.id} value={c.id}>{c.nome}</option>
                    ))}
                </select>
            </Campo>

            <div className="botoes">
                <button type="button" className="secundario" onClick={onCancelar}>
                    Cancelar
                </button>
                <button type="submit" disabled={enviando}>
                    {enviando ? 'Salvando...' : 'Salvar'}
                </button>
            </div>
        </form>
    )
}