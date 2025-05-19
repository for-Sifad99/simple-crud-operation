const express = require('express');
const { MongoClient, ServerApiVersion, ObjectId } = require('mongodb');
const cors = require('cors');
const app = express();
const port = process.env.PORT || 3002;

// Middleware :
app.use(cors());
app.use(express.json());

//TODO MongoDB connection :
//  User -> simpleDBUser
//  Password -> zLgAiuxW70hXAgIE

//  Here the URI :
const uri = 'mongodb+srv://simpleDBUser:zLgAiuxW70hXAgIE@cluster0.q1etiuc.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0';

// Create a MongoClient :
const client = new MongoClient(uri, {
    serverApi: {
        version: ServerApiVersion.v1,
        strict: true,
        deprecationErrors: true,
    }
});

async function run() {
    try {
        // Connect the client to the server.
        await client.connect();

        // Connect to the "userDB" database and access its "users" collection.
        const userCollection = client.db('userDB').collection('users');

        // CRUD operations for the "users" collection:
        // 1. Read all users:
        // (Read all users from the "users" collection)
        app.get('/users', async (req, res) => {
            // Find all users in the "users" collection.
            const cursor = userCollection.find();
            // Convert the cursor to an array and send it as a response.
            const result = await cursor.toArray();
            res.send(result);
        });

        // 2. Read Specific One users:
        // (Read a specific user by ID from the "users" collection)
        app.get('/users/:id', async (req, res) => {
            const id = req.params.id;

            // Convert the string ID to an ObjectId.
            const query = { _id: new ObjectId(id) };
            // Find the user with the specified ID in the "users" collection.
            const result = await userCollection.findOne(query);
            res.send(result);
        });

        // 3. Update a user:
        // (Update a user in the "users" collection)
        app.put('/users/:id', async (req, res) => {
            const id = req.params.id;
            const updatedUser = req.body;
            console.log(updatedUser);

            // Convert the string ID to an ObjectId.
            const filter = { _id: new ObjectId(id) };
            // Define the update operation(Optional).
            const options = ({ upsert: true });
            // Define the update document.
            const updateDoc = {
                $set: {
                    name: updatedUser.name,
                    email: updatedUser.email,
                }
            }

            // Update the user with the specified ID in the "users" collection.
            const result = await userCollection.updateOne(filter, updateDoc, options);
            res.send(result);
        });

        // 4. insert a new user:
        // (Create a new user in the "users" collection)
        app.post('/users', async (req, res) => {
            const newUser = req.body;

            // Insert the defined document into the "users" collection.
            const result = await userCollection.insertOne(newUser);
            res.send(result);
        });

        // 5.  Delete a user:
        // (Delete a user from the "users" collection)
        app.delete('/users/:id', async (req, res) => {
            const id = req.params.id;

            // Convert the string ID to an ObjectId.
            const query = { _id: new ObjectId(id) };
            // Delete the document with the specified ID from the "users" collection.
            const result = await userCollection.deleteOne(query);
            res.send(result);
        });

        // Send a ping to confirm a successful connection.
        await client.db("admin").command({ ping: 1 });
        console.log("Pinged your deployment. You successfully connected to MongoDB!");
    }
    finally { };
};
run().catch(console.dir);

app.get('/', (req, res) => {
    res.send('This is Crud Operation server.');
});

app.listen(port, () => {
    console.log('This server is running on', port);
})