const express = require("express");
const cors = require("cors");
require("dotenv").config();
const app = express();
const port = process.env.PORT || 5000;

app.use(express.json());

app.use(cors());

const { MongoClient, ServerApiVersion } = require("mongodb");
const uri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASS}@cluster0.xsh8x1y.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0`;

// Create a MongoClient with a MongoClientOptions object to set the Stable API version
const client = new MongoClient(uri, {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true,
  },
});

async function run() {
  try {
    const db = client.db(myProjects);

    const skills = db.collection(skill);
    const projects = db.collection(project);
    const experience = db.collection(skill);
    const blogs = db.collection(skill);

    app.post("/skill", async (req, res) => {
      const skill = req.body;
      const result = await skills.insertOne(skill);
      res.send(result);
    });
    app.post("/project", async (req, res) => {
      const project = req.body;
      const result = await projects.insertOne(project);
      res.send(result);
    });
    app.post("/experience", async (req, res) => {
      const experience = req.body;
      const result = await experience.insertOne(experience);
      res.send(result);
    });
    app.post("/blog", async (req, res) => {
      const blog = req.body;
      const result = await blogs.insertOne(blog);
      res.send(result);
    });

    // await client.connect();
    // Send a ping to confirm a successful connection
    await client.db("admin").command({ ping: 1 });
    console.log(
      "Pinged your deployment. You successfully connected to MongoDB!"
    );
  } finally {
    // Ensures that the client will close when you finish/error
    await client.close();
  }
}
run().catch(console.dir);

app.get("/", (req, res) => {
  res.send("Hello World!");
});
app.listen(port, () => {
  console.log(`web portfolio server is Running on port ${port}`);
});
