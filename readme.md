# Introducción
Este proyecto se centra en la gestión de un comercio electrónico (e-commerce), donde el enfoque principal está puesto en el desarrollo de un servidor que utiliza Node.js junto con la librería Express.

El servidor cuenta con:

- Un sistema de enrutamiento con controladores.
- Una arquitectura basada en capas en la que se aplican patrones DAO y Repository para consumir correctamente los servicios que ofrece la aplicación.
- Sistema de mailing
- Un sistema de roles donde cada uno posee funcionalidades particulares.
- Sistema de inicio de sesión utilizando JSON Web Tokens junto con la librería Passport-JWT.
- Pruebas de estrés, pruebas unitarias y de integración.
- El servidor está desplegado en [shopfast-fxgq-dev.fl0.io](shopfast-fxgq-dev.fl0.io)
- Endpoints documentados con Swagger para una fácil referencia y documentación. [ver aqui](shopfast-fxgq-dev.fl0.io/apidocs)

>Notes
> Dentro del directorio se shopFast se encuentran un archivo json que posee la configuracion de todos lo endpoints para probarlos desde postman
> 
>Las variables de entorno utilizadas en el servidor se encuentran en [/shopFast/server/readme.md](https://github.com/ignaciovigo/ShopFast/tree/main/server/readme.md)
