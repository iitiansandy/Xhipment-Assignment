const userModel = require("../models/userModel");
const jobModel = require("../models/jobModel");
const bcrypt = require('bcrypt');
const jwt = require("jsonwebtoken");
const { isValidRequestBody, isValidObjectId, isValid, isValidEmail, isValidPassword } = require('../utils/utils');
//const { isValidBody, isValidstring, isValidEmail, isValidphone, isValidPassword } = require("../utils/validator");




/* +++++++++++++++++++++++++++++++++++++++++++++++++++++ Create User +++++++++++++++++++++++++++++++++++++++++++++++++++ */




const createUser = async (req, res) => {
    try {
        let data = req.body;
        if (!isValidRequestBody(data)) {
            return res.status(400).send({ status: false, message: " Enter data in body" })
        }

        let { name, email, password, resume, coverLetter} = data

        if ( !name || !email || !password || !resume || !coverLetter ) {
            return res.status(400).send({ status: false, message: "please fill all field properly" })
        }

        if (!isValid(name)) {
            return res.status(400).send({ status: false, message: " name should be in onlyalphabate" })
        }

        if (!isValidEmail(email)) {
            return res.status(400).send({ status: false, message: " invalid Email" })
        }

        let uniqueEmail = await userModel.findOne({ email: email })
        if (uniqueEmail) {
            return res.status(400).send({ status: false, message: " this email already exist" })
        }

        if (!isValidPassword(password)) {
            return res.status(400).send({ status: false, message: " password contain atleast one spacial character, Number, Alphabet, length should be 8 to 15 " })
        }

        data.password = bcrypt.hashSync(password, 10)

        if (!isValid(resume)) {
            return res.status(400).send({ status: false, message: " resume should be in onlyalphabate" })
        }

        if (!isValid(coverLetter)) {
            return res.status(400).send({ status: false, message: " coverLetter should be in onlyalphabate" })
        }

        let savedData = await userModel.create(data)
        return res.status(201).send({ status: true, data: savedData })

    } catch (err) {
        return res.status(500).send({ status: false, message: err.message })
    }
};




/* +++++++++++++++++++++++++++++++++++++++++++++++++++++ Login User +++++++++++++++++++++++++++++++++++++++++++++++++++ */




const loginUser = async (req, res) => {
    try {
        let credentials = req.body;

        let { email, password } = credentials;
        password = password.trim();
        email = email.trim();
        if (!isValidRequestBody(credentials)) {
            return res.status(400).send({ status: false, message: "Body should not be empty" });
        }
        if (!email || !password) {
            return res.status(400).send({ status: false, message: "Enter email and password" });
        }

        let user = await userModel.findOne({ email: email });
        if (!user) {
            return res.status(400).send({ status: false, message: "email does not exist" });
        }
        let valid = await bcrypt.compare(password, user.password);
        if (!valid) {
            return res.status(201).send({ status: false, message: " email or password wrong" });
        }

        let token = jwt.sign({
            _id: user._id.toString(),
            iat: Math.floor(Date.now() / 1000),
            exp: Math.floor(Date.now() / 1000) * 60 * 60 * 24  // 24 hours
        }, "xhipment-tech")

        res.setHeader("x-api-key", token);

        credentials.token = token;
        delete credentials.password;
        return res.status(200).send({ status: true, message: "Login successfully", data: credentials });

    } catch (err) {
        return res.status(500).send({ status: false, message: err.message });
    }
};


module.exports = { createUser, loginUser };