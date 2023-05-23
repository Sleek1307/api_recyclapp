const {
  Service,
  Product,
  User,
  Category,
  ServiceProducts,
} = require("../database/db.js");

//listo
const createService = async (req, res) => {
  const { service, products } = req.body;
  const originCode = req.userCode;

  try {
    const newService = await Service.create({
      ...service,
      origin_code: originCode,
      requestdate: new Date().toISOString().slice(0, 19).replace("T", " "),
    });

    products.map(async (product) => {
      const producto = await Product.findByPk(product.id);
      newService.addProduct(producto);
    });

    return res.status(201).send({ status: "OK", data: service });
  } catch (error) {
    return res
      .status(400)
      .send({ status: "FAILED", error: "Internal server error" });
  }
};

//listo
const getOneService = async (req, res) => {
  const { originId } = req;
  const { id } = req.params;

  try {
    const service = await Service.findOne({
      where: {
        id: id,
        origin_code: originId,
      },
      include: [
        {
          model: Product,
          include: [
            {
              model: Category,
              as: "categoria",
            },
          ],
        },
        {
          model: User,
          as: "origin",
        },
      ],
    });

    if (service === null) {
      return res.status(200).json({
        status: "OK",
        success: true,
        data: "Este usuario aun no tiene servicios a su nombre",
      });
    }

    return res.status(200).json({
      status: "OK",
      success: true,
      data: service,
    });
  } catch (error) {
    console.log(error);
    return res.status(400).json({
      status: "FAILED",
      success: false,
      error: "Internal server error",
    });
  }
};

const getAllServices = async (req, res) => {
  try {
    const service = await Service.findAll({
      include: {
        model: Product,
        as: "productos",
      },
    });

    res.status(200).json({ status: "OK", success: true, data: service });
  } catch (err) {
    res.status(400).json({
      status: "FAILED",
      success: false,
      error: "Internal server error",
    });
  }
};
/*
  Hay que extraer los servicios de un origen
*/
const getServiceByOrigin = async (req, res) => {
  const { originId } = req;

  console.log("Por origen");

  try {
    const origin = await User.findOne({
      where: {
        code: originId,
      },
    });

    if (!origin) {
      return res.status(400).json({
        status: "ERROR",
        success: false,
        error: "El usuario no existe",
      });
    }

    const service = await Service.findAll({
      where: {
        origin_code: originId,
      },
      include: {
        model: Product,
        include: [
          {
            model: Category,
            as: "categoria",
          },
        ],
      },
    });

    return res.status(200).json({ status: "OK", success: true, data: service });
  } catch (error) {
    console.log(error);

    return res.status(400).json({
      status: "FAILED",
      success: false,
      error: "Server internal error",
    });
  }
};

const getServiceByConfirmationCode = async (req, res) => {
  const { id } = req.params;

  try {
    const service = await Service.findOne({
      where: {
        confirmation_id: id,
      },
    });

    if (!service) {
      return res.status(404).json({
        status: "NOT FOUND",
        success: false,
        error: "El recurso solicitado no fue encontrado",
      });
    }

    return res.status(200).json({
      status: "OK",
      success: true,
      data: service,
    });
  } catch (error) {
    console.log(error);

    return res.status(400).json({
      status: "FAILED",
      success: false,
      error: "Internal server error",
    });
  }
};

// const getServicesByRecolector = async (req, res) => {
//   const { recolectorId } = req.body;

//   const recolector = await User.findByPk(recolectorId);
//   if (!recolector) {
//     return res.status(400).json({
//       status: "OK",
//       success: false,
//       error: "El usuario del que solicitas ver los servicios no existe",
//     });
//   } else {
//     if (origen.rol.roleName === "RECOLECTOR") {
//       try {
//         const service = await Service.findAll({
//           where: {
//             recolector_id: recolector,
//           },
//         });

//         res.status(200).json({ status: "OK", success: true, data: service });
//       } catch (err) {
//         res.status(400).json({ status: "FAILED", success: false, error: err });
//       }
//     } else {
//       return res.status(400).json({
//         status: "OK",
//         success: false,
//         error:
//           "El usuario del que solicitas ver los servicios no es un recolector",
//       });
//     }
//   }
// };

// const getServicesByCondition = async (req, res) => {
//   const { condition } = req.body;
//   const { id } = req.user;

//   console.log(id);

//   try {
//     const service = await Service.findAll({
//       where: condition,
//       include: [
//         { model: Product },
//         {
//           model: User,
//           as: "origin",
//         },
//         {
//           model: User,
//           as: "recolector",
//         },
//       ],
//     });

//     console.log(service);

//     if (!service) {
//       return res.status(404).json({
//         status: "NOT FOUND",
//         success: false,
//         error: "La informacion que deseas no fue encotrada",
//       });
//     }

