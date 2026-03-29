# Cute Quotes API

A small and cute REST API for managing motivational quotes, built with Node.js and Express.

## Features

- Full CRUD operations for quotes
- Input validation with `express-validator`
- Data persistence via a local JSON file (`quotes.json`)
- Interactive API docs via Swagger UI

## Tech Stack

- **Runtime:** Node.js
- **Framework:** Express 5
- **Validation:** express-validator
- **Docs:** swagger-ui-express + YAML

## Project Structure

```
cute-quotes-api/
├── server.js               # Entry point
├── quotes.json             # Data store
├── openapi.yaml            # OpenAPI 3.0 spec
└── src/
    ├── controllers/        # Request/response handling
    ├── routes/             # Route definitions
    ├── services/           # Business logic & file I/O
    └── validators/         # Input validation rules
```

## Getting Started

### Prerequisites

- Node.js (v18+ recommended)

### Installation

```bash
git clone <your-repo-url>
cd cute-quotes-api
npm install
```

### Run

```bash
npm start
```

Server runs at `http://localhost:3000`
Swagger docs at `http://localhost:3000/api-docs`

## API Endpoints

| Method | Endpoint       | Description         |
|--------|----------------|---------------------|
| GET    | `/quotes`      | Get all quotes      |
| GET    | `/quotes/:id`  | Get a quote by ID   |
| POST   | `/quotes`      | Create a new quote  |
| PUT    | `/quotes/:id`  | Update a quote      |
| DELETE | `/quotes/:id`  | Delete a quote      |

### Quote Object

```json
{
  "id": 1,
  "text": "Stay pawsitive.",
  "author": "Cat"
}
```

### Create / Update — Request Body

```json
{
  "text": "Believe in yourself.",
  "author": "Fox"
}
```

**Validation rules:**
- `text` — required string, minimum 3 characters
- `author` — required string, minimum 2 characters

### Example Responses

**GET /quotes**
```json
[
  { "id": 1, "text": "Stay pawsitive.", "author": "Cat" },
  { "id": 5, "text": "Never give up.", "author": "Wolf" }
]
```

**POST /quotes** → `201 Created`
```json
{ "id": 9, "text": "Believe in yourself.", "author": "Fox" }
```

**PUT /quotes/1** → `200 OK`
```json
{
  "message": "Quote updated successfully",
  "updatedQuote": { "id": 1, "text": "New text.", "author": "Cat" }
}
```

**DELETE /quotes/1** → `200 OK`
```json
{
  "message": "Quote deleted successfully",
  "deletedQuote": { "id": 1, "text": "Stay pawsitive.", "author": "Cat" }
}
```

### Error Responses

| Status | Meaning                        |
|--------|--------------------------------|
| 400    | Validation failed              |
| 404    | Quote not found                |

## License

ISC
