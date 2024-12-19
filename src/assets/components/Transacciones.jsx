import React, { useState } from 'react';

function Transacciones() {
    
    const [transacciones, setTransacciones] = useState([
        { id: 1, descripcion: 'Pago de alquiler', monto: -500, completada: false, editando: false },
        { id: 2, descripcion: 'Sueldo', monto: 1500, completada: true, editando: false },
        { id: 3, descripcion: 'Compra supermercado', monto: -200, completada: false, editando: false },
    ]);

    
    const [nuevaDescripcion, setNuevaDescripcion] = useState('');
    const [nuevoMonto, setNuevoMonto] = useState('');

   
    const agregarTransaccion = (e) => {
        e.preventDefault();
        const nuevaTransaccion = {
            id: transacciones.length + 1,
            descripcion: nuevaDescripcion,
            monto: parseFloat(nuevoMonto),
            completada: false,
            editando: false,
        };
        setTransacciones([...transacciones, nuevaTransaccion]);
        setNuevaDescripcion('');
        setNuevoMonto('');
    };

    
    const eliminarTransaccion = (id) => {
        setTransacciones(transacciones.filter(transaccion => transaccion.id !== id));
    };

    const toggleTransaccionCompletada = (id) => {
        setTransacciones(transacciones.map(transaccion =>
            transaccion.id === id ? { ...transaccion, completada: !transaccion.completada } : transaccion
        ));
    };

    const editarTransaccion = (id) => {
        setTransacciones(transacciones.map(transaccion =>
            transaccion.id === id ? { ...transaccion, editando: true } : transaccion
        ));
    };


    const guardarEdicion = (id, nuevaDescripcion, nuevoMonto) => {
        setTransacciones(transacciones.map(transaccion =>
            transaccion.id === id ? {
                ...transaccion,
                descripcion: nuevaDescripcion,
                monto: parseFloat(nuevoMonto),
                editando: false,
            } : transaccion
        ));
    };

   
    const cancelarEdicion = (id) => {
        setTransacciones(transacciones.map(transaccion =>
            transaccion.id === id ? { ...transaccion, editando: false } : transaccion
        ));
    };

    return (
        <div className="transacciones-container">
            <h1>Gestión de Transacciones</h1>
            
            <h3>Listado de Transacciones</h3>
            <ul className="transacciones-list">
                {transacciones.map(transaccion => (
                    <li key={transaccion.id} className="transaccion-item">
                        {transaccion.editando ? (
                            <div className="edit-form">
                                <input
                                    type="text"
                                    value={transaccion.descripcion}
                                    onChange={(e) =>
                                        setTransacciones(transacciones.map(t =>
                                            t.id === transaccion.id ? { ...t, descripcion: e.target.value } : t
                                        ))
                                    }
                                />
                                <input
                                    type="number"
                                    value={transaccion.monto}
                                    onChange={(e) =>
                                        setTransacciones(transacciones.map(t =>
                                            t.id === transaccion.id ? { ...t, monto: parseFloat(e.target.value) } : t
                                        ))
                                    }
                                />
                                <button onClick={() => guardarEdicion(transaccion.id, transaccion.descripcion, transaccion.monto)}>Guardar</button>
                                <button onClick={() => cancelarEdicion(transaccion.id)}>Cancelar</button>
                            </div>
                        ) : (
                            <>
                                <span
                                    style={{
                                        textDecoration: transaccion.completada ? 'line-through' : 'none',
                                    }}
                                >
                                    {transaccion.descripcion} - ${transaccion.monto}
                                </span>
                                <div className="buttons-container">
                                    <button
                                        className="transaccion-btn"
                                        onClick={() => toggleTransaccionCompletada(transaccion.id)}
                                    >
                                        {transaccion.completada ? "Desmarcar" : "Completar"}
                                    </button>
                                    <button
                                        className="transaccion-edit-btn"
                                        onClick={() => editarTransaccion(transaccion.id)}
                                    >
                                        Editar
                                    </button>
                                    <button
                                        className="transaccion-delete-btn"
                                        onClick={() => eliminarTransaccion(transaccion.id)}
                                    >
                                        Eliminar
                                    </button>
                                </div>
                            </>
                        )}
                    </li>
                ))}
            </ul>

            <h3>Agregar Nueva Transacción</h3>
            <form className="nueva-tarea-form" onSubmit={agregarTransaccion}>
                <input
                    type="text"
                    placeholder="Descripción"
                    value={nuevaDescripcion}
                    onChange={(e) => setNuevaDescripcion(e.target.value)}
                    required
                />
                <input
                    type="number"
                    placeholder="Monto"
                    value={nuevoMonto}
                    onChange={(e) => setNuevoMonto(e.target.value)}
                    required
                />
                <button type="submit">Agregar</button>
            </form>
        </div>
    );
}

export default Transacciones;
