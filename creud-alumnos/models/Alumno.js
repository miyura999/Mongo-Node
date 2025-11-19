const mongoose = require('mongoose');

const alumnoSchema = new mongoose.Schema({
    nombre: {
        type: String,
        required: true
    },
    edad: {
        type: Number,
        required: true
    }
}, { timestamps: true });

module.exports = mongoose.model('Alumno', alumnoSchema);
