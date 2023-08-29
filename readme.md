# Introducción
Este proyecto se centra en la gestión de un comercio electrónico (e-commerce), donde el enfoque principal está puesto en el desarrollo de un servidor que utiliza Node.js junto con la librería Express.

El servidor cuenta con:

- Un sistema de enrutamiento con controladores.
- Una arquitectura basada en capas en la que se aplican patrones DAO y Repository para consumir correctamente los servicios que ofrece la aplicación.
- Sistema de mailing
- Un sistema de roles donde cada uno posee funcionalidades particulares.
- Conexion con mongoAtlas
- Utilizacion de ODM mongoose para interactuar con MongoDB
- Sistema de inicio de sesión utilizando JSON Web Tokens junto con la librería Passport-JWT mediante el establecimiento de cookies entre peticiones.
- Pruebas de estrés, pruebas unitarias y de integración con mocha y chai.
- Sistema de logger con la libreria winston. 
- El servidor está desplegado en [shopfast-fxgq-dev.fl0.io](https://shopfast-fxgq-dev.fl0.io)
- La aplicacion frontend se encuentra desplegada en [https://shop-fast.vercel.app/](https://shop-fast.vercel.app/)
- Mockeo de datos utilizando la libreria fakerjs
- Endpoints documentados con Swagger para una fácil referencia y documentación. [ver aqui](https://shopfast-fxgq-dev.fl0.io/apidocs)

# Notes
> Dentro del directorio "shopFast" se encuentra un archivo JSON que contiene la configuración de todos los endpoints para probarlos desde Postman.

>Las variables de entorno utilizadas en el servidor se encuentran en [/shopFast/server/readme.md](https://github.com/ignaciovigo/ShopFast/tree/main/server/readme.md).
>
>El frontend fue desarrollado con React y Vite JS. Para ejecutarlo en un entorno local, copie el archivo "package.json" y los archivos necesarios para que el entorno de Vite funcione, además de la carpeta "src". Luego, ejecute el comando "npm install".
>
>Después, para ejecutar la aplicación del cliente, vaya al directorio "client" y ejecute "npm run dev".
>
>Aclaración: En el cliente, en el archivo "src/constants/constants.js", se encuentra la URL a la cual el cliente realizará las peticiones al dominio del servidor desplegado. Puede modificarse según el entorno en el que se trabaje.
>
>Por otro lado, para ejecutar el servidor, vaya al directorio "server" y ejecute "npm start".