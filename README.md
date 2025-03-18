# Recipe Management API

This project is a simple RESTful API built with Node.js, Express.js, and Mongoose for managing recipes. It provides basic CRUD (Create, Read, Update, Delete) operations to store and retrieve recipe information in a MongoDB database.

## Technologies Used

* **Node.js:** JavaScript runtime environment.
* **Express.js:** A minimal and flexible Node.js web application framework.
* **Mongoose:** An Object Data Modeling (ODM) library for MongoDB and Node.js.
* **dotenv:** A zero-dependency module that loads environment variables from a `.env` file into `process.env`.
* **cors:** A Node.js package for providing a Connect/Express middleware that can be used to enable CORS (Cross-Origin Resource Sharing).

## Functionalities

The API provides the following functionalities:

* **Create Recipe (POST /recipe):** Adds a new recipe to the database.
* **Get All Recipes (GET /recipes):** Retrieves a list of all recipes.
* **Get Recipe by ID (GET /recipe/:id):** Retrieves a specific recipe based on its unique ID.
* **Update Recipe (PUT /recipe/:id):** Updates an existing recipe identified by its ID.
* **Delete Recipe (DELETE /recipe/:id):** Deletes a recipe from the database based on its ID.

## Base URL

The base URL for this API is: `https://kaz-recipes-app.onrender.com`

## API Endpoints 📡

| Method | Endpoint      | Description              | Example Request                                  |
| :----- | :------------ | :----------------------- | :----------------------------------------------- |
| POST   | `/recipe`     | Create new recipe        | `POST https://kaz-recipes-app.onrender.com/recipe` |
| GET    | `/recipes`    | Get all recipes          | `GET https://kaz-recipes-app.onrender.com/recipes` |
| GET    | `/recipe/:id` | Get single recipe by ID  | `GET https://kaz-recipes-app.onrender.com/recipe/67d8ee64da02cc9c871311d3` |
| PUT    | `/recipe/:id` | Update recipe by ID      | `PUT https://kaz-recipes-app.onrender.com/recipe/67d8ee64da02cc9c871311d3` |
| DELETE | `/recipe/:id` | Delete recipe by ID      | `DELETE https://kaz-recipes-app.onrender.com/recipe/67d902cef2f4bd311c6eed12` |

## Usage

You can use tools like Postman, `curl`, or any HTTP client to interact with the API endpoints. Detailed documentation with sample requests and responses can be found in the Postman collection provided separately.

## Deployment

This application is designed to be deployed on platforms like Render. You can connect your GitHub repository to Render and configure the necessary environment variables (like the MongoDB connection string) for deployment.

## Author

Karthikeyan N
