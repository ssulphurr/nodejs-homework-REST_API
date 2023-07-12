const contacts = require("../models/contacts");

const { HttpError, ctrlWrapper, joiSchema } = require("../helpers");

const getAll = async (req, res) => {
  const result = await contacts.listContacts();
  res.json(result);
};

const getById = async (req, res, next) => {
  const result = await contacts.getContactById(req.params.contactId);
  if (!result) {
    return next(new HttpError(404));
  }
  res.json(result);
};

const addContact = async (req, res, next) => {
  const { error } = joiSchema.validate(req.body);
  if (error) {
    return next(new HttpError(400, error.message));
  }

  const result = await contacts.addContact(req.body);
  res.status(201).json(result);
};

const deletById = async (req, res, next) => {
  const result = await contacts.removeContact(req.params.contactId);
  if (!result) {
    return next(new HttpError(404));
  }
  res.json({ message: "Contact deleted" });
};

const updateById = async (req, res, next) => {
  const result = await contacts.updateContact(req.params.contactId, req.body);
  if (!result) {
    return next(new HttpError(404));
  }
  const { error } = joiSchema.validate(req.body);
  if (error) {
    return next(new HttpError(400, error.message));
  }

  res.json(result);
};

module.exports = {
  getAll: ctrlWrapper(getAll),
  getById: ctrlWrapper(getById),
  addContact: ctrlWrapper(addContact),
  deletById: ctrlWrapper(deletById),
  updateById: ctrlWrapper(updateById),
};
