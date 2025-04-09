const express = require("express");
const app = express();
const cors = require("cors");
const mongoose = require("mongoose");
const dotenv = require("dotenv").config();

const URL = process.env.DB || "mongodb://127.0.0.1:27017/fszd13";

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

// Input validations
const validateCreateRecipe = (req, res, next) => {
    const { title, ingredients, instructions, cookingTime } = req.body;
  
    if (!title || title.length < 3 || title.length > 50) {
      return res.status(400).json({ error: "Invalid title" });
    }
  
    if (!ingredients || ingredients.length < 1 || ingredients.length > 10) {
      return res.status(400).json({ error: "Invalid ingredients" });
    }
  
    if (!instructions || instructions.length < 10 || instructions.length > 500) {
      return res.status(400).json({ error: "Invalid instructions" });
    }
  
    if (!cookingTime || cookingTime < 1 || cookingTime > 120) {
      return res.status(400).json({ error: "Invalid cooking time" });
    }
  
    next();
  };
  
  const validateGetRecipeById = (req, res, next) => {
    const id = req.params.id;
  
    if (!id || !/^[0-9a-fA-F]{24}$/.test(id)) {
      return res.status(400).json({ error: "Invalid ID" });
    }
  
    next();
  };
  
  const validateUpdateRecipe = (req, res, next) => {
    const id = req.params.id;
    const { title, ingredients, instructions, cookingTime } = req.body;
  
    if (!id || !/^[0-9a-fA-F]{24}$/.test(id)) {
      return res.status(400).json({ error: "Invalid ID" });
    }
  
    if (title && (title.length < 3 || title.length > 50)) {
      return res.status(400).json({ error: "Invalid title" });
    }
  
    if (ingredients && (ingredients.length < 1 || ingredients.length > 10)) {
      return res.status(400).json({ error: "Invalid ingredients" });
    }
  
    if (instructions && (instructions.length < 10 || instructions.length > 500)) {
      return res.status(400).json({ error: "Invalid instructions" });
    }
  
    if (cookingTime && (cookingTime < 1 || cookingTime > 120)) {
      return res.status(400).json({ error: "Invalid cooking time" });
    }
  
    next();
  };
  
  const validateDeleteRecipe = (req, res, next) => {
    const id = req.params.id;
  
    if (!id || !/^[0-9a-fA-F]{24}$/.test(id)) {
      return res.status(400).json({ error: "Invalid ID" });
    }
  
    next();
  };


//createRecipe: Create a new recipe.
app.post('/recipe', validateCreateRecipe, async (req, res) => {
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
app.get('/recipe/:id', validateGetRecipeById, async (req, res) => {
    try {
        let recipe = await Recipe.findById(req.params.id);
        if (!recipe) return res.status(404).json({ error: "Recipe not found" });
        res.json(recipe);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});


//updateRecipe: Update a recipe by ID.
app.put('/recipe/:id', validateUpdateRecipe, async (req, res) => {
    try {
        let recipe = await Recipe.findByIdAndUpdate(req.params.id, req.body);
        if (!recipe) return res.status(404).json({ error: "Recipe not found" });
        res.json({ Message: "Recipe Updated successfully" , recipe });
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
});


//deleteRecipe: Delete a recipe by ID.
app.delete('/recipe/:id', validateDeleteRecipe, async (req, res) => {
    try {
        const recipe = await Recipe.findByIdAndDelete(req.params.id);
        if (!recipe) return res.status(404).json({ message: "Recipe not found" });
        res.json({ message: "Recipe deleted successfully", recipe });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

app.listen(3002)