let jwt = require("jsonwebtoken");
const authConfig = require("../../config/auth.js");
const { User } = require("../database/db.js");

module.exports = {
  userSigned: (req, res, next) => {
    //Comprobar si existe el token
    if (!req.headers.authorization) {
      return res.status(401).json({
        status: "UNAUTHORIZED",
        success: false,
        error:
          "Acceso denegado, el usuario no ha iniciado sesión o el token no existe",
      });
    } else {
      //Comprobar la validez del token
      let token = req.headers.authorization.split(" ")[1];

      jwt.verify(token, authConfig.secret, async (err, decoded) => {
        if (err) {

          console.log(err);
          return res.status(500).json({
            message:
              "Ha ocurrido un error, por favor inicie sesion nuevamente y vuelva a intentarlo",
          });
        }

        const user = await User.findOne({
          where: {
            code: decoded.code,
          },
        });

        if (!user) {
          return res.status(404).json({
            status: "NOT FOUND",
            success: false,
            error: "El usuario no fue encontrado",
          })
        }

        if (user.state === false) {
          return res.status(400).json({
            message:
              "El usuario aun no ha sido verificado, por favor verifique su cuenta y vuelva a intentarlo",
          });
        }

        req.userCode = decoded.code;
        req.rol = decoded.rol;
        next();
      });
    }
  },
};
