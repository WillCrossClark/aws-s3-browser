import "reflect-metadata"; // Needed for typedi
import express, { Express } from "express";
import s3Router from "./routes/s3Router";

const app: Express = express();

// Middleware to parse JSON bodies
app.use(express.json());

app.use("/api/v1", s3Router.createRouter());

export default app;
