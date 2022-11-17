const bcrypt = require('bcrypt')

const { User, Recolector } = require('../database/db');
const authConfig = require('../../config/auth.js');
const { generateRandomPassword } = require('../helpers/index');
const {v4: uuid} = require('uuid');

const getAllUsers = async (req, res) => {

  try {
    const users = await User.findAll({
      where: {
        state: true
      }
    });

    res.status(200).send({ status: 'OK', data: users })
  } catch (error) {
    res.status(400).send({ status: 'FAILED', error: error })
  }
}

const getOneUser = async (req, res) => {

  const { id } = req.params;

  try {
    const user = await User.findOne({
      where: {
        id: id
      }
    });

    if (user) {
      if (user.dataValues.state === true) {
        res.status(200).send({ status: 'OK', data: user })
      } else {
        res.status(404).send({ status: 'FAILED', error: 'El usuario no fue encontrado' });
      }
    } else {
      res.status(404).send({ status: 'FAILED', error: 'El usuario no fue encontrado' });
    };

  } catch (error) {
    res.status(400).send({ status: 'FAILED', error: error })
  }
}

const updateUser = async (req, res) => {

  const { id } = req.params;
  const { data } = req.body;

  if (data.state) {
    return;
  }

  try {
    const updatedUser = await User.update({
      ...data
    }, {
      where: {
        id: id
      }
    })

    res.send(updatedUser);
  } catch (error) {
    res.status(400).send({ status: 'FAILED', error: error })
  }
}

const createUser = async (req, res) => {
  const { data } = req.body;
  const password = generateRandomPassword();

  data.id = uuid();
  data.password = bcrypt.hashSync(password, Number.parseInt(authConfig.rounds));

  try {
    const [newUser, user] = await User.findOrCreate({
      where: {
        email: data.email,
      },
      defaults: {
        ...data
      }
    })

    if (!user) {
      res.status(400).send({ status: 'FAILED', error: 'El usuario ya existe' })
    } else {

      console.log('Hola mundo');

      console.log(newUser);

      const [newRecolector, recolector] = await Recolector.findOrCreate({
        where: {
          user_id: newUser.dataValues.id
        }, defaults: {
          user_id: newUser.dataValues.id
        }
      })

      console.log(newRecolector);

      if (!recolector) {
        res.status(400).send({ status: 'FAILED', error: 'El recolector ya existe' })
      } else {
        res.status(201).send({ status: 'OK', data: newRecolector })
      }
    }
  } catch (error) {
    res.status(400).send({ status: 'FAILED', error: error })
  }
}

const deleteUser = async (req, res) => {
  const { id } = req.params;

  try {
    const user = await User.findOne({
      where: {
        id: id
      }
    })

    if (!user) {
      res.status(404).send({ status: 'FAILED', error: 'El usuario no fue encontrado' })
    } else {

      await User.update({
        name: '',
        secondaryName: '',
        lastName: '',
        secondaryLastName: '',
        email: '',
        password: '',
        phoneNumber: '',
        averageScore: 0,
        state: false
      }, {
        where: {
          id: id
        }
      });
    }

    res.status(200).send({ status: 'OK', data: 'Usuario eliminado con exito' })
  } catch (error) {
    console.log('hubo un error');
    res.status(400).send({ status: 'FAILED', error: error })
  };
}



module.exports = { getAllUsers, getOneUser, updateUser, createUser, deleteUser }