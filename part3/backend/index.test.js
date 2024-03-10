const supertest = require('supertest');
const baseUrl = 'http://localhost:3001';
const request = supertest(baseUrl);

describe('GET /', () => {
	it('returns 200 OK', async () => {
		const response = await request.get('/'); expect(response.status).toBe(200);
	});
});	

describe("GET /api/info", () => {
	it("returns 200 OK", async () => {
		const response = await request.get("/api/info");
		const text = expect(response.text);

		status = expect(response.status).toBe(200);
		text.toContain("Phonebook has info for ")
		text.toContain("GMT");
	});

	it("returns the current date", async () => {
		const response = await request.get("/api/info");
		expect(response.text).toContain(new Date().toDateString());
	});
})

describe("GET /api/persons", () => {
	it("returns 200 OK", async () => {
		const response = await request.get("/api/persons");
		expect(response.status).toBe(200);
	});

	it("returns the people in the directory", async () => {
		const response = await request.get("/api/persons");
		expect(response.body).toContainEqual({ 
			"id": 1,
			"name": "Arto Hellas", 
			"number": "040-123456"
		});
	});
});

describe("GET /api/persons/:id", () => {
	it("returns 200 OK", async () => {
		const response = await request.get("/api/persons/1");
		expect(response.status).toBe(200);
	});

	it("returns the person with the id", async () => {
		const response = await request.get("/api/persons/1");
		expect(response.body).toEqual({ 
			"id": 1,
			"name": "Arto Hellas", 
			"number": "040-123456"
		});
	});

	it("returns 404 if the id does not exist", async () => {
		const response = await request.get("/api/persons/5");
		expect(response.status).toBe(404);
	});
});

// note this will only run once, if run twices it will fail
describe("DELETE /api/persons/:id", () => {
	it("returns 200 OK", async () => {
		const response = await request.delete("/api/persons/1");
		const text = expect(response.text);
		expect(response.status).toBe(200);
		text.toContain("The person with id 1 has been removed from the directory");
		text.not.toContain("Arto Hellas");
	});
	
	it("return 404 if the id does not exist", async () => {
		const response = await request.delete("/api/persons/5");
		expect(response.status).toBe(404);
	});

});	

describe("POST /api/persons", () => {
	it("returns 200 OK", async () => {
		const newPerson = { 
			"name": "Dinesh Signh",
			"number": "31-43-4434"
		};
		const response = await request.post("/api/persons").send(newPerson);
		expect(response.status).toBe(200);
	});

	it("should return 400 Bad Request if missing name or number", async () => {
		const response = await request
			.post("/api/persons")
			.send({ "name": "Hawthort" });
		expect(response.status).toBe(400);
	});
});

