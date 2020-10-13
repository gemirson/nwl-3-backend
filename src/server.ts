import express from "express";
import routes from "./routes";
import cors from "cors";
const app = express();

import "./database/connection";

app.use(cors());
app.use(express.json());
app.use(routes);

app.listen(3434, () => {
  console.log("[Server]", "Server running");
});
