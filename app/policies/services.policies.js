const { Role, Service, Product, Category, User } = require("../database/db");

module.exports = {
  createService: async (req, res, next) => {
    const role = await Role.findOne({
      where: {
        id: req.rol,
      },
    });

    if (role.roleName !== "final") {
      return res.status(401).json({
        status: "UNAUTHORIZED",
        success: false,
        error: "No cuentas con autorizacion para realizar esta accion",
      });
    }

    next();
  },
  deliverService: async (req, res, next) => {
    try {
      const service_id = req.params.id;
      const service = await Service.findOne({
        where: {
          id: service_id,
        },
        include: {
          model: Product,
          include: {
            model: Category,
            as: "categoria",
          },
        },
      });

      if (!service) {
        return res.status(404).json({
          status: "NOT FOUND",
          success: false,
          error: "El servicio que intentas solicitar no existe",
        });
      }

      if (service.confirmated !== "pending") {
        return res.status(400).json({
          status: "UNAUTHORIZED",
          success: false,
          error:
            "El servicio ya fue entregado, no tienes permitido hacer este tipo de modificaciones al servicio",
        });
      }

      req.service = service;
    } catch (error) {
      console.log(error);
      return res.status(400).json({
        status: "FAILED",
        success: false,
        error: "Server internal error",
      });
    }

    next();
  },
  getService: (req, res, next) => {
    try {
      if (req.rol === 1 || req.rol === 2) {
        req.originId = req.body.origin;
        return next();
      }

      if (req.rol === 3) {
        req.originId = req.userCode;
        return next();
      }
    } catch (error) {
      return res.status(400).json({
        status: "FAILED",
        success: false,
        error: "Internal server error",
      });
    }
  },
  confrimationCode: async (req, res, next) => {
    if (req.rol === 1 || req.rol === 2) {
      return next();
    }

    return res.status(401).json({
      status: "UNAUTHORIZED",
      success: false,
      error: "El usuario no tiene autorizacion para realizar esta accion",
    });
  },
  destroy: (req, res, next) => {
    if (req.rol === 1 || req.rol === 2) {
      next();
    } else {
      return res.status(400).json({
        status: "FAILED",
        success: false,
        error:
          "El usuario que intenta eliminar el registro no tiene autorizacion",
      });
    }
  },
};
