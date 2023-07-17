const { HttpError, ctrlWrapper, joiSchemas } = require("../helpers");
const Contact = require("../models/contact");

const getAll = async (req, res) => {
  const result = await Contact.find();
  res.json(result);
};

const getById = async (req, res) => {
  const result = await Contact.findOne({ _id: req.params.contactId });
  if (!result) {
    throw new HttpError(404);
  }
  res.json(result);
};

const addContact = async (req, res) => {
  const { error } = joiSchema.validate(req.body);
  if (error) {
    throw new HttpError(400, error.message);
  }

  const result = await Contact.create(req.body);
  res.status(201).json(result);
};

const deletById = async (req, res) => {
  const result = await contacts.removeContact(req.params.contactId);
  if (!result) {
    throw new HttpError(404);
  }
  res.json({ message: "Contact deleted" });
};

const updateById = async (req, res) => {
  const { error } = joiSchemas.joiSchema.validate(req.body);
  if (error) {
    throw new HttpError(400, error.message);
  }

  const result = await Contact.findByIdAndUpdate(
    req.params.contactId,
    req.body,
    { new: true }
  );
  if (!result) {
    throw new HttpError(404);
  }

  res.json(result);
};

const updateFavorite = async (req, res) => {
  const { error } = joiSchemas.joiSchemaFavorite.validate(req.body);
  if (error) {
    throw new HttpError(400, error.message);
  }

  const result = await Contact.findByIdAndUpdate(
    req.params.contactId,
    req.body,
    { new: true }
  );
  if (!result) {
    throw new HttpError(404);
  }

  res.json(result);
};

module.exports = {
  getAll: ctrlWrapper(getAll),
  getById: ctrlWrapper(getById),
  addContact: ctrlWrapper(addContact),
  // deletById: ctrlWrapper(deletById),
  updateById: ctrlWrapper(updateById),
  updateFavorite: ctrlWrapper(updateFavorite),
};
