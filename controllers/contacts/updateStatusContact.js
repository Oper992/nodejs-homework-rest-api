const Contact = require("../../models/contacts");

const updateStatusContact = async (contactId, body) => {
  const updatedContact = Contact.findOneAndUpdate({ _id: contactId }, body);

  return updatedContact;
};

module.exports = updateStatusContact;
