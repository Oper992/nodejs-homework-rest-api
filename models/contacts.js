const fs = require("fs/promises");
const path = require("path");
const { nanoid } = require("nanoid");

const contactsPath = path.join(__dirname, "./contacts.json");

const listContacts = async () => {
  try {
    const contacts = await fs.readFile(contactsPath);

    return JSON.parse(contacts);
  } catch (error) {
    console.log(error);
  }
};

const getContactById = async (contactId) => {
  try {
    const contacts = await listContacts();
    const availabilityСheck = contacts.some(
      (contact) => contact.id === contactId
    );
    if (availabilityСheck) {
      const contactById = contacts.find((contact) => contact.id === contactId);
      return contactById;
    } else {
      return false;
    }
  } catch (error) {
    console.log(error);
  }
};

const removeContact = async (contactId) => {
  try {
    const contacts = await listContacts();
    const availabilityСheck = contacts.some(
      (contact) => contact.id === contactId
    );

    if (availabilityСheck) {
      const newContacts = contacts.filter(
        (contact) => contact.id !== contactId
      );

      fs.writeFile(contactsPath, JSON.stringify(newContacts, null, 2));
      return availabilityСheck;
    } else {
      return availabilityСheck;
    }
  } catch (error) {
    console.log(error);
    return false;
  }
};

const addContact = async ({ name, email, phone }) => {
  try {
    const contacts = await listContacts();
    const newContact = {
      id: nanoid(),
      name: name,
      email: email,
      phone: phone,
    };

    contacts.push(newContact);
    fs.writeFile(contactsPath, JSON.stringify(contacts, null, 2));

    return newContact;
  } catch (error) {
    console.log(error);
  }
};

const updateContact = async (contactId, { name, email, phone }) => {
  try {
    const contacts = await listContacts();
    const idx = contacts.findIndex((contact) => contact.id === contactId);

    if (idx === -1) {
      return null;
    }
    contacts[idx] = { contactId, name, email, phone };
    fs.writeFile(contactsPath, JSON.stringify(contacts, null, 2));
    return contacts[idx];
  } catch (error) {
    console.log(error);
  }
};

module.exports = {
  listContacts,
  getContactById,
  removeContact,
  addContact,
  updateContact,
};
