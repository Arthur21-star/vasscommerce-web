export default function Cabecalho({ onInicio }) {
    return (
        <header className="cabecalho">
            <div className="container">
                <button type="button" className="marca" onClick={onInicio}>
                    VassCommerce
                </button>
                <span>Painel de produtos</span>
            </div>
        </header>
    )
}