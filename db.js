const { faker } = require("@faker-js/faker");
const sqlite3 = require("sqlite3").verbose();
const fs = require("fs");

// Remove old database file (optional: comment out if you want persistent data)
if (fs.existsSync("./database.sqlite")) {
    fs.unlinkSync("./database.sqlite");
}

const db = new sqlite3.Database("./database.sqlite", (err) => {
    if (err) {
        console.error("Database connection error:", err);
    } else {
        console.log("✅ Connected to SQLite database");
    }
});

// Function to create tables dynamically
const createTables = () => {
    db.serialize(() => {
        console.log("🔄 Setting up database schema...");

        // Users Table
        db.run(`
            CREATE TABLE IF NOT EXISTS users (
                id INTEGER PRIMARY KEY AUTOINCREMENT,
                username TEXT UNIQUE NOT NULL,
                email TEXT UNIQUE NOT NULL
            )
        `);

        // Items Table
        db.run(`
            CREATE TABLE IF NOT EXISTS items (
                id INTEGER PRIMARY KEY AUTOINCREMENT,
                name TEXT,
                description TEXT,
                imageLinks TEXT
            )
        `);

        // Auctions Table (Linked to Users & Items)
        db.run(`
            CREATE TABLE IF NOT EXISTS auctions (
                id INTEGER PRIMARY KEY AUTOINCREMENT,
                itemId INTEGER,
                startTime TEXT,
                endTime TEXT,
                creatorId INTEGER,
                startingPrice REAL,
                status TEXT DEFAULT 'active',
                FOREIGN KEY (creatorId) REFERENCES users(id),
                FOREIGN KEY (itemId) REFERENCES items(id)
            )
        `);
    });
};

// Function to generate mock data
const seedDatabase = () => {
    console.log("✨ Seeding database with mock data...");

    // Create 5 users
    for (let i = 0; i < 5; i++) {
        const username = faker.internet.username();
        const email = faker.internet.email();
        db.run("INSERT INTO users (username, email) VALUES (?, ?)", [username, email]);
    }
    // Create 5 items
    for (let i = 0; i < 5; i++) {
        const name = faker.commerce.productName();
        const description = faker.commerce.productDescription();
        const imageLinks = faker.image.url();
        db.run("INSERT INTO items (name, description, imageLinks) VALUES (?, ?, ?)", [name, description, imageLinks]);
    }
    // Create 5 auctions
    for (let i = 0; i < 5; i++) {
        const itemId = Math.floor(Math.random() * 5) + 1;
        const creatorId = Math.floor(Math.random() * 5) + 1;
        const startTime = faker.date.future().toISOString();
        const endTime = faker.date.future().toISOString();
        const startingPrice = faker.commerce.price(50, 1000, 2);
        const status = faker.helpers.arrayElement(["active", "closed"]);

        db.run("INSERT INTO auctions (itemId, startTime, endTime, creatorId, startingPrice, status) VALUES (?, ?, ?, ?, ?, ?)",
            [itemId, startTime, endTime, creatorId, startingPrice, status]);
    }

    console.log("✅ Database seeding complete!");
};

// Run setup functions
db.serialize(() => {
    createTables();
    seedDatabase();
});

module.exports = db;