//Importamos el modelo
const Sequelize = require('sequelize');
const Proyecto = require('../models/Proyectos');


exports.proyectosHome = async (req, res) => {

    const proyectos = await Proyecto.findAll();

    res.render('index', {
        nombrePagina: 'Proyectos',
        proyectos
    });
}

exports.formularioProyectos = async (req, res) => {
    const proyectos = await Proyecto.findAll();

    res.render('nuevoProyecto', {
        nombrePagina: 'Nuevo Proyecto',
        proyectos
    });
}

exports.nuevoProyecto = async (req, res) => {
    const proyectos = await Proyecto.findAll();

    //Enviar a la consola lo ingresado en formulario
    //console.log(req.body)
    //Validar el input
    const {nombre} = req.body;

    let errores = [];

    if(!nombre) {
        errores.push({'texto': 'Agrega un nombre al proyecto'})
    }

    //Si hay errores
    if(errores.length > 0){
        res.render('nuevoProyecto', {
            nombrePagina: 'Nuevo Proyecto',
            proyectos,
            errores,
            proyectos
        })
    }else {
        //No hay errores
        //Insertar a la base de datos
        await Proyecto.create({ nombre });
        res.redirect('/');

    }
}

exports.proyectoPorUrl = async (req, res, next) => {
    const proyectosPromise =  Proyecto.findAll();

    const proyectoPromise =  Proyecto.findOne({
        where: {
            url: req.params.url
        }

    });
    const [proyectos, proyecto] = await Promise.all( [proyectosPromise, proyectoPromise] );

    if(!proyecto) return next();//Esto evalúa si el link no existe, salta esa parte

    console.log(proyecto);

    res.render('tareas', {
        nombrePagina : 'Tareas del Proyecto',
        proyecto,
        proyectos
    })
}

exports.formularioEditar = async (req, res) => {

    const proyectosPromise =  Proyecto.findAll();

    const proyectoPromise =  Proyecto.findOne({
        where: {
            id: req.params.id
        }

    });
    const [proyectos, proyecto] = await Promise.all( [proyectosPromise, proyectoPromise] );



    //render a la vista
    res.render('nuevoProyecto', {
        nombrePagina : 'Editar Proyecto',
        proyectos,
        proyecto

    })
}

//Controlador para actualizar el proyecto con el método update
exports.actualizarProyecto = async (req, res) => {
    const proyectos = await Proyecto.findAll();

    //Enviar a la consola lo ingresado en formulario
    //console.log(req.body)
    //Validar el input
    const {nombre} = req.body;

    let errores = [];

    if(!nombre) {
        errores.push({'texto': 'Agrega un nombre al proyecto'})
    }

    //Si hay errores
    if(errores.length > 0){
        res.render('nuevoProyecto', {
            nombrePagina: 'Nuevo Proyecto',
            proyectos,
            errores,
            proyectos
        })
    }else {
        //No hay errores
        //Insertar a la base de datos
        await Proyecto.update(
            { nombre: nombre },
            { where: { id: req.params.id } }
        );
        res.redirect('/');

    }
}

//Controlador para eliminar el proyecto
exports.eliminarProyecto = async (req, res, next) => {
    //console.log(req.params);
    const {urlProyecto} = req.query;
    const resultado = await Proyecto.destroy({ where: {url: urlProyecto} });

    if(!resultado){
        return next;
    }

    res.status(200).send('Proyecto eliminado correctamente');
}