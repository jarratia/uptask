const express = require('express');
const router = express.Router();

//Importando express Validator
const { body } = require('express-validator/check');

//Importar el controlador
const proyectosController = require('../controllers/proyectosController');

module.exports = function (){
    //Rutas
    //use ejecuta todos los verbos http
    router.get('/', proyectosController.proyectosHome);
    router.get('/nuevo-proyecto', proyectosController.formularioProyectos);
    router.post('/nuevo-proyecto', 
        body('nombre').not().isEmpty().trim().escape(),
        proyectosController.nuevoProyecto
    );

    //listar proeycto
    router.get('/proyectos/:url', proyectosController.proyectoPorUrl);

    //Actualizar el proyecto
    router.get('/proyecto/editar/:id', proyectosController.formularioEditar);

    //El método post para guardar los cambios realizados
    router.post('/nuevo-proyecto/:id', 
        body('nombre').not().isEmpty().trim().escape(),
        proyectosController.actualizarProyecto
    );

    //Eliminar proyecto
    router.delete('/proyectos/:url', proyectosController.eliminarProyecto)

    return router;
}

