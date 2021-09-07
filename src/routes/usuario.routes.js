const express = require('express');
const router = express.Router();

// model usuario
const Usuarios = require('../models/usuario');

// GET usuarios
router.get('/', async (req, res) => {
  const usuarios = await Usuarios.find();
  res.json(usuarios);
});

// GET usuarrio por su id 
router.get('/:id', async (req, res) => {
  const usuario = await Usuarios.findById(req.params.id);
  console.log(usuario);
  res.json(usuario);
});

// ADD usuario
router.post('/', async (req, res) => {
  const { nombre_usuario,cedula_usuario, telefono_usuario, email_usuario } = req.body;
  const usuario = new Usuarios({nombre_usuario,cedula_usuario, telefono_usuario, email_usuario});
  await usuario.save();
  res.json({status: 'usuario guardado'});
});

// UPDATE usuario
router.put('/:id', async (req, res) => {
  const { nombre_usuario,cedula_usuario, telefono_usuario, email_usuario } = req.body;
  const newUsuario = {nombre_usuario,cedula_usuario, telefono_usuario, email_usuario};
  await Usuarios.findByIdAndUpdate(req.params.id, newUsuario);
  res.json({status: 'usuario actualizado'});
});

// DELETE usuario
router.delete('/:id', async (req, res) => {
  await Usuarios.findByIdAndRemove(req.params.id);
  res.json({status: 'usuario eliminado'});
});

module.exports = router;