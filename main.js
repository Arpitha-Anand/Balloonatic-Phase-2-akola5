"use strict";

const express = require("express"),
  app = express(),
  homeController = require("./controllers/homeController"),
  errorController = require("./controllers/errorController"),
  productController = require("./controllers/productController"),
  userController = require("./controllers/userController"), 
  layouts = require("express-ejs-layouts");

const mongoose = require("mongoose");
mongoose.connect("mongodb+srv://m001-Arpitha:Ka02mg&9708@capstone.gxw2o.mongodb.net/myFirstDatabase?retryWrites=true&w=majority", {
    useNewUrlParser: true,
    useUnifiedTopology: true
});
// .then(() => app.listen(3001, () => console.log("HI")))
// .catch((error) => console.log(error.message));
mongoose.set("useCreateIndex", true);
app.set("view engine", "ejs");
app.set("port", process.env.PORT || 3000);
app.use(
  express.urlencoded({
    extended: false
  })
);
app.use(express.json());
app.use(layouts);
app.use(express.static("public"));

app.get("/",userController.intialize);

app.get("/About", (req, res) => {
  res.render("About");
});

app.get("/contact", (req, res) => {
  res.render("contact");
});

app.get("/login", (req, res) => {
  res.render("login");
});
app.post("/login",userController.login)
app.post("/logout",userController.logout)
app.get("/signup", (req,res) => {
  res.render("signup");
})

app.post("/signup",userController.signup);


app.get("/product", productController.showProducts);

app.get("/courses", homeController.showCourses);
app.post("/contact", homeController.postedSignUpForm);

app.use(errorController.pageNotFoundError);
app.use(errorController.internalServerError);

app.listen(app.get("port"), () => {
  console.log(`Server running at http://localhost:${app.get("port")}`);
});
