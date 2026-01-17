import express from "express";
import type { Express } from "express";
import router from "./routes/routes.js";
import cors from "cors";

const app : Express= express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(cors());

app.use("/api/v1", router);

export { app }