//     return res.status(200).json({ status: "OK", success: true, data: service });
//   } catch (err) {
//     console.log(err);
//     return res
//       .status(400)
//       .json({ status: "FAILED", success: false, error: err });
//   }
// };

// const getServiceByDate = async (req, res) => {
//   const { date } = req.body;

//   try {
//     const service = await Service.findAll({
//       where: {
//         created_at: date,
//       },
//     });

//     res.status(200).json({ status: "OK", success: true, data: service });
//   } catch (err) {
//     res.status(400).json({ status: "FAILED", success: false, error: err });
//   }
// };

const updateService = async (req, res) => {
  const { id } = req.params;
  const { data } = req.body;
  const { recolectorId } = data;

  let recolector;
  if (recolectorId) {
    recolector = await User.findByPk(id);
    if (!recolector) {
      return res.status(404).status({
        status: "OK",
        success: false,
        error: "El recolector que ingresaste no existe",
      });
    }
  }

  try {
    const updatedService = await Service.update(
      {
        ...data,
      },
      {
        where: {
          id: id,
        },
      }
    );
    return res
      .status(200)
      .json({ status: "OK", success: true, data: updatedService });
  } catch (err) {
    return es
      .status(400)
      .json({ status: "FAILED", success: false, error: err });
  }
};

//TODO: Hacer que se pueda tomar la foto de evidencia del formato de entrega
//en el que estan las cantidades en kilogramos de los materiales que se entregaron,
//listo
const deliverService = async (req, res) => {
  const { service } = req;
  const { confirmation_id, products_modified } = req.body;
  const service_id = req.params.id;

  try {
    for (let i = 0; i < products_modified.length; i++) {
      const element = products_modified[i];

      const serviceProduct = await ServiceProducts.findOne({
        where: {
          product_id: element.product_id,
          service_id: service_id,
        },
      });

      console.log(serviceProduct.ProductId);
      const product = await Product.findOne({
        where: {
          id: serviceProduct.ProductId,
        },
        include: {
          model: Category,
          as: "categoria",
        },
      });

      const data = {
        amount: element.data.amount,
        point:
          (element.data.amount / product.categoria.reference_weight) *
          product.categoria.amount_score,
      };

      serviceProduct.amount = data.amount;
      serviceProduct.point = data.point;
      await serviceProduct.save();
    }

    service.confirmated = "delivered";
    service.confirmation_id = confirmation_id;
    service.confirmation_date = new Date()
      .toISOString()
      .slice(0, 19)
      .replace("T", " ");

    await service.save();

    return res.status(200).json({
      status: "OK",
      success: true,
      data: service,
      message: "El servicio fue aprovado exitosamente",
    });
  } catch (err) {
    console.log(err);

    return res.status(400).json({
      status: "FAILED",
      success: false,
      error: "Server internal error",
    });
  }
};

const confirmService = async (req, res) => {
  const { data, id } = req.body;

  try {
    if (data) {
      await Service.update({ ...data }, { where: { confirmation_id: id } });
    }

    const service = await Service.findOne({
      where: {
        confirmation_id: id,
      },
      include: [
        {
          model: Product,
          include: [
            {
              model: Category,
              as: "categoria",
            },
          ],
        },
        {
          model: User,
          as: "origin",
        },
      ],
    });

    if (!service) {
      return res.status(404).json({
        status: "NOT FOUND",
        success: false,
        error: "El recurso solicitado no fue encontrado",
      });
    }

    let total_points = 0;
    service.Products.forEach((item) => {
      total_points += parseInt(item.ServiceProducts.point);
    });

    service.total_points = total_points;
    service.confirmated = "confirmated";
    await service.save();

    return res.status(200).json({
      status: "OK",
      success: true,
      data: service,
    });
  } catch (error) {
    return res.status(400).json({
      status: "FAILED",
      success: false,
      error: "Server internal error",
    });
  }
};

const deleteService = async (req, res) => {
  const { id } = req.params;
  try {
    const deleted = await Service.findByPk(id);
    if (!deleted) {
      return res.status(404).json({
        status: "NOT FOUND",
        success: false,
        data: "El recurso al que intentas acceder no existe",
      });
    }

    await deleted.destroy();
    return res.status(200).json({
      status: "OK",
      success: true,
      data: "Servicio eliminado con exito",
    });
  } catch (err) {
    return res
      .status(400)
      .json({ status: "FAILED", success: false, error: err });
  }
};

module.exports = {
  createService,
  getOneService,
  getAllServices,
  getServiceByOrigin,
  getServiceByConfirmationCode,
  updateService,
  deleteService,
  deliverService,
  confirmService,
};
