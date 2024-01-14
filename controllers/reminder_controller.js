// let database = require("../database");
const { userModel } = require("../models/userModel");
// const multer = require('multer')
// const upload = multer({ dest: 'public/uploads/' })

let remindersController = {
  list: (req, res) => {
    
    const loggedInID = req.user.id;
    // console.log(loggedInID)
    const foundUser = userModel.findById(loggedInID);
    // console.log(foundUser.reminders)
    // console.log(foundUser)
    if (foundUser) {
      // Access the reminders property if the user is found
      const userReminders = foundUser.reminders;
      const userRole = foundUser.role;
      const userId = foundUser.id;
      
      
      res.render("reminder/all", { reminders: userReminders, userRole: userRole, userId: userId });
    } else {
      // Handle the case where the user is not logged in
      res.redirect("/login");
    }

  },
  // Other controller methods

  new: (req, res) => {
    res.render("reminder/create");
  },

  listOne: (req, res) => {
    const loggedInID = req.user.id;
    let reminderToFind = req.params.id;
    let user = userModel.findById(loggedInID);
    
    if (user) {
      
      let searchResult = user.reminders.find(reminder => reminder.id == reminderToFind);
      if (searchResult != undefined) {
        
        res.render("reminder/single-reminder", { reminderItem: searchResult, userId: loggedInID});
      } else {
        res.render("reminder/all", { reminders: user.reminders });
      }
    } else {
      // Handle the case where the user is not found
      res.status(404).send("wrong");
    }
  },

  create: async(req, res) => {
    const loggedInID = req.user.id;
    let user = userModel.findById(loggedInID);
    const accessKey = 'K455-m74Y-SknvBIo06xM0owiFzRlemMSPPPQcYvaOE';
    const apiUrl = `https://api.unsplash.com/photos/random?client_id=${accessKey}`;
    if (user) {

      // ternary conditional expression
      // condition ? expression_if_true : expression_if_false;
      // user.reminders.map(r => r.id): This part creates a new array containing only the id values of each reminder.
      // ...: The spread syntax takes the individual elements of the array and passes them as separate arguments. 
      // So, if you have an array [1, 2, 3], using ... will be equivalent to passing 1, 2, 3 as separate arguments.

      // Math.max(...user.reminders.map(r => r.id)): The Math.max function expects individual numeric arguments. By using the spread syntax, we can pass all the id values as separate arguments to find the maximum among them.
      let maxId = user.reminders.length > 0 ? Math.max(...user.reminders.map(r => r.id)) : 0;
      
      let reminder = {
        
        id: maxId + 1,
        title: req.body.title,
        description: req.body.description,
        completed: false,
        cover: req.file ? req.file.filename : (req.body.cover ? (await (await fetch(apiUrl)).json()).urls["small"] : ""),
      };

      

    user.reminders.push(reminder);
    res.redirect("/reminders/all");
    }
    
  },


  edit: (req, res) => {
    const loggedInID = req.user.id;
    let reminderToFind = req.params.id;
    let user = userModel.findById(loggedInID);
    if (user) {
    
      let searchResult = user.reminders.find(reminder => reminder.id == reminderToFind)
      if (searchResult != undefined) {
        res.render("reminder/edit", { reminderItem: searchResult, userId: loggedInID});
      } else {
        res.render("reminder/all", { reminders: user.reminders });
      }
    } else {
      // Handle the case where the user is not found
      res.status(404).send("wrong");
    }
  },

  update: async(req, res) => {
    
    const loggedInID = req.user.id;
    let reminderToFind = req.params.id;
    let user = userModel.findById(loggedInID);
    const accessKey = 'K455-m74Y-SknvBIo06xM0owiFzRlemMSPPPQcYvaOE';
    const apiUrl = `https://api.unsplash.com/photos/random?client_id=${accessKey}`;
    // console.log(req.file.filename)
    if (user) {
        let updateLocation = reminderToFind - 1
        let updateReminder = user.reminders[updateLocation]
        
        updateReminder.title = req.body.title
        updateReminder.description = req.body.description
        updateReminder.completed = req.body.completed == "true"
        
        updateReminder.cover = req.file ? req.file.filename : (req.body.cover ? (await (await fetch(apiUrl)).json()).urls["small"] : "") 
        user.reminders.splice(updateLocation, 1, updateReminder)
    }
    res.redirect("/reminders/all");
  },
    
  delete: (req, res) => {
    const loggedInID = req.user.id;
    let reminderToFind = parseInt(req.params.id);
    let user = userModel.findById(loggedInID);
    

    if (user) {
      let indexOfReminder = user.reminders.findIndex(reminder => reminder.id === reminderToFind);
      if (indexOfReminder !== -1) {
          // If the reminder is found, remove it from the array
          user.reminders.splice(indexOfReminder, 1);
      }
    }
    res.redirect("/reminders/all");
  },

  getRandomCover: async(req, res) => {
    const response = await fetch("https://api.unsplash.com/photos/")
    const data = await response.json();
    //extract url and put into reminders
    // this.create()//one way


  }

};

module.exports = remindersController;
