import { brl } from '@/shared/utils/formatarMoeda'
import styles from './ProdutoCard.module.css'

export default function ProdutoCard({ produto, onEditar, onExcluir }) {
    return (
        <article className={styles.card}>
            <div className={styles.topo}>
                <span className={styles.categoria}>{produto.categoria.nome}</span>
                {produto.emPromocao && <span className={styles.selo}>Promoção</span>}
            </div>
            <h3 className={styles.nome}>{produto.nome}</h3>
            {produto.descricao && <p className={styles.descricao}>{produto.descricao}</p>}
            <p className={styles.preco}>
                {produto.emPromocao ? (
                    <>
                        <s>{brl(produto.preco)}</s>
                        <strong>{brl(produto.precoPromocional)}</strong>
                    </>
                ) : (
                    <strong>{brl(produto.preco)}</strong>
                )}
            </p>
            <p className={styles.estoque}>
                {produto.disponivel
                    ? `${produto.estoque} em estoque`
                    : <span className={styles.esgotado}>Esgotado</span>}
            </p>
            <div className={styles.acoes}>
                <button type="button" className="secundario" onClick={() => onEditar(produto.id)}>
                    Editar
                </button>
                <button type="button" className="perigo" onClick={() => onExcluir(produto)}>
                    Excluir
                </button>
            </div>
        </article>
    )
}