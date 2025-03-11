require("dotenv").config();
const express = require("express");
const cors = require("cors");
const db = require("./db");

const app = express();
const PORT = process.env.PORT || 3001;

app.use(cors());
app.use(express.json());

// Get all auctions
app.get("/auctions", (req, res) => {
    db.all("SELECT * FROM auctions", [], (err, rows) => {
        if (err) {
            res.status(500).json({ error: err.message });
        } else {
            res.json(rows, null, 2);
        }
    });
});

// Create a new user
app.post("/users", (req, res) => {
    const { username, email } = req.body;

    if (!username || !email) {
        return res.status(400).json({ error: "Username and email are required" });
    }

    db.run(
        "INSERT INTO users (username, email) VALUES (?, ?)",
        [username, email],
        function (err) {
            if (err) {
                return res.status(500).json({ error: err.message });
            }
            res.json({ id: this.lastID, username, email });
        }
    );
});
// Get all user
app.get("/users", (req, res) => {
    db.all("SELECT * FROM users", [], (err, rows) => {
        if (err) {
            res.status(500).json({ error: err.message });
        } else {
            res.json(rows);
        }
    });
});
// Get a Specific User
app.get("/users/:id", (req, res) => {
    const userId = parseInt(req.params.id, 10);
    db.get("SELECT * FROM users WHERE id = ?", [userId], (err, row) => {
        if (err) {
            res.status(500).json({ error: err.message });
        } else if (!row) {
            res.status(404).json({ error: "User not found" });
        } else {
            res.json(row);
        }
    });
});
// Create a new auction
app.post("/auctions", (req, res) => {
    const { itemId, startTime, endTime, creatorId, startingPrice } = req.body;

    if (!itemId || !startTime || !endTime || !creatorId || !startingPrice) {
        return res.status(400).json({ error: "All fields are required" });
    }

    // Check if user exists before creating auction
    db.get("SELECT * FROM users WHERE id = ?", [creatorId], (err, user) => {
        if (err) {
            return res.status(500).json({ error: err.message });
        }
        if (!user) {
            return res.status(404).json({ error: "User not found" });
        }

        // Insert new auction
        db.run(
            "INSERT INTO auctions (itemId, startTime, endTime, creatorId, startingPrice) VALUES (?, ?, ?, ?, ?)",
            [itemId, startTime, endTime, creatorId, startingPrice],
            function (err) {
                if (err) {
                    return res.status(500).json({ error: err.message });
                }
                res.json({ id: this.lastID });
            }
        );
    });
});
// Get a Specific Auction
app.get("/auctions/:id", (req, res) => {
    const auctionId = parseInt(req.params.id, 10);
    db.get("SELECT * FROM auctions WHERE id = ?", [auctionId], (err, row) => {
        if (err) {
            res.status(500).json({ error: err.message });
        } else if (!row) {
            res.status(404).json({ error: "Auction not found" });
        } else {
            res.json(row);
        }
    });
});
// Get all items
app.get("/items", (req, res) => {
    db.all("SELECT * FROM items", [], (err, rows) => {
        if (err) {
            res.status(500).json({ error: err.message });
        } else {
            res.json(rows);
        }
    });
});
// Get a Specific Item
app.get("/items/:id", (req, res) => {
    const itemId = parseInt(req.params.id, 10);

    db.get("SELECT * FROM items WHERE id = ?", [itemId], (err, row) => {
        if (err) {
            res.status(500).json({ error: err.message });
        } else if (!row) {
            res.status(404).json({ error: "Item not found" });
        } else {
            res.json(row);
        }
    });
});
// Start the server
app.listen(PORT, () => {
    console.log(`Auction API is running on http://localhost:${PORT}`);
});
