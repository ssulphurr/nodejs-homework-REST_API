const fs = require("fs/promises");

const path = require("path");
const { nanoid } = require("nanoid");

const contactsPath = path.join(__dirname, "contacts.json");

const listContacts = async () => {
  const data = await fs.readFile(contactsPath);
  return JSON.parse(data);
};

const getContactById = async (contactId) => {
  const data = await listContacts();
  const contact = data.find((contact) => contact.id === contactId);
  if (!contact) {
    return null;
  }
  return contact;
};

const addContact = async ({ name, email, phone }) => {
  const data = await listContacts();
  const newContact = {
    id: nanoid(),
    name,
    email,
    phone,
  };
  data.push(newContact);
  await fs.writeFile(contactsPath, JSON.stringify(data, null, 2));
  return newContact;
};

const removeContact = async (contactId) => {
  const data = await listContacts();
  const contactIndex = data.findIndex((contact) => contact.id === contactId);
  if (contactIndex === -1) {
    return null;
  }

  const [removedContact] = data.splice(contactIndex, 1);
  await fs.writeFile(contactsPath, JSON.stringify(data, null, 2));
  return removedContact;
};

const updateContact = async (contactId, body) => {
  console.log(contactId, body);
  const data = await listContacts();
  const contactIndex = data.findIndex((contact) => contact.id === contactId);

  if (contactIndex === -1) {
    return null;
  }

  data.splice(contactIndex, 1);

  const { name, email, phone } = body;
  const updatedContact = {
    id: contactId,
    name,
    email,
    phone,
  };

  data.push(updatedContact);
  await fs.writeFile(contactsPath, JSON.stringify(data, null, 2));
  return updatedContact;
};

module.exports = {
  listContacts,
  getContactById,
  removeContact,
  addContact,
  updateContact,
};
