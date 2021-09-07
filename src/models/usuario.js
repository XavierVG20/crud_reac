const mongoose = require('mongoose');
const { Schema } = mongoose;

const UsuariosSchema = new Schema({
  nombre_usuario: { type: String, required: true },
  cedula_usuario: { type: String, required: true },
  telefono_usuario: { type: String, required: true },
  email_usuario: { type: String, required: true }



});

module.exports = mongoose.model('Usuarios', UsuariosSchema);