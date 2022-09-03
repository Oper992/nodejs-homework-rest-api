const express = require("express");
const ctrl = require("../../controllers/contacts");
const router = express.Router();
const Joi = require("joi");
const { RequestError } = require("../../helpers");

const contactTemplate = Joi.object({
  name: Joi.string().required(),
  email: Joi.string().required(),
  phone: Joi.string().required(),
  favorite: Joi.boolean().required(),
});

router.get("/", async (req, res, next) => {
  try {
    const contacts = await ctrl.listContacts();

    if (!contacts) {
      throw RequestError(404, "Not found");
    }

    res.json(contacts);
  } catch (error) {
    next(error);
  }
});

router.get("/:contactId", async (req, res, next) => {
  try {
    const contactId = req.params.contactId;
    const contactById = await ctrl.findContactById(contactId);

    if (!contactById) {
      throw RequestError(404, "Not found");
    }

    res.json(contactById);
  } catch (error) {
    next(error);
  }
});

router.post("/", async (req, res, next) => {
  try {
    const newContact = req.body;

    if (!newContact.favorite) {
      newContact.favorite = false;
    }

    const { error } = contactTemplate.validate(newContact);
    if (error) {
      throw RequestError(400, error.message);
    }

    const results = await ctrl.postContact(newContact);
  } catch (error) {
    next(error);
  }
});

router.delete("/:contactId", async (req, res, next) => {
  try {
    const contactId = req.params.contactId;
    const result = await ctrl.deleteContact(contactId);

    if (!result) {
      throw RequestError(404, "Not found");
    }

    res.json({ message: "contact deleted" });
  } catch (error) {
    next(error);
  }
});

router.put("/:contactId", async (req, res, next) => {
  const contactId = req.params.contactId;
  try {
    const { error } = contactTemplate.validate(req.body);
    if (error) {
      throw RequestError(400, error.message);
    }

    const results = await ctrl.updateContact(contactId, req.body);

    if (!results) {
      throw RequestError(404, "Not found");
    }

    res.json(results);
  } catch (error) {
    next(error);
  }
});

router.patch("/:contactId/favorite", async (req, res, next) => {
  const contactId = req.params.contactId;
  try {
    if (!req.body) {
      throw RequestError(400, "missing field favorite");
    }

    const { error } = contactTemplate.validate(req.body);
    if (error) {
      throw RequestError(400, error.message);
    }

    const results = await ctrl.updateStatusContact(contactId, req.body);

    if (!results) {
      throw RequestError(404, "Not found");
    }

    res.json(results);
  } catch (error) {
    next(error);
  }
});

module.exports = router;
