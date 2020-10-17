const jwt = require('jsonwebtoken');

const validateJWT = (req, res, next) => {
  // LEER TOKEN
  const token = req.header('x-token');
  //console.log(token);
  if (!token) {
    return res.status(401).json({
      ok: false,
      msg: 'No token found',
    });
  }
  try {
    const { uid } = jwt.verify(token, process.env.JWT_KEY);
    req.uid = uid;

    next(); 
  } catch (error) {
    console.log(error);
    return res.status(401).json({
      ok: false,
      msg: 'Token invalid',
    });
  }
}
 module.exports = {
   validateJWT,
 }