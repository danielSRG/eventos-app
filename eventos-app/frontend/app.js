let eventos = [];

document.addEventListener('DOMContentLoaded', () => {
  obtenerEventos();

  document.getElementById('formEvento').addEventListener('submit', crearEvento);
  document.getElementById('formEditarEvento').addEventListener('submit', guardarCambios);
  document.getElementById('cerrarModal').addEventListener('click', cerrarModal);
  window.addEventListener('click', (event) => {
    const modal = document.getElementById('modalEditar');
    if (event.target == modal) {
      cerrarModal();
    }
  });
});

function obtenerEventos() {
  fetch('http://localhost:3000/eventos')
    .then(response => response.json())
    .then(data => {
      eventos = data;
      mostrarEventos();
    })
    .catch(error => console.error('Error al obtener eventos:', error));
}

function mostrarEventos() {
  const eventosList = document.getElementById('eventosList');
  eventosList.innerHTML = '';

  eventos.forEach(evento => {
    const li = document.createElement('li');
    li.classList.add('evento-item');

    const fechaFormateada = new Date(evento.fecha_hora).toLocaleString('es-CO', {
      dateStyle: 'long',
      timeStyle: 'short'
    });

    const precioFormateado = new Intl.NumberFormat('es-CO', {
      style: 'currency',
      currency: 'COP',
      minimumFractionDigits: 0
    }).format(evento.precio);

    li.innerHTML = `
      <div class="evento-info">
        <strong>${evento.id}</strong>: ${evento.nombre} - ${fechaFormateada} - ${evento.ubicacion} - 
        ${evento.boletosDisponibles} boletos disponibles - ${precioFormateado}
      </div>
      <div class="evento-acciones">
        <button onclick="mostrarModalEditar(${evento.id})" title="editar"><i class="fas fa-edit"></i></button>
        <button onclick="eliminarEvento(${evento.id})" title="eliminar"><i class="fas fa-trash"></i></button>
        <button onclick="venderBoletos(${evento.id})" title="Vender"><i class="fas fa-dollar-sign"></i></button>
      </div>
    `;

    eventosList.appendChild(li);
  });
}

function crearEvento(e) {
  e.preventDefault();

  const nombre = document.getElementById('nombre').value.trim();
  const fecha = document.getElementById('fecha').value;
  const ubicacion = document.getElementById('ubicacion').value.trim();
  const cantidad = parseInt(document.getElementById('cantidad').value);
  const precio = parseFloat(document.getElementById('precio').value);

  if (!nombre || !fecha || isNaN(cantidad) || cantidad <= 0) {
    alert("Debes ingresar nombre, fecha y una cantidad de boletos válida.");
    return;
  }

  const evento = {
    nombre: nombre,
    fecha_hora: fecha,
    ubicacion: ubicacion,
    cantidad_boletos: cantidad,
    precio_por_boleto: precio,
  };

  fetch('http://localhost:3000/eventos', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(evento)
  })
    .then(response => {
      if (response.ok) {
        alert('Evento creado exitosamente');
        obtenerEventos();
        document.getElementById('formEvento').reset();
      } else {
        alert('Error al crear el evento');
      }
    })
    .catch(error => console.error('Error:', error));
}

function mostrarModalEditar(id) {
  const evento = eventos.find(e => e.id === id);
  if (!evento) return alert("Evento no encontrado");

  document.getElementById('edit-id').value = evento.id;
  document.getElementById('edit-nombre').value = evento.nombre;
  document.getElementById('edit-fecha').value = inputFechaModal(evento.fecha_hora);
  document.getElementById('edit-ubicacion').value = evento.ubicacion;
  document.getElementById('edit-cantidad').value = evento.boletosDisponibles;
  document.getElementById('edit-precio').value = evento.precio;

  document.getElementById('modalEditar').style.display = 'block';
}

function inputFechaModal(fechaISO) {
  const fecha = new Date(fechaISO);
  const año = fecha.getFullYear();
  const mes = String(fecha.getMonth() + 1).padStart(2, '0');
  const dia = String(fecha.getDate()).padStart(2, '0');
  const horas = String(fecha.getHours()).padStart(2, '0');
  const minutos = String(fecha.getMinutes()).padStart(2, '0');
  return `${año}-${mes}-${dia}T${horas}:${minutos}`;
}

function cerrarModal() {
  document.getElementById('modalEditar').style.display = 'none';
}

function guardarCambios(e) {
  e.preventDefault();

  const id = document.getElementById('edit-id').value;
  const nombre = document.getElementById('edit-nombre').value.trim();
  const fecha_hora = document.getElementById('edit-fecha').value;
  const ubicacion = document.getElementById('edit-ubicacion').value.trim();
  const cantidad_boletos = parseInt(document.getElementById('edit-cantidad').value);
  const precio = parseFloat(document.getElementById('edit-precio').value);

  const eventoActualizado = {
    nombre,
    fecha_hora,
    ubicacion,
    cantidad_boletos,
    precio,
  };

  fetch(`http://localhost:3000/eventos/${id}`, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(eventoActualizado)
  })
    .then(response => {
      if (response.ok) {
        alert("Evento actualizado correctamente");
        cerrarModal();
        obtenerEventos();
      } else {
        alert("Error al actualizar el evento");
      }
    })
    .catch(error => console.error("Error al guardar cambios:", error));
}

async function venderBoletos(id) {
  const cantidad = prompt('¿Cuántos boletos deseas vender?');
  if (!cantidad || isNaN(cantidad)) return alert('Cantidad inválida.');

  const res = await fetch(`http://localhost:3000/eventos/${id}/vender`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ cantidad: parseInt(cantidad, 10) })
  });

  const data = await res.json();
  if (data.error) {
    alert(data.error);
  } else {
    alert('Venta realizada exitosamente.');
    obtenerEventos();
  }
}

function eliminarEvento(id) {
  if (!confirm("¿Estás seguro de que deseas eliminar este evento?")) return;

  fetch(`http://localhost:3000/eventos/${id}`, {
    method: 'DELETE'
  })
    .then(response => {
      if (response.ok) {
        alert("Evento eliminado");
        obtenerEventos();
      } else {
        alert("Error al eliminar el evento");
      }
    })
    .catch(error => console.error('Error al eliminar evento:', error));
}



