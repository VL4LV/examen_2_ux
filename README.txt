# Examen 2 UX - Backend con Node.js, Express, Firebase y MongoDB

## Descripción
Este proyecto es un backend desarrollado con Node.js y Express que implementa autenticación con Firebase Authentication y operaciones CRUD para posts almacenados en MongoDB.

## Requisitos previos

- Node.js y npm instalados.
- Cuenta de Firebase con proyecto creado.
- MongoDB Atlas o servidor MongoDB funcionando.

## Instalación

1. Clona el repositorio:
git clone https://github.com/VL4LV/examen_2_ux.git
cd examen_2_ux

Instala las dependencias:
npm install

Configura las variables de entorno:

Crea un archivo .env en la raíz del proyecto con el siguiente contenido:
PORT=3000
MONGODB_URI=TU_URI_DE_MONGODB
FIREBASE_PROJECT_ID=TU_FIREBASE_PROJECT_ID
FIREBASE_API_KEY=TU_FIREBASE_API_KEY
GOOGLE_APPLICATION_CREDENTIALS=./serviceAccountKey.json
Importante:

El archivo serviceAccountKey.json no está incluido en el repositorio por seguridad.

Cada desarrollador debe descargar su propia clave desde la consola de Firebase:
Firebase Console - Configuración del proyecto > Cuentas de servicio

Guarda el archivo serviceAccountKey.json en la raíz del proyecto.

Ejecuta el servidor:
npm start
El backend estará corriendo en http://localhost:3000.

