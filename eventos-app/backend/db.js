// Base de datos en memoria para almacenar los eventos
let eventosDB = [];

const obtenerEventos = () => eventosDB;

//Crea un nuevo evento y lo agrega a la base de datos.
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

//funcion para actualizar un evento existente basado en su ID.
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
//funcion elimina un evento por su ID.
const eliminarEvento = (id) => {
  const index = eventosDB.findIndex(e => e.id === parseInt(id));
  if (index === -1) return null;
  return eventosDB.splice(index, 1)[0];
};

//funcion para vender boletos de un evento específico.
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

//Exporta funciones para el uso en otros archivos
module.exports = {
  crearEvento,
  obtenerEventos,
  actualizarEvento,
  eliminarEvento,
  venderBoletos
};