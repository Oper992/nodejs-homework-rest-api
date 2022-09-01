const Contact = require("../../models/contacts");

const postContact = async (body) => {
  const createdContact = await Contact.create(body);

  return createdContact;
};

module.exports = postContact;
