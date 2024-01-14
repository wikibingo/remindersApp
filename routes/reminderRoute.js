const express = require("express");
const passport = require("../middleware/passport");
const { forwardAuthenticated, ensureAuthenticated } = require("../middleware/checkAuth");
const reminderController = require("../controllers/reminder_controller")
const multer = require('multer')
const upload = multer({ dest: 'public/uploads/' })

const router = express.Router();

router.get("/all", ensureAuthenticated, reminderController.list)

router.get("/reminder/:userId/:id", ensureAuthenticated, reminderController.listOne)

router.get("/reminder/new", ensureAuthenticated, reminderController.new);

router.post("/all", upload.single('cover'), ensureAuthenticated, reminderController.create);

router.get("/reminder/:userId/:id/edit", ensureAuthenticated, reminderController.edit)

router.post("/reminder/:userId/:id/update", upload.single('cover'), ensureAuthenticated, reminderController.update)

router.post("/reminder/:userId/:id/delete", ensureAuthenticated, reminderController.delete)





module.exports = router;
 