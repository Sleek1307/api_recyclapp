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

    const template = getTemplate(user.dataValues.name, token);

    await sendEmail(user.dataValues.email, 'Confirmación de correo electronico', template)

    res.status(201).send({ status: 'OK', data: user });

  } catch (error) {
    res.status(400).send({ status: 'FAILED', error: error });
  }
}

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

const restorePassword = async(req, res) => {
  
};

const verifyUser = async (req, res) => {
  try {
    const { token } = req.params;
    const tokenData = getTokenData(token);

    if (tokenData.error) {
      return res.status(400).json({ status: 'FAILED', error: tokenData.error })
    } else {
      const { email, id } = tokenData;

      const user = await User.findOne({
        where: {
          email: email,
        }
      })

      if (!user) {
        return res.status(404).json({ status: 'NOT FOUND', error: 'El usuario que solicitaste no existe' });
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

}

module.exports = { signup, signin, restorePassword, verifyUser };