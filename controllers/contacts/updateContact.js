const Contact = require("../../models/contacts");

const updateContact = async (contactId, body) => {
  const updatedContact = Contact.findOneAndUpdate({ _id: contactId }, body);

  return updatedContact;
};

module.exports = updateContact;
