const Contact = require("../../models/contacts");

const listContacts = async () => {
  const contacts = await Contact.find({});

  return contacts;
};

module.exports = listContacts;
