const express = require("express");

const router = express.Router();

const ctrl = require("../../controllers/contacts");

const { isValidId, validateBody, authenticate } = require("../../middlewares");

const { schemas } = require("../../models/contact");

router.get("/", authenticate, ctrl.getAll);

router.get("/:contactId", authenticate, isValidId, ctrl.getById);

router.post(
  "/",
  authenticate,
  validateBody(schemas.joiSchema),
  ctrl.addContact
);

router.delete("/:contactId", authenticate, isValidId, ctrl.deletById);

router.put(
  "/:contactId",
  authenticate,
  isValidId,
  validateBody(schemas.joiSchema),
  ctrl.updateById
);

router.patch(
  "/:contactId/favorite",
  authenticate,
  isValidId,
  validateBody(schemas.joiSchemaFavorite),
  ctrl.updateFavorite
);

module.exports = router;
