let eventosDB = [];

const obtenerEventos = () => eventosDB;

const crearEvento = (evento) => {
  const nuevoEvento = {
    id: eventosDB.length + 1,
    nombre: evento.nombre,
    fecha_hora: evento.fecha_hora,
    ubicacion: evento.ubicacion,
    boletosDisponibles: parseInt(evento.cantidad_boletos),
    precio: parseFloat(evento.precio_por_boleto)
  };
  eventosDB.push(nuevoEvento);
  return nuevoEvento;
};

const actualizarEvento = (id, nuevosDatos) => {
  const index = eventosDB.findIndex(e => e.id === parseInt(id));
  if (index === -1) return null;

  eventosDB[index] = {
    ...eventosDB[index],
    nombre: nuevosDatos.nombre,
    fecha_hora: nuevosDatos.fecha_hora,
    ubicacion: nuevosDatos.ubicacion,
    boletosDisponibles: parseInt(nuevosDatos.cantidad_boletos),
    precio: parseFloat(nuevosDatos.precio),
  };

  return eventosDB[index];
};

const eliminarEvento = (id) => {
  const index = eventosDB.findIndex(e => e.id === parseInt(id));
  if (index === -1) return null;
  return eventosDB.splice(index, 1)[0];
};

const venderBoletos = (id, cantidad) => {
  const evento = eventosDB.find(e => e.id === parseInt(id));
  if (!evento) return { error: "Evento no encontrado" };

  const cantidadInt = parseInt(cantidad);
  if (evento.boletosDisponibles < cantidadInt) {
    return { error: "No hay suficientes boletos disponibles" };
  }

  evento.boletosDisponibles -= cantidadInt;
  return evento;
};

module.exports = {
  crearEvento,
  obtenerEventos,
  actualizarEvento,
  eliminarEvento,
  venderBoletos
};