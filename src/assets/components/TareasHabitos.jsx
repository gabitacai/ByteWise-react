import React, { useState } from 'react';

function TareasHabitos() {
    
    const [tareas, setTareas] = useState([
        { id: 1, descripcion: 'Hacer ejercicio', completada: false },
        { id: 2, descripcion: 'Leer un libro', completada: true },
        { id: 3, descripcion: 'Meditar', completada: false },
    ]);

    const [nuevaTarea, setNuevaTarea] = useState('');

    
    const [editando, setEditando] = useState({ id: null, descripcion: '' });

   
    const agregarTarea = (e) => {
        e.preventDefault();
        const tarea = {
            id: tareas.length + 1,
            descripcion: nuevaTarea,
            completada: false
        };
        setTareas([...tareas, tarea]);
        setNuevaTarea('');
    };

    
    const eliminarTarea = (id) => {
        setTareas(tareas.filter(tarea => tarea.id !== id));
    };

    
    const toggleCompletada = (id) => {
        setTareas(tareas.map(tarea => 
            tarea.id === id ? { ...tarea, completada: !tarea.completada } : tarea
        ));
    };

    const iniciarEdicion = (id, descripcion) => {
        setEditando({ id, descripcion });
    };

    
    const manejarCambioEdicion = (e) => {
        setEditando({ ...editando, descripcion: e.target.value });
    };

    
    const guardarEdicion = (e) => {
        e.preventDefault();
        setTareas(tareas.map(tarea => 
            tarea.id === editando.id ? { ...tarea, descripcion: editando.descripcion } : tarea
        ));
        setEditando({ id: null, descripcion: '' }); 
    };

    return (
        <div className="tareas-habitos-container">
            <h1>Gestión de Tareas y Hábitos</h1>

            <h3>Lista de Tareas</h3>
            <ul className="tareas-list">
                {tareas.map(tarea => (
                    <li key={tarea.id} className="tarea-item">
                        {editando.id === tarea.id ? (
                            
                            <form className="tarea-editar-form" onSubmit={guardarEdicion}>
                                <input 
                                    type="text" 
                                    value={editando.descripcion} 
                                    onChange={manejarCambioEdicion} 
                                    required 
                                />
                                <button type="submit" className="guardar-btn">Guardar</button>
                                <button 
                                    type="button" 
                                    className="cancelar-btn" 
                                    onClick={() => setEditando({ id: null, descripcion: '' })}
                                >
                                    Cancelar
                                </button>
                            </form>
                        ) : (
                            <>
                                <span 
                                    style={{ textDecoration: tarea.completada ? 'line-through' : 'none' }}
                                >
                                    {tarea.descripcion}
                                </span>
                                <button 
                                    className="tarea-btn" 
                                    onClick={() => toggleCompletada(tarea.id)}
                                >
                                    {tarea.completada ? 'Desmarcar' : 'Completar'}
                                </button>
                                <button 
                                    className="tarea-edit-btn" 
                                    onClick={() => iniciarEdicion(tarea.id, tarea.descripcion)}
                                >
                                    Editar
                                </button>
                                <button 
                                    className="tarea-delete-btn" 
                                    onClick={() => eliminarTarea(tarea.id)}
                                >
                                    Eliminar
                                </button>
                            </>
                        )}
                    </li>
                ))}
            </ul>

            <h3>Agregar Nueva Tarea</h3>
            <form className="nueva-tarea-form" onSubmit={agregarTarea}>
                <input 
                    type="text" 
                    placeholder="Descripción de la tarea" 
                    value={nuevaTarea} 
                    onChange={(e) => setNuevaTarea(e.target.value)} 
                    required 
                />
                <button type="submit">Agregar</button>
            </form>
        </div>
    );
}

export default TareasHabitos;
