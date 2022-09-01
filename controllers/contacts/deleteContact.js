const Contact = require("../../models/contacts");

const deleteContact = async (id) => {
  const deletedContact = await Contact.findOneAndRemove({ _id: id });

  return deletedContact;
};

module.exports = deleteContact;
