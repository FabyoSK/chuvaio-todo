import express from "express";
import cors from "cors";

import routes from "./routes";

const app = express();

app.use(cors());
app.use(express.json());
app.use(routes);

// the Server will listen on the port 3333
app.listen(3333);
