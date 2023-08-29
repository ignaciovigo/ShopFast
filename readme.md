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
- Mockeo de datos utilizando la libreria fakerjs
- Endpoints documentados con Swagger para una fácil referencia y documentación. [ver aqui](https://shopfast-fxgq-dev.fl0.io/apidocs)

# Notes
> Dentro del directorio se shopFast se encuentran un archivo json que posee la configuracion de todos lo endpoints para probarlos desde postman
> 
>Las variables de entorno utilizadas en el servidor se encuentran en [/shopFast/server/readme.md](https://github.com/ignaciovigo/ShopFast/tree/main/server/readme.md)
>
> El frontend fue hecho con react y vite js, para correrlo copiar el package.json y los archivos necesarios para que el entorno de vite funcione ademas de la caperta src. Luego ejecutar el comando npm install.
>
> Para correr la aplicacion del cliente ubicarse en el directorio client y ejecutar npm run dev.
>
> aclaracion: En el cliente en el archivo src/constants/constants.js se encuentra la url por la cual el cliente va a hacer las peticiones al servidor se puede modificar de acuerdo al entorno en el que se trabaje.
>
> Por otro lado para correr el servidor ubicarse en el directorio server y ejectuar npm start.