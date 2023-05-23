module.exports = {
  isAdmin: (req, res, next) => {
    console.log(req.user.rol);
    if (req.user.rol === "ADMIN") {
      next();
    } else {
      return res.status(400).json({
        status: "FAILED",
        success: false,
        error:
          "El usuario no cuenta con los permisos para acceder al recurso solicitado",
      });
    }
  },
  isAdminOrOwner: (req, res, next) => {
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
  isOwner: (req, res, next) => {
    if (req.user.id === req.params.id) {
      next();
    } else {
      return res.status(400).json({
        status: "FAILED",
        success: false,
        error:
          "El usuario no cuenta con los permisos para acceder al recurso solicitado",
      });
    }
  },
};
