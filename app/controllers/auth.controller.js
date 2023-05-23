const bcrypt = require("bcrypt");
const { v4: uuid } = require("uuid");
const path = require("path");
const { getToken, getTokenData } = require("../../config/jwt.config");
const { getTemplate, sendEmail } = require("../../config/mail.config");

const { User, Address, Role } = require("../database/db");
const auth = require("./../../config/auth.js");

//TODO
/*
  Para registrar un usuario se debe validar
  que su contrato no hay sido registrado antes
*/
const signup = async (req, res) => {
  let user, created;

  try {
    const { body } = req;

    [user, created] = await User.findOrCreate({
      where: {
        code: body.code,
      },
      defaults: {
        rolId: 3,
        ...body,
        password: bcrypt.hashSync(body.password, Number.parseInt(auth.rounds)),
      },
    });
  } catch (error) {
    return res.status(400).send({
      status: "FAILED",
      success: false,
      error: "Internal server error",
      message: error.message,
    });
  }

  if (!created) {
    return res.status(400).json({
      status: "FAILED",
      success: false,
      error: "El usuario ya existe",
    });
  }

  //Envio de correo electronico
  const token = getToken({
    email: user.dataValues.email,
    code: user.dataValues.code,
  });

  const template = getTemplate(
    user.name,
    token,
    "Entra a este link para verificar tu cuenta de email",
    "http://localhost:4000/recyclapp/auth/verify/",
    "Verificar cuenta"
  );

  const emailSend = await sendEmail(
    user.email,
    "Confirmación de correo electronico",
    template
  );

  if (emailSend.error) {
    await user.destroy();
    return res.status(500).json({
      status: "FAILED",
      success: false,
      error: "Error al enviar el correo electronico, intentalo mas tarde",
    });
  }

  return res.status(201).send({
    status: "OK",
    message:
      "A tu correo hemos enviado un mensaje para que puedas verificar tu cuenta",
  });
};

const signin = async (req, res) => {
  const { code, password } = req.body;

  try {
    const user = await User.findOne({
      where: {
        code: code,
      },
      include: [
        {
          model: Address,
          as: "address",
        },
      ],
    });

    if (!user) {
      res.status(404).json({
        status: "NOT FOUND",
        error: "El usuario no existe",
      });
    } else {
      if (bcrypt.compareSync(password, user.password)) {
        //Retornar el token
        const payload = {
          code: user.code,
          rol: user.rolId,
        };
        let token = getToken(payload);

        res.status(200).json({
          status: "OK",
          success: true,
          token: token,
          user: {
            name: user.social_reason,
            email: user.email,
            state: user.state,
            rol: user.rolId
          }
        });
      } else {
        return res
          .status(400)
          .json({ status: "FAILED", error: "Contraseña incorrecta" });
      }
    }
  } catch (error) {
    return res.status(400).json({
      status: "FAILED",
      error: "Internal server error",
    });
  }
};

const forgotPassword = async (req, res) => {
  const { email, code } = req.body;

  try {
    if (!email) {
      return res.status(400).json({
        status: "FAILED",
        success: false,
        error: "El correo electronico es requerido",
      });
    }

    if (!code) {
      return res.status(400).json({
        status: "FAILED",
        success: false,
        error: "Los datos de identificacion son requerido",
      });
    }

    const user = await User.findOne({
      where: {
        code: code,
      },
    });

    if (!user) {
      return res.status(404).json({
        status: "NOT FOUND",
        success: false,
        error: "El usuario no existe",
      });
    }

    const token = getToken({
      email: user.dataValues.email,
      code: user.dataValues.code,
    });

    user.restoreToken = token;
    await user.save();

    const template = getTemplate(
      user.dataValues.name,
      token,
      "Ingresa a este enlace para recuperar tu contraseña, este enlace solo será valido durante 24 horas",
      "http://localhost:4000/recyclapp/auth/showRestoreForm/",
      "Restaurar contraseña"
    );

    const sendedEmail = await sendEmail(
      user.dataValues.email,
      "Restaurar contraseña",
      template
    );

    if (sendedEmail.error) {
      return res.status(400).json({
        status: "FAILED",
        success: false,
        error: "No hemos podido enviar el correo electronico",
      });
    }

    res.status(200).json({
      status: "OK",
      success: true,
      data: "A tu email hemos enviado un correo que te permite restaurar la contraseña",
      token,
    });
  } catch (err) {
    return res
      .status(400)
      .json({ status: "FAILED", error: "Internal server error" });
  }
};

