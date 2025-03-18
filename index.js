const express = require("express");
const app = express();
const cors = require("cors");
const mongoose = require("mongoose");
const dotenv = require("dotenv").config();

const URL = process.env.DB || "mongodb://127.0.0.1:27017/fsd13";

mongoose.connect(URL);
console.log("Connected to Mongoose Atlas");

const recipeSchema = new mongoose.Schema({
    title: { type: String, required: true },
    ingredients: { type: [String], required: true },
    instructions: { type: String, required: true },
    cookingTime: { type: Number, required: true }
});
const Recipe = mongoose.model('Recipe', recipeSchema);

app.use(express.json());
app.use(cors({
    origin: "*"
}));


//createRecipe: Create a new recipe.
app.post('/recipe', async (req, res) => {
    try {
        await Recipe.create(req.body);
        res.status(201).json({ Message: "Recipe added successfully", recipe: req.body });
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
});


//getAllRecipes: Retrieve all recipes.
app.get('/recipes', async (req, res) => {
    try {
        let recipes = await Recipe.find();
        res.json(recipes);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});


//getRecipeById: Retrieve a single recipe by ID.
app.get('/recipe/:id', async (req, res) => {
    try {
        let recipe = await Recipe.findById(req.params.id);
        if (!recipe) return res.status(404).json({ error: 'Recipe not found' });
        res.json(recipe);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});


//updateRecipe: Update a recipe by ID.
app.put('/recipe/:id', async (req, res) => {
    try {
        let recipe = await Recipe.findByIdAndUpdate(req.params.id, req.body);
        if (!recipe) return res.status(404).json({ error: 'Recipe not found' });
        res.json({ Message: "Product Updated successfully" , recipe });
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
});


//deleteRecipe: Delete a recipe by ID.
app.delete('/recipe/:id', async (req, res) => {
    try {
        const recipe = await Recipe.findByIdAndDelete(req.params.id);
        if (!recipe) return res.status(404).json({ message: 'Recipe not found' });
        res.json({ message: 'Recipe deleted successfully', recipe });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

app.listen(3002)