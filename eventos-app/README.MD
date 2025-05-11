#  Eventos App

Aplicación web sencilla para gestionar eventos: permite crear, listar, editar, eliminar y vender boletos de eventos.

## Tecnologías Utilizadas

- **Frontend**: JavaScript puro (HTML, CSS y JS).
- **Backend**: Node.js con Express.
- **Base de datos**: En memoria.

## pasos para la inicialización del proyecto

- Backend:
1. Tener descargado Node.js
2. Ingresar a la carpeta backend e ingresar el comando npm install( esto instalara express y cualquier otra dependencia)
3. En la misma carpeta backend, ingresar el comando node server.js para correr la web

4. Para probar los metodos de la Api Restful desde el backend, se puede realizar por medio de la extension (Thunder Client)
    - GET http://localhost:3000/eventos → ver todos los eventos.
    - POST http://localhost:3000/eventos con body JSON → crear uno nuevo.
    - PUT http://localhost:3000/eventos/1 con body JSON → actualizar el evento con ID 1.
    - DELETE http://localhost:3000/eventos/1 → eliminar el evento con ID 1.
    -POST http://localhost:3000/eventos/1/vender con { "cantidad": 1 } → vender un boleto del evento 1.

- NOTA: La base de datos está en memoria, así que se borra al reiniciar el servidor(server.js) esto solo aplica si se cambia algo en dicho archivo.

- Frontend
1. Las validaciones básicas están implementadas en el frontend.


## ✅ Funcionalidades

1. Crear un nuevo evento con:
   - Nombre
   - Fecha y hora
   - Ubicación
   - Cantidad total de boletos disponibles
   - Precio por boleto
2. Listar todos los eventos disponibles con su información y boletos restantes.
3. Editar la información de un evento (excepto su ID).
4. Eliminar un evento.
5. Vender boletos (disminuye la cantidad disponible).
6. Validaciones básicas:
   - No se puede crear un evento sin nombre, fecha o cantidad de boletos.
   - No se pueden vender más boletos de los disponibles.

## Estructura del proyecto

eventos-app/ 
│
├── backend/
│ ├── server.js # Servidor Express con endpoints REST
│ └── db.js # Lógica de almacenamiento en memoria
  └── eventos.js # maneja la lógica visual para interactuar con el backend
│
├── frontend/
│    ├──modal_edit
     │   └──modal.css # estilos de la modal de editar
│    ├── index.html # Interfaz visual
│    ├── style.css # Estilos
│    └── app.js # Lógica del frontend
│
└── README.md 
