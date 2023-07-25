const express = require("express");

const router = express.Router();

const ctrl = require("../../controllers/contacts");

const { isValidId, validateBody } = require("../../middlewares");

const { schemas } = require("../../models/contact");

router.get("/", ctrl.getAll);

router.get("/:contactId", isValidId, ctrl.getById);

router.post("/", validateBody(schemas.joiSchema), ctrl.addContact);

router.delete("/:contactId", isValidId, ctrl.deletById);

router.put(
  "/:contactId",
  validateBody(schemas.joiSchema),
  isValidId,
  ctrl.updateById
);

router.patch(
  "/:contactId/favorite",
  validateBody(schemas.joiSchemaFavorite),
  isValidId,
  ctrl.updateFavorite
);

module.exports = router;
