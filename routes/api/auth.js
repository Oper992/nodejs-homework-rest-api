const express = require("express");
const ctrlWrapper = require("../../helpers/ctrlWrapper");
const ctrl = require("../../controllers/auth");
const { validationBody, authenticate} = require("../../middlewares");
const { schemes } = require("../../models/user");

const router = express.Router();

router.post(
  "/users/signup",
  validationBody(schemes.registerSchema),
  ctrlWrapper(ctrl.register)
);

router.post(
  "/users/login",
  validationBody(schemes.loginSchema),
  ctrlWrapper(ctrl.login)
);

router.get("/logout", authenticate, ctrlWrapper(ctrl.logout));

router.get("/users/current", authenticate, ctrlWrapper(ctrl.currentUser));

module.exports = router;