const restorePassword = async (req, res) => {
  let { password, token } = req.body;

  if (!password) {
    return res.status(400).json({
      status: "FAILED",
      succcess: false,
      error: "La nueva contraseña es requerida",
    });
  }

  if (!token) {
    return res.status(400).json({
      status: "FAILED",
      success: false,
      errro: "El token es requerido",
    });
  }

  const tokenData = getTokenData(token);

  if (tokenData.error) {
    return res
      .status(400)
      .json({ status: "FAILED", success: false, error: tokenData.error });
  }

  const { code } = tokenData;

  try {
    const user = await User.findOne({
      where: {
        code: code,
      },
    });

    if (!user) {
      return res.json({
        status: "FAILED",
        success: false,
        error: "EL usuario no existe",
      });
    }

    if (code === user.code) {
      if (token === user.restoreToken) {

        password = bcrypt.hashSync(password, Number.parseInt(auth.rounds));

        await User.update(
          {
            password: password,
            restoreToken: null,
          },
          {
            where: {
              code: code,
            },
          }
        );

        return res.status(200).json({
          status: "OK",
          success: true,
          data: "Contraseña cambiada correctamente",
        });
      } else {
        return res.json({
          status: "FAILED",
          success: false,
          error: "Token invalido",
        });
      }
    }
  } catch (err) {
    console.log(err);

    return res.status(400).json({
      status: "FAILED",
      succcess: false,
      error: "Internal server error",
    });
  }
};

const generateVerifyToken = async (req, res) => {
  const { code } = req.body;
  try {
    const user = await User.findOne({
      where: {
        code: code,
      },
    });

    if (!user) {
      return res.status(404).json({
        status: "FAILED",
        message: "El usuario no existe",
      });
    }

    const verifyToken = getToken({
      email: user.dataValues.email,
      code: user.dataValues.code,
    });

    const template = getTemplate(
      user.dataValues.name,
      verifyToken,
      "Entra a este link para verificar tu cuenta de email",
      "http://localhost:4000/recyclapp/auth/verify/",
      "Verificar cuenta"
    );

    const emailSend = await sendEmail(
      user.dataValues.email,
      "Confirmación de correo electronico",
      template
    );

    if (emailSend.error) {
      await user.destroy();
      return res.status(500).json({
        status: "FAILED",
        success: false,
        error: "No hemos podido enviar el correo electronico",
      });
    }

    return res.status(200).send({
      status: "OK",
      message:
        "A tu correo hemos enviado un mensaje para que puedas verificar tu cuenta",
    });
  } catch (error) {
    return res.status(400).json({
      status: "FAILED",
      message: "Internal server error",
    });
  }
};

const verifyUser = async (req, res) => {
  const { token } = req.params;

  try {
    const tokenData = getTokenData(token);

    if (tokenData.error) {
      return res.status(400).json({ status: "FAILED", error: tokenData.error });
    }

    const { code } = tokenData;

    const user = await User.findOne({
      where: {
        code: code,
      },
    });

    if (!user) {
      return res.status(404).json({
        status: "NOT FOUND",
        error: "El usuario que solicitaste no existe",
      });
    }

    if (user.dataValues.state) {
      return res
        .status(400)
        .json({ status: "ERROR", error: "El usuario ya fue verificado" });
    }

    if (user.dataValues.code === code) {
      await User.update(
        {
          state: true,
        },
        {
          where: {
            code: code,
          },
        }
      );

      return res
        .status(200)
        .json({ status: "OK", message: "Usuario verificado correctamente" });
    }
  } catch (error) {
    return res
      .status(400)
      .json({ status: "FAILED", message: "Internal server error" });
  }
};

const updatePassword = async (req, res) => {
  const { password, newPassword } = req.body;
  const { code } = req;

  try {
    const user = await User.findOne({
      where: {
        code: code,
      },
    });

    if (bcrypt.compareSync(password, user.password)) {
      await User.update(
        {
          password: bcrypt.hashSync(newPassword, Number.parseInt(auth.rounds)),
        },
        {
          where: {
            code: code,
          },
        }
      );

      res.status(200).json({
        status: "OK",
        success: true,
        data: "Contraseña actualizada con exito",
      });
    } else {
      res.status(400).json({
        status: "FAILED",
        success: false,
        error: "Contraseña incorrecta",
      });
    }
  } catch (err) {
    res.status(400).json({
      status: "FAILED",
      success: false,
      message: "Internal server error",
    });
  }
};

const showRestoreForm = async (req, res) => {
  const { token } = req.params;

  try {
    const tokenData = getTokenData(token);

    if (tokenData.error) {
      return res.sendFile(path.resolve("public/tokenInvalido.html"));
    }

    const user = await User.findOne({
      where: {
        code: tokenData.code,
      },
    });

    if (!user.restoreToken) {
      return res.sendFile(path.resolve("public/tokenInvalido.html"));
    } else {
      if (token !== user.dataValues.restoreToken) {
        return res.sendFile(path.resolve("public/tokenInvalido.html"));
      }
    }
  } catch (error) {
    return res.sendFile(path.resolve("public/internalError.html"));
  }

  res.sendFile(path.resolve("public/restoreForm.html"));
};

module.exports = {
  signup,
  signin,
  generateVerifyToken,
  verifyUser,
  forgotPassword,
  restorePassword,
  updatePassword,
  showRestoreForm,
};
