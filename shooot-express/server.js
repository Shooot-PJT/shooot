const express = require("express");
const cors = require("cors");
require("dotenv").config();

const projectsRoutes = require("./routes/projectsRoutes");
const errorHandler = require("./middleware/errorHandler");

const app = express();
const port = process.env.EXPRESS_PORT;

app.use(cors());
app.use(express.json());

app.use("/projects", projectsRoutes);
app.use(errorHandler);

app.listen(port, () => {
    console.log(`Express server running on http://localhost:${port}`);
});
