const express = require("express");
const dbConnect = require("./config/dbConnect");
const app = express();
const dotenv = require("dotenv").config();

const authRouter = require("./routes/authRoute");
const incidentRoute = require("./routes/incidentRoute");

const bodyParser = require("body-parser");
const { notFound, errorHandlor } = require("./middlewares/errorHandlor");
const PORT = process.env.PORT || 4000;
const cookieParser = require("cookie-parser");
const morgan = require("morgan");
dbConnect();

app.use(morgan("dev"));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

app.use("/api/user", authRouter);
app.use("/api/incident", incidentRoute);

app.use(cookieParser());

app.use(notFound);
app.use(errorHandlor);

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
