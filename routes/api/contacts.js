const express = require("express");

const router = express.Router();

const ctrl = require("../../controllers/contacts");

const { isValidId, validateBody, authenticate } = require("../../middlewares");

const {
  createContactValidationSchema,
  updateFavoriteValidationSchema,
} = require("../../helpers");

router.get("/", authenticate, ctrl.getAll);

router.get("/:contactId", authenticate, isValidId, ctrl.getById);

router.post(
  "/",
  authenticate,
  validateBody(createContactValidationSchema),
  ctrl.addContact
);

router.delete("/:contactId", authenticate, isValidId, ctrl.deletById);

router.put(
  "/:contactId",
  authenticate,
  isValidId,
  validateBody(createContactValidationSchema),
  ctrl.updateById
);

router.patch(
  "/:contactId/favorite",
  authenticate,
  isValidId,
  validateBody(updateFavoriteValidationSchema),
  ctrl.updateFavorite
);

module.exports = router;
