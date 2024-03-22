"use strict"

// setup
const 
PORT=3001,
express = require("express"),
app = express(),
morgan = require("morgan"),
cors = require("cors");

app.use(express.json());
app.use(express.static("build"));

morgan.token("body", request => JSON.stringify(request.body));
morgan.format("tinyPlus", ":method :url :status :res[content-length] - :response-time ms :body");
app.use(morgan("tinyPlus"));
app.use(cors());

app.listen(PORT, () => { console.log("Server running on port 3001"); });


// routes
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

app.post("/api/persons", (request, response) => {
  const name = request.body.name;
  const number = request.body.number;
  if (!name) {
    response.status(400).send("Name is required");
  } else if (!number) {
    response.status(400).send("Number is required");
  } else if (nameAlreadyExists(name)) {
      response.status(400).send("Name already exists");
  } else if (numberAlreadyExists(number)) {
      response.status(400).send("Number already exists");
  } else {
    const newPerson = {
      "name": name, 
      "number": number,
      id: generateId()
    };
    people = people.concat(newPerson);
    response.json(newPerson);
  }
});

app.delete("/api/persons/:id", (request, response) => {
  const id = Number(request.params.id);
  const person = people.find(person => person.id === id);
  if (person) {
    people = people.filter(person => person.id !== id);
    response.status(204).send(`The peson with id ${id} has been deleted`);
  } else {
    response.status(404).send(`Person not found for id ${id}`);
  }
});

app.use(unknownEndpoint);

// helpers
const 
nameAlreadyExists = name => people.find(person => person.name === name), 
numberAlreadyExists = number =>  people.find(person => person.number === number),
generateId = () => {
  const maxId = Math.max(...people.map(person => person.id));
  const id = maxId + Math.ceil(Math.random() * 10);
  return id;
};

// middleware
function unknownEndpoint (request, response) {
  response.status(404).send({ error: 'unknown endpoint' })
}

// data
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
