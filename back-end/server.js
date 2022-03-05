const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");

require("dotenv").config({ path: "./.env" });

const app = express();
const port = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());

const uri = process.env.MONGO_URI;
mongoose.connect(uri, (error) => {
	if (error) {
		throw error;
	}
});

const connection = mongoose.connection;
connection.once("open", () => {
	console.log("MongoDB database connection established successfully");
});

const workspacesRouter = require("./persistence/workspaces");
const textsRouter = require("./persistence/texts");
const accountsRouter = require("./persistence/accounts");

app.use("/workspaces", workspacesRouter);
app.use("/texts", textsRouter);
app.use("/accounts", accountsRouter);

app.listen(port, () => {
	console.log(`Server is running on port: ${port}`);
});

module.exports = app;