const express = require("express");
const {
  listContacts,
  getContactById,
  removeContact,
  addContact,
  updateContact,
} = require("../../models/contacts");
const router = express.Router();
const Joi = require("joi");
const { RequestError } = require("../../helpers");

const contactTemplate = Joi.object({
  name: Joi.string().required(),
  email: Joi.string().required(),
  phone: Joi.string().required(),
});

router.get("/", async (req, res, next) => {
  const contacts = await listContacts();

  res.json(contacts);
});

router.get("/:contactId", async (req, res, next) => {
  const contactId = req.params.contactId;
  const contactById = await getContactById(contactId);

  contactById
    ? res.json(contactById)
    : res.status(404).json({ message: "Not found" });
});

router.post("/", async (req, res, next) => {
  try {
    const { error } = contactTemplate.validate(req.body);
    if (error) {
      throw RequestError(400, error.message);
    }

    const results = await addContact(req.body);
    res.status(201).json(results);
  } catch (error) {
    next(error);
  }
});

router.delete("/:contactId", async (req, res, next) => {
  const contactId = req.params.contactId;
  const remove = await removeContact(contactId);
  console.log(remove);
  remove === true
    ? res.json({ message: "contact deleted" })
    : res.status(404).json({ message: "Not found" });
});

router.put("/:contactId", async (req, res, next) => {
  const contactId = req.params.contactId;
  try {
    const { error } = contactTemplate.validate(req.body);
    if (error) {
      throw RequestError(400, error.message);
    }

    const results = await updateContact(contactId, req.body);

    if (!results) {
      throw RequestError(404, "Not found");
    }
    
    res.json(results);
  } catch (error) {
    next(error);
  }
});

module.exports = router;
