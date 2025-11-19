const express = require('express');
const bodyParser = require('body-parser');
const app = express();
const port = 3000;

// Incluir la conexión de la base de datos
require('./db');

// Configurar motor de plantillas EJS
app.set('view engine', 'ejs');
app.set('views', __dirname + '/views');

// Middleware para procesar datos
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(bodyParser.urlencoded({ extended: true }));

// Archivos estáticos
app.use(express.static(__dirname + '/public'));

// Rutas
const alumnos = require('./routes/alumnos');
app.use(alumnos);

// Ruta 404 - Página no encontrada
app.use((req, res, next) => {
    res.status(404).render('404', {
        tituloweb: 'Página no encontrada',
        titulo: '404',
        descripcion: 'Lo sentimos, la página que buscas no existe'
    });
});

// Iniciar servidor
app.listen(port, () => {
    console.log(`🚀 Servidor corriendo en http://localhost:${port}`);
});