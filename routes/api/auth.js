const express = require("express");
const ctrlWrapper = require("../../helpers/ctrlWrapper");
const ctrl = require("../../controllers/auth");
const { validationBody, authenticate, upload } = require("../../middlewares");
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
router.post(
  "/users/verify/",
  validationBody(schemes.verifyEmailSchema),
  ctrlWrapper(ctrl.resendVerifyEmail)
);

router.get("/logout", authenticate, ctrlWrapper(ctrl.logout));
router.get("/users/current", authenticate, ctrlWrapper(ctrl.currentUser));
router.get("/users/verify/:verificationToken", ctrlWrapper(ctrl.verifyEmail));

router.patch(
  "/users/avatars",
  authenticate,
  upload.single("avatar"),
  ctrlWrapper(ctrl.updateAvatar)
);

module.exports = router;
