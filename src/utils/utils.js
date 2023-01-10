const mongoose = require('mongoose').Types.ObjectId;

const isValidRequestBody = (requestBody) => {
    return Object.keys(requestBody).length > 0;
}

const isValidObjectId = (objectId) => {
    if (!ObjectId.isValid(objectId)) return false;
    return true;
};

const isValid = (value) => {
    if (typeof value === "undefined" || typeof value === null) return false;
    if (typeof value === "string" && value.trim().length == 0) return false;
    return true;
}

const isValidEmail = function (email) {
    let regex = /^\w+([\.-]?\w+)@\w+([\.-]?\w+)(\.\w{2,3})+$/;
    return regex.test(email);
};

const isValidPassword = (password) => {
    let regexPassword =
        /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,15}$/;
    return regexPassword.test(password);
};

module.exports = { isValidRequestBody, isValidObjectId, isValid, isValidEmail, isValidPassword };