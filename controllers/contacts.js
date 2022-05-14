const createError = require("http-errors");
const { Contact } = require("../models/contact");

module.exports.postContact = async (req, res) => {
    const contact = new Contact(req.body);
    await contact.save();

    res.status(201).send(contact);
};

module.exports.getContacts = async (req, res) => {
    const contacts = await Contact.find();
    if (Array.isArray(contacts) && !contacts.length) throw createError(404, "Contacts not found");

    res.send(contacts);
};

module.exports.deleteContacts = async (req, res) => {
    const contact = await Contact.findOneAndRemove({ email: req.body.email });
    if (!contact) throw createError(404, "Contact not found");

    res.send(contact);
};
