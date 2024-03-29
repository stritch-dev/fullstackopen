const mongoose = require('mongoose')

const phonebookSchema = new mongoose.Schema({
  name: { type: String, required: true },
  number: {type: String, required: true }
});

const Phonebook = mongoose.model('Phonebook', phonebookSchema);

module.exports = Phonebook;
