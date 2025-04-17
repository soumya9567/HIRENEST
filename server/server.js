import dotenv from "dotenv";
import express from "express";
import mongoConnect from "./mongooseConnect.js";
import cors from "cors";
import authRoute from "./routes/authRoute.js";
import { clerkWebhooks } from "./controllers/webhooks.js";

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
dotenv.config();

app.use(cors());

app.get('/', (req, res) => res.send("API is working"));
app.post("/webhooks", clerkWebhooks);

const port = process.env.PORT || 4000;

mongoConnect()
  .then(() => {
    app.listen(port, () => {
      console.log(`Server listening on port ${port}`);
    });
  })
  .catch(err => {
    console.error('Failed to connect to MongoDB:', err);
    process.exit(1); 
  });

