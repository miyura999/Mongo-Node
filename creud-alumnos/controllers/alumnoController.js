const Alumno = require('../models/Alumno');

module.exports = {
    
    mostrar: async (req, res) => {
        try {
            const alumnos = await Alumno.find();
            res.render('index', { alumnos });
        } catch (error) {
            console.log(error);
        }
    },

    crear: async (req, res) => {
        try {
            const alumno = new Alumno(req.body);
            await alumno.save();
            res.redirect('/');
        } catch (error) {
            console.log(error);
        }
    },

editar: async (req, res) => {
    try {
        const { id_editar, nombre_editar, edad_editar } = req.body;

        await Alumno.findByIdAndUpdate(id_editar, {
            nombre: nombre_editar,
            edad: edad_editar
        });

        res.redirect('/');
    } catch (error) {
        console.log(error);
        res.status(500).send("Error al editar");
    }
},

    borrar: async (req, res) => {
        try {
            await Alumno.findByIdAndDelete(req.params.id);
            res.redirect('/');
        } catch (error) {
            console.log(error);
        }
    }

};
