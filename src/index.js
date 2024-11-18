const express = require('express');
const { success, error }  = require('consola'); //Agregado de proyect mongodb
const { connect } = require("mongoose");//Agregado de proyect mongodb
const { DB } = require('./database/config/config');
const redisConfig = require('./database/config/redis'); // Configuración de Redis
const Redis = require('ioredis');
const app = express();
const path = require('path');
const cors = require('cors');



const methodOverride = require('method-override');


 const whitelist = ['http://127.0.0.1:3001'];

app.use((req, res, next) => {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Headers', 'Authorization, X-API-KEY, Origin, X-Requested-With, Content-Type, Accept, Access-Control-Allow-R');
    res.header('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, DELETE');
    res.header('Allow', 'GET, POST, OPTIONS, PUT, DELETE');
    next();
  });

app.use(cors({ origin: whitelist }));
app.use(methodOverride('_method'));
///Lo tomamos de carpeta route


  
app.use(express.json()); // esto es muy importante deberia ir siempre hay
//--------------------------------------
//Para indicarle express la carpeta donde se encuentran los archivos estáticos
app.use(express.static(path.resolve(__dirname, '..', 'public')));
//Debemos indicar cual es el motor de plantillas que estamos usando EJS
//URL encode  - Para que nos pueda llegar la información desde el formulario al req.body
app.use(express.urlencoded({ extended: false }));

app.use(methodOverride('_method'));
//Requerir las rutas


const productoCompradoRoutes = require('./routes/Routes-producto');
const productoAdmin = require('./routes/admin');
const createUserAdmin = require('./routes/users');
const auth  =  require('./routes/auth');//Agregado de proyect mongodb
//Middleware de las rutas de mi proyecto

const redisClient =  new Redis(redisConfig.url)

  // Ejemplo de prueba para verificar conexión Redis
redisClient.on('connect', () => console.log('Conectado a Redis'));
redisClient.on('error', (error) => console.error('Error en Redis:', error));

app.use(createUserAdmin)
app.use(productoAdmin);
app.use(productoCompradoRoutes);
app.use(auth);


//Levantar servidor
app.listen(3001, 'localhost', ()=> console.log('Servidor corriendo en el puerto 3001'));


const startApp = async () => {
	try {
		await connect(DB, {
			useNewUrlParser: true,
			useUnifiedTopology: true,
			serverSelectionTimeoutMS: 5000,
			dbName: "nodemailer",
		});

		success({
			message: `Successfully connected with database\n${DB}`,
			badge: true,
		});

		app.listen(5000, async () => {
			success({
				message: `Server started on PORT 5000`,
				badge: true,
			});
		});
    } catch(err) {
        
        error({
            message: `Unable to connect with database\n ${err}`,
            badge: true,
        });
        startApp();
    }
};

startApp();