const mongoose = require('mongoose')

const password = process.argv[2];
const name = process.argv[3];
const number = process.argv[4];
let phonebook;
const usage = "Usage: \n add: node phonebook.js <password> <name> <number> \n search: node phonebook.js <password>";
const uri = `mongodb+srv://admin:${password}@fullstackpart3.iojrtcv.mongodb.net/phonebook?retryWrites=true&w=majority&appName=fullstackpart3`;

validateArgs();
setupDataSource();
searchOrAdd();

function validateArgs() {
  validateArgCout();
  validateNameAndNumber();
}

function validateArgCout() {
  if (process.argv.length<3) {
    console.log(usage);
    process.exit(1);
  }
  else if (process.argv.length > 3) {
    if(process.argv.length > 5){
      console.log("Too many arguments provided.", usage);
      process.exit(1);
    }
  }
}

function validateNameAndNumber() {
  if(name && !number){
    console.log("No number was provided. Entry must have number.");
    process.exit(1);
  } 
  else if(!name && number)
  {
    console.log("No name was provided. Entry must have name.");
    process.exit(1);
  } 
}

function setupDataSource() {
  mongoose.set('strictQuery',false)
  connect(uri)

  const phonebookSchema = new mongoose.Schema({
    name: String,
    number: String,
  });

  phonebookSchema.methods.toAddedMessage = function() {
    return `added ${this.name} number ${this.number}`;
  };

  phonebookSchema.methods.toFoundFormat = function() {
    return `${this.name} ${this.number}`;
  }

  phonebook = mongoose.model("phonebook", phonebookSchema);
}

async function connect(uri) {
  try {
    await mongoose.connect(uri)
  } catch (error) {
    console.error('error connecting to MongoDB:', error.message)
  }
}

async function searchOrAdd() {
  if(name && number){
    await add();
  } else {
    await search();
  }
  await closeConnection();
}

async function add(){
  const entry = new phonebook({
    name: name,
    number: number
  });

  try {
    await entry.save();
    console.log(entry.toAddedMessage()); 
  } catch (error) {
    console.log("Error saving entry", error);
  }
}

async function search(){
  console.log("Phonebook:");
  try{
    var results = await phonebook.find({});
    results.forEach(entry => {
      console.log(entry.toFoundFormat());
    })
  } catch (error) {
    console.log("Error searching", error);
  }
}


async function closeConnection() {
  await mongoose.connection.close();
}
