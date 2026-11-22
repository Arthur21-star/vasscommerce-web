// Não guarda estado: recebe os valores e avisa o pai quando mudam.
export default function FiltroProdutos({
                                           categorias,
                                           categoriaId,
                                           onCategoriaChange,
                                           busca,
                                           onBuscaChange,
                                       }) {
    return (
        <div className="filtros">
            <div>
                <label htmlFor="filtro-categoria">Categoria</label>
                <select
                    id="filtro-categoria"
                    value={categoriaId}
                    onChange={e => onCategoriaChange(e.target.value)}
                >
                    <option value="">Todas</option>
                    {categorias.map(c => (
                        <option key={c.id} value={c.id}>{c.nome}</option>
                    ))}
                </select>
            </div>
            <div>
                <label htmlFor="filtro-busca">Buscar pelo nome</label>
                <input
                    id="filtro-busca"
                    type="search"
                    placeholder="Ex.: monitor"
                    value={busca}
                    onChange={e => onBuscaChange(e.target.value)}
                />
            </div>
        </div>
    )
}