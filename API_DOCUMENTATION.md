# Auction API Documentation

## Overview
This document provides information about the Auction API endpoints and how to access the interactive API documentation.

## Accessing the API Documentation
The API is documented using OpenAPI (Swagger) specification. You can view the interactive documentation by:

1. Starting the server: `node server.js`
2. Navigating to: `http://localhost:3001/api-docs`

## Available Endpoints

### Users
- `GET /users` - Get all users
- `GET /users/{id}` - Get a specific user by ID
- `POST /users` - Create a new user

### Items
- `GET /items` - Get all items
- `GET /items/{id}` - Get a specific item by ID
- `POST /items` - Create a new item

### Auctions
- `GET /auctions` - Get all auctions
- `GET /auctions/{id}` - Get a specific auction by ID
- `POST /auctions` - Create a new auction

## Example Usage

### Creating a new user
```bash
curl -X POST http://localhost:3001/users \
  -H "Content-Type: application/json" \
  -d '{"username": "johndoe", "email": "john@example.com"}'
```

### Getting all auctions
```bash
curl -X GET http://localhost:3001/auctions
```