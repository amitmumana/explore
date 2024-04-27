const express = require("express");
const mongoose = require("mongoose");
const user = require("./routes/user");
const cookieParser = require("cookie-parser");
const { requireAuth, checkUser } = require("./middleware/middleware");

const app = express();

// middleware
app.use(express.static("public"));
app.use(express.json());
app.use(cookieParser());

// view engine
app.set("view engine", "ejs");

// database connection
const dbURI = "mongodb://localhost:27017/smoothie";
mongoose
  .connect(dbURI, { useNewUrlParser: true, useUnifiedTopology: true, useCreateIndex: true })
  .then((result) => app.listen(9000, () => console.log("app listening to port 9000 ")))
  .catch((err) => console.log(err));

// routes
app.get("*", checkUser);
app.get("/", (req, res) => res.render("home"));
app.get("/smoothies", requireAuth, (req, res) => res.render("smoothies"));
app.use(user);

// // cookies
// app.get("/set-cookies", (req, res) => {
//   // res.setHeader("Set-Cookie", "newUser=true");

//   res.cookie("newUser", false);
//   res.cookie("isEmployee", false, { maxAge: 1000 * 60 * 60 * 24, httpOnly: true });

//   res.send("you got the cookies");
// });

// app.get("/read-cookies", (req, res) => {
//   const cookies = req.cookies;
//   console.log(cookies);
//   res.json(cookies.newUserer);
// });
