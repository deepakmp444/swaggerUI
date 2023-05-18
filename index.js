import express from "express";
import { userRoute } from "./route/userRouter.js";
import cors from "cors";
import swaggerUi from "swagger-ui-express";
import fs from "fs";
import YAML from "yaml";

// import swaggerDocument from './swagger.json' assert { type: 'json' };


const file = fs.readFileSync("./swagger.yaml", "utf8");
const swaggerDocument = YAML.parse(file);


const app = express();

const options = {
  swaggerOptions: {
    validatorUrl: null
  }
};

app.use(
  cors({
    credentials: true,
    origin: ["http://localhost:3000", "http://localhost:3001"],
  })
);
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument, options));

app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerDocument));

app.use("/api/", userRoute);


app.get("/admin/api/v1", (req, res) => {
  const q1 = req.query.q1;
  const q2 = req.query.q2;

  res.status(200).json({
    q1,
    q2,
  });
});

// Stop crashing
process.on("uncaughtException", function (err) {
  console.error(err);
  console.log("Node NOT Exiting...");
});

const PORT = process.env.PORT || 5001;
app.listen(PORT, () => {
  console.log("Server Runing on", PORT);
});
