// Rótulo + campo + mensagem de erro. O id da mensagem é `${id}-erro`.
export default function Campo({ id, rotulo, erro, children }) {
    return (
        <div className="campo">
            <label htmlFor={id}>{rotulo}</label>
            {children}
            {erro && (
                <p id={`${id}-erro`} className="erro-campo">
                    {erro}
                </p>
            )}
        </div>
    )
}