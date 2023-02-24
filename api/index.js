import express from "express";
import cookieParser from "cookie-parser";
import dotenv from "dotenv";
import mongoose from "mongoose";
import cors from "cors";
import path from "path";
import { fileURLToPath } from "url";
import helmet from "helmet";

import authRoute from "./routes/auth.js";
import organizationRoute from "./routes/organizations.js";
import courseRoute from "./routes/courses.js";

const __filename = fileURLToPath(import.meta.url);

const __dirname = path.dirname(__filename);
dotenv.config();

const app = express();
app.use(helmet());

const port = process.env.PORT || 8080;
mongoose.set("strictQuery", true);
const connect = async () => {
  try {
    await mongoose
      .connect("mongodb://Nidhish:gofVgBxqPi9JOIqm@ac-lrjqvdq-shard-00-00.nuz1fzr.mongodb.net:27017,ac-lrjqvdq-shard-00-01.nuz1fzr.mongodb.net:27017,ac-lrjqvdq-shard-00-02.nuz1fzr.mongodb.net:27017/courses?ssl=true&replicaSet=atlas-3p4oc5-shard-0&authSource=admin&retryWrites=true&w=majority", {
        useNewUrlParser: true,
        useUnifiedTopology: true,
      })
      .then(() => console.log("connected"))
      .catch((err) => console.log(err));
  } catch (error) {
    console.log(error);
  }
};
// mongoose.connect(
//   process.env.URI,
//   { useNewUrlParser: true, useUnifiedTopology: true, useCreateIndex: true },
//   () => console.log("connected to mongo")
// );

app.use(cookieParser());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors());

app.use("/api/auth", authRoute);
app.use("/api/organization", organizationRoute);
app.use("/api/course", courseRoute);

app.use((err, req, res, next) => {
  const status = err.status || 500;
  const message = err.message || "Something went wrong!";
  return res.status(status).json({
    success: false,
    status,
    message,
  });
});

app.listen(port, () => {
  connect();
  console.log("Server listening on port http://localhost:" + port);
});
