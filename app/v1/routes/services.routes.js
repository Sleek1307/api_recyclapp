const express = require("express");
const router = express.Router();

const {
  createService,
  deleteService,
  getServiceByOrigin,
  getOneService,
  getServiceByConfirmationCode,
  deliverService,
  confirmService,
} = require("../../controllers/services.controller");
const { userSigned } = require("../../middlewares/auth.middlewares.js");
const servicesPolicies = require("../../policies/services.policies");
// router.post("/services/condition", userSigned, getServicesByCondition);
//router.get("/services/date", userSigned, getServiceByDate);
router.post(
  "/services",
  userSigned,
  servicesPolicies.createService,
  createService
);
router.get(
  "/services/:id",
  userSigned,
  servicesPolicies.getService,
  getOneService
);
router.get(
  "/services/origin/all",
  userSigned,
  servicesPolicies.getService,
  getServiceByOrigin
);
router.get(
  "/services/confirmation/:id",
  userSigned,
  servicesPolicies.confrimationCode,
  getServiceByConfirmationCode
);
router.post(
  "/services/confirmation",
  userSigned,
  servicesPolicies.confrimationCode,
  confirmService
);
router.put(
  "/services/deliver/:id",
  userSigned,
  servicesPolicies.deliverService,
  deliverService
);
router.delete("/services/:id", userSigned, deleteService);

module.exports = router;
