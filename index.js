const { Command } = require("commander");
const program = new Command();

const contacts = require("./contacts");

const invokeAction = async ({ action, id, name, email, phone }) => {
    switch (action) {
        case "list":
            const allContacts = await contacts.listContacts();
            console.log(allContacts);
            break;
            
        case "get":
            const oneContact = await contacts.getContactById(id);
            console.log(oneContact);
            break;
        case "remove":
            const deleteContact = await contacts.removeContact(id);
            console.log(deleteContact);
            break;
        case "add":
            const newContact = await contacts.addContact({ name, email, phone });
            console.log(newContact);
            break;
        default:
            return console.warn('\x1B[31m Unknown action type!');
    }
}


program
  .option('-a, --action <type>', 'choose action')
  .option('-i, --id <type>', 'user id')
  .option('-n, --name <type>', 'user name')
  .option('-e, --email <type>', 'user email')
  .option('-p, --phone <type>', 'user phone');

program.parse(process.argv);
const argv = program.opts();
invokeAction(argv);
