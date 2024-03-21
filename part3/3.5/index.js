"use strict"

const express = require("express");
const app = express();

app.use(express.json());
app.listen(3001, () => {
 console.log("Server running on port 3001");
});

let people = [
    { 
      "id": 1,
      "name": "Arto Hellas", 
      "number": "040-123456"
    },
    { 
      "id": 2,
      "name": "Ada Lovelace", 
      "number": "39-44-5323523"
    },
    { 
      "id": 3,
      "name": "Dan Meaf", 
      "number": "12-43-234345"
    },
    { 
      "id": 4,
      "name": "Mary Poppendieck", 
      "number": "39-23-6423122"
    }
];

app.get("/info", (request, response) => {
  response.send(`<p>Phonebook has info for ${people.length} people</p> ${new Date()}`);
});

app.get("/api/persons", (request, response) => {
 response.json(people);
});

app.get("/api/persons/:id", (request, response) => {
  const id = Number(request.params.id);
  const person = people.find(person => person.id === id);
  if (person) {
    response.json(person);
  } else {
    response.status(404).send(`Person not found for id ${id}`);
  }
});

function generateId(){
  const id = people.length + Math.floor(Math.random() * 10);
  console.log("id", id);
  return id;
}

app.post("/api/persons", (request, response) => {
  console.log("body", request.body);
  console.log("name", request.body.name);
  console.log("number", request.body.number);
  if(request.body.name && request.body.number){
    const newPerson = {
      "name": request.body.name,
      "number": request.body.name,
      id: generateId()
    };
    console.log("newPerson", newPerson);
  } else {
    // assuming it was not a server error
    response.status(400).send("No content or incomplete content was recieved");
  }

});

app.delete("/api/persons/:id", (request, response) => {
  console.log("delete");
  const id = Number(request.params.id);
  const person = people.find(person => person.id === id);
  console.log("before", people);
  if (person) {
    people = people.filter(person => person.id !== id);
    response.status(204).send(`The peson with id ${id} has been deleted`);
  } else {
    console.log("not found");
    response.status(404).send(`Person not found for id ${id}`);
  }
  console.log("after", people);
});
