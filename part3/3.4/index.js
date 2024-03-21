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
      "name": "Dan Abramov", 
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
