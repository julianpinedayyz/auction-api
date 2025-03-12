# Auction API

A RESTful API built with Node.js, Express, and SQLite for managing an online auction system. The API handles users, items, and auctions with automatic database seeding for development.

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

## API Endpoints

### Users
- `GET /users` - Get all users
- `GET /users/:id` - Get a specific user
- `POST /users` - Create a new user
  ```json
  {
    "username": "string",
    "email": "string"
  }
  ```

### Items
- `GET /items` - Get all items
- `GET /items/:id` - Get a specific item
- `POST /items` - Create a new item
  ```json
  {
    "name": "string",
    "description": "string",
    "imageLinks": "string"
  }
  ```

### Auctions
- `GET /auctions` - Get all auctions
- `GET /auctions/:id` - Get a specific auction
- `POST /auctions` - Create a new auction
  ```json
  {
    "itemId": "number",
    "startTime": "string",
    "endTime": "string",
    "creatorId": "number",
    "startingPrice": "number"
  }
  ```

## Development

The project includes automatic database seeding with mock data using faker.js. The database is reset on each server start (this can be disabled by commenting out the relevant code in `db.js`).

To start the server:
```bash
node server.js
```

The API will be available at `http://localhost:3001` (or the port specified in your .env file).

## Dependencies

- express: Web framework
- sqlite3: Database driver
- @faker-js/faker: Mock data generation
- cors: Cross-Origin Resource Sharing
- dotenv: Environment variable management

## Project Structure

```
.
├── server.js        # Main application file
├── db.js           # Database configuration and seeding
├── .env            # Environment variables (create this)
├── .gitignore      # Git ignore file
├── package.json    # Project metadata and dependencies
└── README.md       # Project documentation
```

## Notes

- The database file (`database.sqlite`) is automatically created when the server starts
- The database is reset and reseeded with mock data on each server start
- All endpoints return JSON responses
- Error handling is implemented for all endpoints