const Contact = require("../../models/contacts");

const findContactById = async (id) => {
  const contactById = await Contact.findOne({ _id: id });

  return contactById;
};

module.exports = findContactById;
