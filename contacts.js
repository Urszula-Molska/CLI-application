//import fs
const fs = require("fs").promises;

//import path
const path = require("path");
const contacts = require("./db/contacts.json");
const contactsPath = path.join(__dirname, "db", "contacts.json");

//Function ListContacts
async function listContacts() {
  const listOfContacts = await GetContacts();
  console.table(listOfContacts);
}

//async function GetContacts
async function GetContacts() {
  const data = await fs.readFile(contactsPath);
  const dataToString = data.toString();
  const parsedData = JSON.parse(dataToString);
  return parsedData;
}

//Function checkNumberOfContacts
async function checkNumberOfContacts() {
  const data = await fs.readFile(contactsPath);
  const dataToString = data.toString();
  const parsedData = JSON.parse(dataToString);
  const numberOfContacts = parsedData.length;
  return numberOfContacts;
}

//Function getContactsById
async function getContactById(contactId) {
  const contactID = String(contactId);
  const data = await fs.readFile(contactsPath);
  const parsedData = JSON.parse(data);

  const idOfContact = parsedData.find((element) => element.id === contactID);
  console.log(idOfContact);
  if (parsedData.every((data) => data.id !== contactID) === true) {
    console.log(`there is no id ${contactID} in database please try again!`);
  }
}

//Function removeContactyId
async function removeContact(contactId) {
  const actualParsedContactsJsonFile = await GetContacts();
  const contactID = String(contactId);
  const index = actualParsedContactsJsonFile.findIndex(
    (element) => element.id === contactID
  );

  const removedContacts = actualParsedContactsJsonFile.splice(index, 1);
  console.log("removedContacts", removedContacts);
  const dataToAdd = JSON.stringify(actualParsedContactsJsonFile);
  const dataToAddString = `${dataToAdd}`;
  await fs.writeFile(contactsPath, dataToAddString).then(listContacts);
}

//Function addContact
async function addContact(name, email, phone) {
  const lastId = await checkNumberOfContacts();
  const actualParsedContactsJsonFile = await GetContacts()();
  const nextId = String(lastId + 1);

  const contact = {
    id: nextId,
    name: String(name),
    email: String(email),
    phone: String(phone),
  };

  actualParsedContactsJsonFile.push(contact);

  const dataToAdd = JSON.stringify(actualParsedContactsJsonFile);
  const dataToAddString = `${dataToAdd}`;

  await fs.writeFile(contactsPath, dataToAddString).then(listContacts);
}

module.exports = {
  listContacts,
  getContactById,
  addContact,
  removeContact,
};
