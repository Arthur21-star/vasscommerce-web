import ProdutoCard from './ProdutoCard'

export default function ListaProdutos({ produtos, onEditar, onExcluir }) {
    if (produtos.length === 0) {
        return <p>Nenhum produto encontrado.</p>
    }
    return (
        <div className="grade">
            {produtos.map(produto => (
                <ProdutoCard
                    key={produto.id}
                    produto={produto}
                    onEditar={onEditar}
                    onExcluir={onExcluir}
                />
            ))}
        </div>
    )
}