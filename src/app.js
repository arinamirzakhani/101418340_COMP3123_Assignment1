const express = require("express");
const morgan  = require("morgan");

const userRoutes = require("./routes/user.routes");
const empRoutes  = require("./routes/employee.routes");

const app = express();
app.use(express.json());
app.use(morgan("dev"));

app.get("/", (_req, res) => res.json({ message: "API up" }));

app.use("/api/v1/user", userRoutes);
app.use("/api/v1/emp",  empRoutes);

app.use((req, res) => res.status(404).json({ status:false, message:"Not Found" }));
module.exports = app;
