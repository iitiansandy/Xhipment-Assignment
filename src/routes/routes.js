const express = require('express');
const router = express.Router();
const userController = require("../controllers/userController");
const jobController = require("../controllers/jobController");
const Authentication = require('../middleware/auth').Authentication;
const Authorization = require('../middleware/auth').Authorization;


/* ++++++++++++++++++++++++++ User APIs ++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++ */

router.post("/user", userController.createUser);
router.post("/login", userController.loginUser);

/* ++++++++++++++++++++++++++ Job APIs ++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++ */

router.post("/job", Authentication, jobController.createJob);
router.get("/job", Authentication, jobController.getJob);
router.put("/job", Authentication, Authorization, jobController.editJob);
router.delete("/job", Authentication, Authorization, jobController.deleteJob);


module.exports = router;