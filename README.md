Aplicación desarrollada con NodeJs y el framework Express.

CRUD de productos basado en el ORM sequelize  registro usando archivo en formato JSON.

A continuación se describe el proceso de desarrollo de manera resumida.


Pasos o grupos de pasos ejecutados para el desarrollo del proyecto.

    Creamos el directorio e iniciamos el proyecto de node npm init.
    Instalamos las librerías que vamos a estar utilizando, de momento Express 
    Creamos la carpeta src donde irá nuestro código.
    Creamos el archivo index.js dentro de src, dentro requerimos Express e inicializamos un servidor con el método listen().

Corremos la aplicación y verificamos que el servidor corra correctamente. (npm test)
[Opcional] Creamos los scripts para correr la aplicación

    Instalamos nodemon como dependencia de desarrollo npm i nodemon --save-dev
    Agregamos el script de inicio normal "run": "node src/app.js"
    Agregamos el script de inicio para desarrollo "test": "nodemon src/app.js -e js,ejs" Como vamos a trabajar con JSON y no queremos que nodemon reinicie la aplicación cada vez que los modifiquemos, le decimos que sólo mire las extensiones js y ejs.

[Opcional] Preparamos el proyecto para utilizar GIT

    Inicializamos el repositorio
    Creamos el archivo .gitignore e incluimos el directorio de node_modules/



