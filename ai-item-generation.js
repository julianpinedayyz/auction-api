const axios = require("axios");
require("dotenv").config();

const OPENAI_API_KEY = process.env.OPENAI_API_KEY;
const UNSPLASH_API_KEY = process.env.UNSPLASH_API_KEY;

// Function to generate a product name (1 word, no adjectives) and description
async function generateProductDetails() {
    try {
        const response = await axios.post(
            "https://api.openai.com/v1/chat/completions",
            {
                model: "gpt-4",
                messages: [
                    {
                        role: "system",
                        content: "Generate a product name (only 1 noun, no adjectives) and a short product description for an auction."
                    },
                    {
                        role: "user",
                        content: "Provide a product name and description in this format:\n\nName: [Single Noun]\nDescription: [Product Description]"
                    }
                ],
                temperature: 0.7,
            },
            {
                headers: {
                    "Authorization": `Bearer ${OPENAI_API_KEY}`,
                    "Content-Type": "application/json"
                }
            }
        );

        // Extract the name & description
        const responseText = response.data.choices[0].message.content;
        const nameMatch = responseText.match(/Name: (\w+)/);
        const descMatch = responseText.match(/Description: (.*)/);

        const name = nameMatch ? nameMatch[1] : "Item";
        const description = descMatch ? descMatch[1] : "No description available.";

        return { name, description };
    } catch (error) {
        console.error("❌ OpenAI Error:", error.response ? error.response.data : error.message);
        return {
            name: "Item",
            description: "A high-quality product available for auction."
        };
    }
}

// Function to fetch an image from Unsplash based on the single-word product name
async function fetchUnsplashImage(query) {
    try {
        console.log(`🔎 Searching Unsplash for: ${query}`);
        const response = await axios.get(
            `https://api.unsplash.com/photos/random?query=${encodeURIComponent(query)}&client_id=${UNSPLASH_API_KEY}`
        );
        return response.data.urls.regular;
    } catch (error) {
        console.error("❌ Unsplash Error:", error.response ? error.response.data : error.message);
        return "https://via.placeholder.com/400"; // Fallback placeholder
    }
}

// Main function to generate the product details and fetch an image
async function generateTestProduct() {
    const { name, description } = await generateProductDetails();
    const imageLinks = await fetchUnsplashImage(name);

    const product = { name, description, imageLinks };
    console.log(JSON.stringify(product, null, 2));
}

// Run the test
generateTestProduct();