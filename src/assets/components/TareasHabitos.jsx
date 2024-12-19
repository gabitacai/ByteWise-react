import React, { useState } from 'react';

function TareasHabitos() {
    // Estado inicial con algunas tareas de ejemplo
    const [tareas, setTareas] = useState([
        { id: 1, descripcion: 'Hacer ejercicio', completada: false },
        { id: 2, descripcion: 'Leer un libro', completada: true },
        { id: 3, descripcion: 'Meditar', completada: false },
    ]);

    // Estado para los inputs de nueva tarea
    const [nuevaTarea, setNuevaTarea] = useState('');

    // Estado para la tarea en edición
    const [editando, setEditando] = useState({ id: null, descripcion: '' });

    // Función para agregar una nueva tarea
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

    // Función para eliminar una tarea por ID
    const eliminarTarea = (id) => {
        setTareas(tareas.filter(tarea => tarea.id !== id));
    };

    // Función para marcar una tarea como completada
    const toggleCompletada = (id) => {
        setTareas(tareas.map(tarea => 
            tarea.id === id ? { ...tarea, completada: !tarea.completada } : tarea
        ));
    };

    // Función para manejar el inicio de la edición
    const iniciarEdicion = (id, descripcion) => {
        setEditando({ id, descripcion });
    };

    // Función para manejar el cambio en el input de edición
    const manejarCambioEdicion = (e) => {
        setEditando({ ...editando, descripcion: e.target.value });
    };

    // Función para guardar los cambios de edición
    const guardarEdicion = (e) => {
        e.preventDefault();
        setTareas(tareas.map(tarea => 
            tarea.id === editando.id ? { ...tarea, descripcion: editando.descripcion } : tarea
        ));
        setEditando({ id: null, descripcion: '' }); // Reiniciar el estado de edición
    };

    return (
        <div className="tareas-habitos-container">
            <h1>Gestión de Tareas y Hábitos</h1>

            <h3>Lista de Tareas</h3>
            <ul className="tareas-list">
                {tareas.map(tarea => (
                    <li key={tarea.id} className="tarea-item">
                        {editando.id === tarea.id ? (
                            // Mostrar el formulario de edición si estamos editando esta tarea
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
