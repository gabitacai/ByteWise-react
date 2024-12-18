import React from 'react';

function AlertasRecomendaciones() {
    const alertas = [
        { id: 1, mensaje: 'Recordatorio: Pagar factura de electricidad antes del 5 de octubre.', tipo: 'warning' },
        { id: 2, mensaje: 'Sugerencia: Aumenta tus ahorros en un 10% este mes.', tipo: 'suggestion' }
    ];

    return (
        <div className="alertas-container">
            <ul>
                {alertas.map(alerta => (
                    <li key={alerta.id} className={`alerta-item ${alerta.tipo}`}>
                        {alerta.mensaje}
                    </li>
                ))}
            </ul>
        </div>
    );
}

export default AlertasRecomendaciones;