const argv = require("yargs").argv;
const {
  listContacts,
  getContactById,
  addContact,
  removeContact,
} = require("./contacts.js");

function invokeAction({ action, id, name, email, phone }) {
  switch (action) {
    //node index.js --action list
    case "list":
      listContacts();
      break;

    //node index.js --action get --id 5
    case "get":
      getContactById(id);
      break;

    //node index.js --action add --name Mango --email mango@gmail.com --phone 322-22-22
    case "add":
      addContact(name, email, phone);
      break;

    //node index.js --action remove --id 3
    case "remove":
      removeContact(id);
      break;

    default:
      console.warn("\x1B[31m Unknown action type!");
  }
}

invokeAction(argv);
