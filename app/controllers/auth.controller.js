const bcrypt = require('bcrypt');
const { v4: uuid } = require('uuid');
const { getToken, getTokenData } = require('../../config/jwt.config');
const { getTemplate, sendEmail } = require('../../config/mail.config');

const { User } = require('../database/db');
const auth = require('./../../config/auth.js');

const signup = async (req, res) => {
  try {
    const { data } = req.body;

    let [user, created] = await User.findOrCreate({
      where: {
        email: data.email
      },
      defaults: {
        ...data,
        id: uuid(),
        password: bcrypt.hashSync(data.password, Number.parseInt(auth.rounds))
      }
    })

    if (!created) {
      return res.status(400).json({
        status: 'FAILED',
        success: false,
        msg: 'El usuario ya existe'
      })

    };

    const token = getToken({ email: user.dataValues.email, id: user.dataValues.id })

    const template = getTemplate(user.dataValues.name, token, 'Entra a este link para verificar tu cuenta de email', 'http://localhost:4000/recyclapp/verify/', 'Verificar cuenta');

    await sendEmail(user.dataValues.email, 'Confirmación de correo electronico', template)

    res.status(201).send({ status: 'OK', data: user });

  } catch (error) {
    res.status(400).send({ status: 'FAILED', error: error });
  }
};

const signin = async (req, res) => {

  const { email, password } = req.body;

  //Buscar si el usuario existe
  const user = await User.findOne({
    where: {
      email: email
    }
  });

  if (!user) {
    res.statuss(404).json({
      status: 'NOT FOUND',
      error: 'El usuario solicitado no existe',
    })
  } else {
    if (bcrypt.compareSync(password, user.password)) {
      //Retornar el roken
      let token = getToken(user);

      res.status(200).json({
        status: 'OK',
        data: token
      })
    } else {
      res.status(400).json({ status: 'FAILED', error: 'Contraseña incorrecta' })
    };
  };
};

const restorePassword = async (req, res) => {

  const { email } = req.body || null;

  if (email === null) {
    return res.status(400).json({ status: 'FAILED', success: false, error: 'El correo electronico es necesario' })
  }

  let user = null;
  try {
    user = await User.findOne({
      where: {
        email: email
      }
    })
  } catch (err) {
    return res.status(400).json({ status: 'FAILED', success, error: err })
  }

  console.log(user);

  if (!user) {
    return res.status(404).json({ status: 'NOT FOUND', success: false, error: 'El usuario no existe' });
  }

  const token = getToken({ email: user.dataValues.email, id: user.dataValues.id });
  try {
    const updatedToken = await User.update({
      restoreToken: bcrypt.hashSync(token, Number.parseInt(auth.rounds))
    }, {
      where: {
        id: user.id
      }
    })

    console.log(updatedToken);
  } catch (err) {
    return res.status(400).json({ status: 'FAILED', success: err })
  }

  const template = getTemplate(user.dataValues.name, token, 'Ingresa a este enlace para recuperar tu contraseña', 'http://localhost:4000/recyclapp/changePassword/');
  try {
    await sendEmail(user.dataValues.email, 'Restaurar contraseña', template);
  } catch (err) {
    return res.status(400).json({ status: 'FAILED', success: false, error: err })
  }

  res.status(200).json({ status: 200, success: true, data: 'A tu email hemos enviado un correo que te permite restaurar la contraseña' });
};

const changePassword = async (req, res) => {

  const { token } = req.params;
  let { password } = req.body;

  if (!password) {
    return res.status(400).json({ status: 'FAILED', succcess: false, error: 'La nueva contraseña es requerida' });
  }
  password = bcrypt.hashSync(password, Number.parseInt(auth.rounds));

  if (!token) {
    return res.status(400).json({ status: 'FAILED', success: false, errro: 'El token es requerido' });
  }
  const tokenData = getTokenData(token);

  if (tokenData.error) {
    return res.status(400).json({ status: 'FAILED', success: false, error: tokenData.error })
  }
  const { email, id } = tokenData.data;

  console.log(tokenData);

  try {
    const user = await User.findOne({
      where: {
        email: email,
      }
    })

    if (!user) {
      return res.json({ status: 'FAILED', success: false, error: 'EL usuario no existe' })
    }

    if (user.dataValues.id === id) {
      console.log('Token comprobado');
      if (bcrypt.compareSync(token, user.restoreToken)) {
        await User.update({
          password: password,
          restoreToken: ''
        }, {
          where: {
            id: id
          }
        })

        return  res.status(200).json({ status: 'OK', success: true, data: 'Contraseña cambiada correctamente' })
      }else{
        return res.json({ status: 'FAILED', success: false, error: 'Token invalido' })
      }
    }

  } catch (err) {
    return res.status(400).json({ status: 'FAILED', succcess: false, error: err })
  }
};

const verifyUser = async (req, res) => {
  try {
    const { token } = req.params;
    const tokenData = getTokenData(token);

    if (tokenData.error) {
      return res.status(400).json({ status: 'FAILED', error: tokenData.error })
    } else {
      const { email, id } = tokenData.data;
      const user = await User.findOne({
        where: {
          email: email,
        }
      })

      if (!user) {
        return res.status(404).json({ status: 'NOT FOUND', error: 'El usuario que solicitaste no existe' });
      }

      if (user.dataValues.state) {
        return res.status(400).json({ status: 'ERROR', error: 'El usuario ya fue verificado' });
      }

      if (user.dataValues.id === id) {
        const user = await User.update(
          {
            state: true
          },
          {
            where: {
              email: email
            }
          })

        return res.status(200).json({ status: 'OK', data: 'Usuario verificado correctamente' });
      }
    }
  } catch (error) {
    return res.status(400).json({ status: 'FAILED', error: error })
  }
};

module.exports = { signup, signin, restorePassword, verifyUser, changePassword };