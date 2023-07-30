const express = require("express");

const router = express.Router();

const ctrl = require("../../controllers/contacts");

const { isValidId, validateBody, authenticate } = require("../../middlewares");

const { contactSchemas } = require("../../helpers");

router.get("/", authenticate, ctrl.getAll);

router.get("/:contactId", authenticate, isValidId, ctrl.getById);

router.post(
  "/",
  authenticate,
  validateBody(contactSchemas.joiSchema),
  ctrl.addContact
);

router.delete("/:contactId", authenticate, isValidId, ctrl.deletById);

router.put(
  "/:contactId",
  authenticate,
  isValidId,
  validateBody(contactSchemas.joiSchema),
  ctrl.updateById
);

router.patch(
  "/:contactId/favorite",
  authenticate,
  isValidId,
  validateBody(contactSchemas.joiSchemaFavorite),
  ctrl.updateFavorite
);

module.exports = router;
