"use strict";

const express = require("express");
const app = express();
const morgan = require("morgan");
const PORT = 3001

// set up logging
// define a new morgan token.
// create a new format that contains the tokens from the "tiny" format plus the new "body" token.
morgan.token("body", function (request, response) { return JSON.stringify(request.body); });
morgan.format("tinyWithRequestBody", ":method :url :status :res[content-length] - :response-time ms :body");

app.use(express.json());
app.use(morgan("tinyWithRequestBody"));




app.listen(PORT, () => {
	console.log(`Server running on port ${PORT}`);
});

var people = [
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

app.get("/", (request, response) => {
	response.send("<h1>Welcome to the Diretory</h1>");
});

app.get("/api/info", (request, response) => {
	response.send(
		`<p>Phonebook has info for ${people.length} people</p><p>${new Date()}`
	);
});

app.get("/api/persons", (request, response) => {
	response.json(people);
});

app.get("/api/persons/:id", (request, response) => {
	const id = request.params.id;
	const number = people.find( number => number.id == id);
	if (number) { 
		response.json(number);
	} else {
		response.status(404).send(`<h1>No number with id ${id} found in directory.</h1>`);
	}
});

app.delete("/api/persons/:id", (request, response) => {
  const id = request.params.id;
	const updatedPeople = people.filter(person => person.id != id);
	if (updatedPeople.length === people.length - 1) {
		response.status(200).send(`The person with id ${id} has been removed from the directory`);
		people = updatedPeople;
	} else {
		response.status(404).send(`No change has been made since there is o person with id ${id}`);
	}
});

app.post("/api/persons", (request, response) => {
	const newPerson = request.body;
	if(newPerson.name && newPerson.number){
		if(people.find(person => person.name === newPerson.name)){
			return response.status(400).send(`The name "${newPerson.name}" already exists in the directory.`);
		}
		const id = Math.floor(Math.random() * 100) + people.length;
		newPerson.id = id;
		people = people.concat(newPerson);
	  response.status(200).end();
	} else {
     response.status(400).send(`The record you submitted is not in the correct form. ${newPerson} needs both a name and a numer`);
	}
});

const unknownEndpoint = (request, response) => {
  response.status(404).send({ error: "unknown endpoint" })
}

app.use(unknownEndpoint)

