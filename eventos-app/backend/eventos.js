const client = require('./db');

// Crear evento
const crearEvento = async (evento) => {
    const query = `
        INSERT INTO eventos (nombre_evento, fecha_hora, ubicacion, cantidad_boletos, precio_por_boleto)
        VALUES ($1, $2, $3, $4, $5)
        RETURNING *;
    `;
    const values = [evento.nombre, evento.fecha_hora, evento.ubicacion, evento.cantidad_boletos, evento.precio_por_boleto];
    const res = await client.query(query, values);
    return res.rows[0];
};

// Obtener todos los eventos
const obtenerEventos = async () => {
    const res = await client.query('SELECT * FROM eventos');
    return res.rows;
};

// Actualizar evento
const actualizarEvento = async (id, datosActualizados) => {
    try {
        const response = await fetch(`http://localhost:3000/eventos/${id}`, {
            method: 'PUT',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(datosActualizados)
        });

        if (response.ok) {
            alert('Evento actualizado correctamente');
            obtenerEventos(); // Actualiza la lista
        } else {
            alert('Error al actualizar el evento');
        }
    } catch (error) {
        console.error('Error actualizando:', error);
    }
};

// Eliminar evento
const eliminarEvento = async (id) => {
    if (!confirm("¿Estás seguro de eliminar este evento?")) return;

    try {
        const response = await fetch(`http://localhost:3000/eventos/${id}`, {
            method: 'DELETE'
        });

        if (response.ok) {
            alert('Evento eliminado');
            obtenerEventos();
        } else {
            alert('Error al eliminar el evento');
        }
    } catch (error) {
        console.error('Error eliminando:', error);
    }
};

// Vender boletos
const venderBoletos = async (id, cantidad) => {
    try {
        const response = await fetch(`http://localhost:3000/eventos/${id}/vender`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ cantidad: cantidad })
        });

        if (response.ok) {
            alert('Venta realizada con éxito');
            obtenerEventos();
        } else {
            const errorData = await response.json();
            alert(`Error: ${errorData.mensaje}`);
        }
    } catch (error) {
        console.error('Error al vender:', error);
    }
};

module.exports = { crearEvento, obtenerEventos, actualizarEvento, eliminarEvento, venderBoletos };