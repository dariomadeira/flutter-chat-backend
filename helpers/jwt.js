const jwt = require('jsonwebtoken');

const generateJWT = (uid) => {
  return new Promise((resolve, reject) => {
    const payload = {
      uid,
    };
    jwt.sign(payload, process.env.JWT_KEY, {
      expiresIn: '24h',
    }, (err, token) => {
      if (err) {
        // NO SE CREO TOKEN
        reject('Not create JWT');
      } else {
        // TOKEN CREADO
        resolve(token);
      }
    });
  })
}

module.exports = {
  generateJWT,
}