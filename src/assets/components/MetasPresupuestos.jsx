import React, { useState } from 'react';

function MetasPresupuestos() {
    // Estado con metas de ejemplo
    const [metas, setMetas] = useState([
        { id: 1, nombre: 'Ahorro para vacaciones', monto: 2000, completado: false, editando: false },
        { id: 2, nombre: 'Pago de tarjeta de crédito', monto: 500, completado: true, editando: false }
    ]);

    // Funciones para editar, agregar y eliminar metas
    const agregarMeta = () => {
        const nuevaMeta = { id: metas.length + 1, nombre: 'Nueva Meta', monto: 0, completado: false, editando: false };
        setMetas([...metas, nuevaMeta]);
    };

    const eliminarMeta = (id) => {
        setMetas(metas.filter(meta => meta.id !== id));
    };

    const toggleMetaCompletada = (id) => {
        setMetas(metas.map(meta => (meta.id === id ? { ...meta, completado: !meta.completado } : meta)));
    };

    const editarMeta = (id) => {
        setMetas(metas.map(meta =>
            meta.id === id ? { ...meta, editando: true } : meta
        ));
    };

    const guardarEdicion = (id, nuevoNombre, nuevoMonto) => {
        setMetas(metas.map(meta => 
            meta.id === id ? { ...meta, nombre: nuevoNombre, monto: nuevoMonto, editando: false } : meta
        ));
    };

    const cancelarEdicion = (id) => {
        setMetas(metas.map(meta => 
            meta.id === id ? { ...meta, editando: false } : meta
        ));
    };

    return (
        <div className="metas-presupuestos-container">
            <h3>Metas Activas:</h3>
            <ul className="metas-list">
                {metas.map(meta => (
                    <li key={meta.id} className="meta-item">
                        {meta.editando ? (
                            <div className="edit-form">
                            <input
                                type="text"
                                value={meta.nombre}
                                onChange={(e) => {
                                    setMetas(metas.map(m =>
                                        m.id === meta.id ? { ...m, nombre: e.target.value } : m
                                    ));
                                }}
                            />
                            <input
                                type="number"
                                value={meta.monto}
                                onChange={(e) => {
                                    setMetas(metas.map(m =>
                                        m.id === meta.id ? { ...m, monto: parseFloat(e.target.value) } : m
                                    ));
                                }}
                            />
                            <button onClick={() => guardarEdicion(meta.id, meta.nombre, meta.monto)}>Guardar</button>
                            <button onClick={() => cancelarEdicion(meta.id)}>Cancelar</button>
                        </div>
                        ) : (
                            <div>
                                <span>{meta.nombre} - ${meta.monto}</span>
                                {meta.completado ? " (Completada)" : ""}
                                <button className="meta-btn" onClick={() => toggleMetaCompletada(meta.id)}>
                                    {meta.completado ? "Reactivar" : "Completar"}
                                </button>
                                <button className="meta-edit-btn" onClick={() => editarMeta(meta.id)}>Editar</button>
                                <button className="meta-delete-btn" onClick={() => eliminarMeta(meta.id)}>Eliminar</button>
                            </div>
                        )}
                    </li>
                ))}
            </ul>
            <button className="btn-primary" onClick={agregarMeta}>Agregar Meta</button>
        </div>
    );
}

export default MetasPresupuestos;
