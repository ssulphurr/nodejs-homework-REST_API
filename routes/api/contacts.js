const express = require("express");

const router = express.Router();

const contacts = require("../../models/contacts");

const { HttpError } = require("../../helpers/HttpError");

router.get("/", async (req, res, next) => {
  try {
    const result = await contacts.listContacts();
    res.json(result);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

router.get("/:contactId", async (req, res, next) => {
  try {
    const result = await contacts.getContactById(req.params.contactId);
    if (!result) {
      throw HttpError(404, "Not Found");
    }
    res.json(result);
  } catch (error) {
    const { status = 500, message = "Server error" } = error;
    res.status(status).json({ message });
  }
});

router.post("/", async (req, res, next) => {
  try {
    const result = await contacts.addContact(req.body);
    if (!result) {
      // const error = new Error("Not Found");
      // error.status = 404;
      // throw error;
      throw HttpError(404, "Not Found");
    }
    res.json(result);
  } catch (error) {
    const { status = 500, message = "Server error" } = error;
    res.status(status).json({ message });
  }
});

router.delete("/:contactId", async (req, res, next) => {
  try {
    const result = await contacts.removeContact(req.params.contactId);
    if (!result) {
      // const error = new Error("Not Found");
      // error.status = 404;
      // throw error;
      throw HttpError(404, "Not Found");
    }
    res.json(result);
  } catch (error) {
    const { status = 500, message = "Server error" } = error;
    res.status(status).json({ message });
  }
});

router.put("/:contactId", async (req, res, next) => {
  res.json({ message: "template message" });
});

module.exports = router;
