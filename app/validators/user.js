const { check, validationResult } = require("express-validator");

let validateNewJuridicPerson = [
  check("code").exists().isString(),
  check("name")
    .exists()
    .custom((value) => {
      if (value !== null) {
        throw new Error(
          "La propiedad nombre no debe existir en el registro de una empresa"
        );
      }
      return true;
    }),
  check("lastName")
    .exists()
    .custom((value) => {
      if (value !== null) {
        throw new Error(
          "La propiedad apellido no debe existir en el registro de una empresa"
        );
      }
      return true;
    }),
  check("social_reason").exists(),
  check("type_document").exists().isString(),
  check("document").exists().isString(),
  check("email").exists().isEmail(),
  check("password").exists().isString(),
  check("phoneNumber").exists().isString(),
  check("contractNumber")
    .exists()
    .custom((value) => {
      if (value !== null) {
        throw new Error(
          "La propiedad numero de contrato no debe existir en el registro de una empresa"
        );
      }
      return true;
    }),
  (req, res, next) => {
    try {
      validationResult(req).throw();
      return next();
    } catch (error) {
      res.status(403);
      res.send({ errors: error.array() });
    }
  },
];

let validateNewNaturalPerson = [
  check("code").notEmpty().isString(),
  check("name")
    .notEmpty()
    .withMessage("El nombre es obligatorio")
    .isString()
    .withMessage("El nombre no es de tipo texto"),
  check("lastName")
    .notEmpty()
    .withMessage("El apellido es obligatorio")
    .isString()
    .withMessage("El nombre debe ser un dato de tipo texto"),
  check("social_reason")
    .notEmpty()
    .withMessage("La razon social es obligatoria"),
  check("type_document")
    .notEmpty()
    .withMessage("El tipo de documento es obligatorio")
    .isString()
    .withMessage("El tipo de documento debe ser un texto"),
  check("document")
    .notEmpty()
    .withMessage("El documento es obligatorio")
    .isString()
    .withMessage("El documento debe ser un dato de tipo texto"),
  check("email")
    .notEmpty()
    .withMessage("El email es obligatorio")
    .isEmail()
    .withMessage("El formato del correo electronico es incorrecto"),
  check("password").notEmpty().withMessage("La contraseña es obligatoria"),
  check("phoneNumber")
    .notEmpty()
    .withMessage("El numero de telefono es obligatorio")
    .isString()
    .withMessage("El numero de telefono debe ser una cadena de texto"),
  check("contractNumber")
    .notEmpty()
    .withMessage("El numero de contrato es obligatorio")
    .isString()
    .withMessage("El numero de contrato está en un formato incorrecto"),
  (req, res, next) => {
    try {
      validationResult(req).throw();
      return next();
    } catch (error) {
      res.status(403);
      res.send({ errors: error.array() });
    }
  },
];

module.exports = { validateNewNaturalPerson, validateNewJuridicPerson };
