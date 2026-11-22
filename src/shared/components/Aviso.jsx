// tipo: 'info' | 'sucesso' | 'erro'
export default function Aviso({ tipo = 'info', children }) {
    return (
        <div className={`aviso ${tipo}`} role={tipo === 'erro' ? 'alert' : 'status'}>
            {children}
        </div>
    )
}