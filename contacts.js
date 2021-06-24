const fs = require("fs");
const path = require("path");
const shortid = require("shortid");
const contactsPath = path.join(__dirname, "./db/contacts.json");

function listContacts() {
  fs.readFile(contactsPath, "utf-8", (err, data) => {
    if (err) {
      console.log(err.message);
    }
    console.table(JSON.parse(data));
  });
}

function getContactById(contactId) {
  fs.readFile(contactsPath, "utf-8", (err, data) => {
    if (err) {
      console.log(err.message);
    }
    const contactById = JSON.parse(data).find(contact => contact.id === Number(contactId));
    console.table(contactById);
  });
}

function removeContact(contactId) {
  fs.readFile(contactsPath, "utf-8", (err, data) => {
    if (err) {
      console.log(err.message);
    }
    const deleteContactsList = JSON.parse(data).filter(contact => contact.id === Number(contactId));

    fs.writeFile(contactsPath, JSON.stringify(deleteContactsList), err => {
      if (err) {
        console.log(err.message);
      }
    });
    console.table(deleteContactsList);
  });
}

function addContact(name, email, phone) {
  fs.readFile(contactsPath, "utf-8", (err, data) => {
    if (err) {
      console.log(err.message);
    }
    const createContact = [...JSON.parse(data), { id: shortid.generate(), name, email, phone }];
    fs.writeFile(contactsPath, JSON.stringify(createContact), err => {
      if (err) {
        console.log(err.message);
      }
    });
    console.log(`Contact ${name} was added`);
    console.table(createContact);
  });
}

module.exports = {
  listContacts,
  getContactById,
  removeContact,
  addContact
};
