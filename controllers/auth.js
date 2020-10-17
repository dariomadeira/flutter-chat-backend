const {response} = require('express');
const User = require('../models/user');
const bcrypt = require('bcryptjs');
const { generateJWT } = require('../helpers/jwt');
const user = require('../models/user');

const createUser = async (req, res = response) => {
  const { email, password } = req.body;
  try {
    //const existEmail = await User.findOne({email: email});
    const existEmail = await User.findOne({ email });
    if (existEmail) {
      return res.status(400).json({
        ok: false,
        msg: "The email is duplicated, registered user?",
      })
    }
    const user = new User(req.body);
    // ENCRIPTAR CONTRASEÑA
    const salt = bcrypt.genSaltSync();
    user.password = bcrypt.hashSync(password, salt);
    // GUARDAR EN LA DB
    await user.save();
    // GENERAR JWT
    const token = await generateJWT(user.id);
    // MANDAR DATOS
    res.json({
      ok: true,
      //msg : "Create user",
      //body: req.body,
      user,
      token
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      ok: false,
      msg: "Error, contact the administrator",
    })
  }
}

const login = async (req, res = response) => {
  const { email, password } = req.body;
  try {
    // VALIDAD MAIL QUE SE USA COMO NOMBRE DE USUARIO
    const userDB = await user.findOne({ email});
    if (!userDB) {
      return res.status(404).json({
        ok: false,
        msg: 'Email not found',
      });
    }
    // VALIDAR PASSWORD
    const passValidate = bcrypt.compareSync(password, userDB.password);
    if (!passValidate) {
      return res.status(400).json({
        ok: false,
        msg: 'Invalid password',
      });
    }
    // GENERAR EL JWT
    const token = await generateJWT(userDB.id);
    // MANDAR DATOS
    res.json({
      ok: true,
      user: userDB,
      token
    });

  } catch (error) {
    console.log(error);
    return res.status(500).json({
      ok: false,
      msg: 'Error, contact the administrator',
    });
  }
}

const renewToken = async (req, res = response) => {
  const necesaryUid = req.uid;
  // GENERAR NUEVO JWT
  const token = await generateJWT(necesaryUid);
  // OBTENER EL USUARIO
  const user = await User.findById(necesaryUid);
  res.json({
    ok: true,
    user,
    token
  });
}

module.exports = {
  createUser,
  login,
  renewToken,
};