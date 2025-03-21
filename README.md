# Auction API

A RESTful API built with Node.js, Express, and SQLite for managing an online auction system.

## Features

- User management (create, read)
- Item management (create, read)
- Auction management (create, read)
- Automatic database seeding with faker.js
- SQLite database for data persistence
- CORS enabled
- Environment variable support

## Prerequisites

- Node.js (v23.9.0)
- npm (comes with Node.js)

## Installation

1. Clone the repository
2. Install dependencies:
```bash
npm install
```
3. Create a `.env` file in the root directory (optional):
```bash
PORT=3001
```

## API Documentation

The API is documented using OpenAPI (Swagger) specification. You can view the interactive documentation by:

1. Starting the server: `node server.js`
2. Navigating to: `http://localhost:3001/api-docs`

Alternatively, you can view the raw OpenAPI specification in the `swagger.json` file.

## Development

The project includes automatic database seeding with mock data using faker.js. The database is reset on each server start (this can be disabled by commenting out the relevant code in `db.js`).

To start the server:
```bash
node server.js
```

The API will be available at `http://localhost:3001` (or the port specified in your .env file).

## Database Schema

### Users Table
- id (INTEGER, Primary Key)
- username (TEXT, Unique)
- email (TEXT, Unique)

### Items Table
- id (INTEGER, Primary Key)
- name (TEXT)
- description (TEXT)
- imageLinks (TEXT)

### Auctions Table
- id (INTEGER, Primary Key)
- itemId (INTEGER, Foreign Key)
- startTime (TEXT)
- endTime (TEXT)
- creatorId (INTEGER, Foreign Key)
- startingPrice (REAL)
- status (TEXT, Default: 'active')

## Dependencies

- express: Web framework
- sqlite3: Database driver
- @faker-js/faker: Mock data generation
- cors: Cross-Origin Resource Sharing
- dotenv: Environment variable management
- swagger-ui-express: Swagger UI integration
- swagger-jsdoc: Generate OpenAPI specs from JSDoc comments

## Project Structure

```
.
├── server.js        # Main application file
├── db.js            # Database configuration and seeding
├── swagger.json     # OpenAPI specification
├── .env             # Environment variables (create this)
├── .gitignore       # Git ignore file
├── package.json     # Project metadata and dependencies
└── README.md        # Project documentation
```

## Notes

- The database file (`database.sqlite`) is automatically created when the server starts
- The database is reset and reseeded with mock data on each server start
