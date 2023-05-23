const bcrypt = require("bcrypt");

const { User, Address, Role } = require("../database/db.js");
const authConfig = require("../../config/auth.js");
const { generateRandomPassword } = require("../helpers/index");
const { v4: uuid } = require("uuid");

const getAllUsers = async (req, res) => {
  try {
    const users = await User.findAll({
      where: {
        state: true,
      },
      include: [
        {
          model: Address,
          as: "address",
        },
        {
          model: Role,
          as: "rol",
        },
      ],
    });

    res.status(200).send({ status: "OK", data: users });
  } catch (error) {
    console.log(error);
    res.status(400).send({ status: "FAILED", error: error });
  }
};

const getOneUser = async (req, res) => {
  const { userCode } = req;

  try {
    const user = await User.findOne({
      where: {
        code: userCode,
      },
    });

    if (user) {
      res.status(200).send({ status: "OK", success: true, user });
    } else {
      res
        .status(404)
        .send({ status: "FAILED", error: "El usuario no fue encontrado" });
    }
  } catch (error) {
    console.log(error);
    res.status(400).send({ status: "FAILED", error: error });
  }
};

const updateUser = async (req, res) => {
  const { userCode } = req;
  const { data } = req.body;

  console.log(data);

  try {
    const updatedUser = await User.update(
      {
        ...data,
      },
      {
        where: {
          code: userCode,
        },
      }
    );

    console.log(updatedUser);

    res.status(200).send({ status: "OK", success: true, updatedUser });
  } catch (error) {
    res.status(400).send({ status: "FAILED", error: error });
  }
};

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
        ...data,
      },
    });

    if (user) {
      res
        .status(400)
        .send({ status: "FAILED", error: "El recolector ya existe" });
    } else {
      res.status(201).send({ status: "OK", data: newUser });
    }
  } catch (error) {
    res.status(400).send({ status: "FAILED", error: error });
  }
};

const createNaturalPerson = () => {};

const deleteUser = async (req, res) => {
  const { id } = req.params;

  try {
    const user = await User.findOne({
      where: {
        id: id,
      },
    });

    if (!user) {
      res
        .status(404)
        .send({ status: "FAILED", error: "El usuario no fue encontrado" });
    } else {
      await User.update(
        {
          name: "",
          secondaryName: "",
          lastName: "",
          secondaryLastName: "",
          email: "",
          password: "",
          phoneNumber: "",
          averageScore: 0,
          state: false,
        },
        {
          where: {
            id: id,
          },
        }
      );
    }

    res.status(200).send({ status: "OK", data: "Usuario eliminado con exito" });
  } catch (error) {
    console.log("hubo un error");
    res.status(400).send({ status: "FAILED", error: error });
  }
};

module.exports = {
  getAllUsers,
  getOneUser,
  updateUser,
  createUser,
  deleteUser,
};
