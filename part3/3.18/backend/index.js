"use strict"

// setup
const express = require("express");
const requestLogger = require("morgan");
const cors = require("cors");
const env = require("dotenv").config();
const mongoose = require("mongoose");

const app = express();
const PORT = process.env.PORT;
const Phonebook = require("./models/phonebook");

requestLogger.token("body", request => JSON.stringify(request.body));
requestLogger.format("tinyPlus", ":method :url :status :res[content-length] - :response-time ms :body");

app.use(express.static("build"));
app.use(express.json());
app.use(requestLogger("tinyPlus"));
app.use(cors());
app.listen(PORT, () => { console.log(`Server running on port ${PORT}`); });


mongoose.connect(process.env.MONGODB_URI).then(() => {
    console.log("Connected to MongoDB ", new Date().toLocaleString("en-US", {timeZone: "America/New_York"}));
  }).catch(error => {
    console.log("Error connecting to MongoDB:", error.message);
});



// routes
// Non-destructive calls // 
app.get("/info", async (request, response) => {
  try {
    const documents = await Phonebook.countDocuments();
    response.send(`<p>Phonebook has info for ${documents} people</p> ${new Date()}`);
  } catch (error) {
    handleError(error, response);
  }
});

app.get("/api/persons", async (request, response) => {
 const persons = await Phonebook.find({});
 response.json(persons);
}); 


app.get("/api/persons/:id", async (request, response, next) => {
  const id = request.params.id;
  try { 
    const person = await Phonebook.findById(id).exec();
    if (person) {
      response.json(person);
    } else {
      response.status(404).send({"error":`Person not found for id ${id}`});
    }
  }
   catch (error){
     next(error);
   }
});
  
// Destructive calls // 
app.post("/api/persons", async (request, response) => {
  const name = request.body.name;
  const number = request.body.number;

  if (!name || !number) {
    return response.status(400).json({error: "name or number missing"});
  } else if (await Phonebook.findOne({name: name}) || await Phonebook.findOne({number: number})) {
    return response.status(409).json({error: "name or number already exists"});
  } else {
    try{
      const result = await Phonebook.create(request.body);
      console.log("Person created: ", result);
      response.json(result);
      console.log("result sent", result);
      console.log("response sent");
    } catch (error) {
      next(error);
    } 
  }
});

app.put("/api/persons/:id", async (request, response, next) => {
  console.log("PUT request received");
  console.log("request.body: ", request.body);
  const name = request.body.name;
  const body = request.body;
  const filter = {name: `${name}`};
  console.log("filter: ", filter);
  try {
    console.log("Updating person with name ", name);
    const updatedPerson = await Phonebook.findOneAndUpdate(filter, body, {new: true})
    console.log("Updated person:->", updatedPerson, "<-");
    if (updatedPerson) {
      response.status(200).json(updatedPerson);
    } else {
      response.status(404).send({"error":`Person with id ${id} not found`});
    }
  } catch (error) {
    error.msg = error.msg + {"error":`An error occurred while trying to update person with name ${name}`};
    next(error);
  }
});

app.delete("/api/persons/:id", async (request, response, next) => {
  const id = request.params.id;
  
  try{
    const result = await Phonebook.findByIdAndDelete(id);
    if (result) {
      const message = `Person with id ${id} was deleteed`;
      console.log(message);
      response.status(204).send({"message":message}) 
  } else { 
    response.status(404).send({"error":`Person with ${id} was not found`});
  }} catch (error) {
    error.msg = error.msg + {"error":`An error ooccured while trying to delete person with id ${id}`};
    next(error);
  }
});

app.use(handleError);
app.use(unknownEndpoint);

// middleware
function handleError(error, request, response, next) {
  {
    if(error.message.includes("Cast to ObjectId failed")) {
      response.status(400).send({"error":`Invalid id ${id}`});
    } else {
      response.status(500).send({"error": error.message});
    }
  } 
  console.log({"error": error.message});
} 

function unknownEndpoint (request, response) {
  response.status(404).send({ error: 'unknown endpoint' })
}

