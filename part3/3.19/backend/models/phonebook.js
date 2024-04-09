const mongoose = require('mongoose')

const phonebookSchema = new mongoose.Schema({
  name: { type: String, minLength: 3, required: true,  },
  number: {type: String, required: true,
    validate: // a function that returns true if the number has at least 8 digits and the first two are followed by a dash or the first three are followed by a dash  
    function hasCorrectFormat(value) {
      return value.match(/(\d{3}-\d{1,})|(\d{2}-\d{1,})/);
    }
  }
});

phonebookSchema.set('toJSON', {
  transform: (document, returnedObject) => {
    returnedObject.id = returnedObject._id.toString();
    delete returnedObject._id;
    delete returnedObject.__v;
  }
});

const Phonebook = mongoose.model('Phonebook', phonebookSchema);

module.exports = Phonebook;
