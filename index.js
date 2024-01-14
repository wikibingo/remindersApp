const express = require("express");
const ejsLayouts = require("express-ejs-layouts");
const session = require("express-session");
const path = require("path");
// const port = process.env.port || 8000;
//return a web server that we can use. now app actually is our web server
const app = express();

//ejs
app.set("view engine", "ejs");

//static
app.use(express.static(path.join(__dirname, "public")));
app.use(
  session({
    secret: "secret",
    resave: false,
    saveUninitialized: false,
    cookie: {
      httpOnly: true,
      secure: false,
      maxAge: 24 * 60 * 60 * 1000,
    },
  })
);

// //localhost:8080(url)
app.listen(8080)

const passport = require("./middleware/passport");
const { localLogin, githubLogin } = require('./middleware/passport')
const authRoute = require("./routes/authRoute");
const indexRoute = require("./routes/indexRoute");
const reminderRoute = require("./routes/reminderRoute");

const reminderController = require("./controllers/reminder_controller");
const authController = require("./controllers/auth_controller");


app.use(express.json());
//use ejs(need views folder, mandatory)(//dynamic)
app.use(ejsLayouts);
app.use(express.urlencoded({ extended: true }));


app.use(passport.initialize());
app.use(passport.session());


// app.use((req, res, next) => {
//   console.log(`User details are: `);
//   console.log(req.user);

  // console.log("Entire session object:");
  // console.log(req.session);

//   console.log(`Session details are: `);
//   console.log(req.session.passport);
//   next();
// });

app.use("/", indexRoute);
app.use("/auth", authRoute);
app.use("/reminders", reminderRoute);

// app.get("/uploads/IMG_2298.JPG", (req, res) => {
//   const filePath = path.join(__dirname, 'uploads', 'IMG_2298.JPG'); // Adjust the folder structure as needed
//   res.sendFile(filePath)
// })



// Routes start here
// app.get("/reminders", reminderController.list);
// app.get("/reminder/new", reminderController.new);
// app.get("/reminder/:userId/:id", reminderController.listOne);

// app.get("/reminder/:id/edit", reminderController.edit);
// app.post("/reminder/", reminderController.create);
// // ⭐ Implement these two routes below!
// app.post("/reminder/update/:id", reminderController.update);
// app.post("/reminder/delete/:id", reminderController.delete);

// 👌 Ignore for now
// app.get("/register", authController.register);
// app.get("/login", authController.login);
// app.post("/register", authController.registerSubmit);
// app.post("/login", authController.loginSubmit);

app.listen(3001, function () {
  console.log(
    "Server running. Visit: http://localhost:3001/ in your browser 🚀"
  );
});
