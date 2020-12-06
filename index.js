const express = require('express');
const routes = require('./routes');
const path = require('path');
const bodyParser = require('body-parser');

//Importando helpers
const helpers = require('./helpers');

//Crear conexión a la BBDD
const db = require('./config/db');

//Importar el modelo
require('./models/Proyectos');
require('./models/Tareas');


db.sync()
    .then(() => console.log('Conectado al servidor'))
    .catch(error => console.log(error));

//Crear la app en express
const app = express();
    

//Carga de archivos estáticos
app.use(express.static('public'));

//Habilitar pug
app.set('view engine', 'pug');

//Añadir la carpeta de vistas
app.set('views', path.join(__dirname, './views'))

//pasando el vardump del helper a la aplicación
app.use((req, res, next) => {
    //res.locals permite crear variables globales que permiten ser aplicadas en cualquier parte del proyecto. Es un ejemplo interno de como node pasa las variables.
    res.locals.vardump = helpers.vardump;
    next();//ya terminé, vete al siguiente
});

//Habilitar body parser para leer datos de formulario
app.use(bodyParser.urlencoded({extended: true}));

//Esto lee nuestro archivo de rutas
app.use('/', routes() );


//Arrancando el servidor
app.listen(3000);
console.log('inició el servidor')