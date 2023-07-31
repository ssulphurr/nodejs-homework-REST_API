const express = require("express");

const { validateBody, authenticate, upload } = require("../../middlewares");

const { userSchemas } = require("../../helpers");

const ctrl = require("../../controllers/auth");

const router = express.Router();

router.post(
  "/users/register",
  validateBody(userSchemas.registerSchema),
  ctrl.register
);

router.post("/users/login", validateBody(userSchemas.loginSchema), ctrl.login);

router.post("/users/current", authenticate, ctrl.getCurrent);

router.post("/users/logout", authenticate, ctrl.logout);

router.patch(
  "/users/avatars",
  authenticate,
  upload.single("avatar"),
  ctrl.updateAvatar
);

module.exports = router;
