const fs = require("fs").promises;

const path = require("path");
const contactsPath = path.join(__dirname, "db", "contacts.json");

async function listContacts() {
  const listOfContacts = await GetContacts();
  console.table(listOfContacts);
}

async function GetContacts() {
  const data = await fs.readFile(contactsPath);
  const dataToString = data.toString();
  const parsedData = JSON.parse(dataToString);
  return parsedData;
}

async function checkNumberOfContacts() {
  const data = await fs.readFile(contactsPath);
  const dataToString = data.toString();
  const parsedData = JSON.parse(dataToString);
  const numberOfContacts = parsedData.length;
  return numberOfContacts;
}

async function getContactById(contactId) {
  const contactID = String(contactId);
  const data = await fs.readFile(contactsPath);
  const parsedData = JSON.parse(data);
  console.log();

  if (parsedData.every((data) => data.id !== contactID)) {
    console.log(typeof data.id);
    console.log(typeof contactId);
    console.log(`there is no id ${contactID} in database please try again!`);
  } else {
    const idOfContact = parsedData.find((element) => element.id === contactID);
    console.log(idOfContact);
  }
}

async function removeContact(contactId) {
  const contacts = await GetContacts();
  const contactID = String(contactId);
  const isContactFound = contacts.findIndex(
    (element) => element.id === contactID
  );

  const removedContacts = contacts.splice(isContactFound, 1);
  console.log("removedContacts", removedContacts);
  const dataToAdd = JSON.stringify(contacts);
  const dataToAddString = `${dataToAdd}`;
  await fs.writeFile(contactsPath, dataToAddString).then(listContacts);
}

async function addContact(name, email, phone) {
  const lastId = await checkNumberOfContacts();
  const contacts = await GetContacts();
  const nextId = String(lastId + 1);

  const contact = {
    id: nextId,
    name: String(name),
    email: String(email),
    phone: String(phone),
  };

  contacts.push(contact);

  const dataToAdd = JSON.stringify(contacts);
  const dataToAddString = `${dataToAdd}`;

  await fs.writeFile(contactsPath, dataToAddString).then(listContacts);
}

module.exports = {
  listContacts,
  getContactById,
  addContact,
  removeContact,
};
