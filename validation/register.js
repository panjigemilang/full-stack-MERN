const isEmpty = require('./is-empty');
const validator = require('validator');

module.exports = function validateRegisterinput(data) {
    let err = {};
    data.name = !isEmpty(data.name) ? data.name : '';
    data.email = !isEmpty(data.email) ? data.email : '';
    data.password = !isEmpty(data.password) ? data.password : '';
    data.passwordConfirm = !isEmpty(data.passwordConfirm) ? data.passwordConfirm : '';

    if (!validator.isLength(data.name, {
            min: 2,
            max: 3
        })) {
        err.name = "Name must be between 2 or 30 characters";
    }

    if (validator.isEmpty(data.name)) {
        err.name = "Name field is required";
    }

    if (validator.isEmpty(data.email)) {
        err.email = "Email field is required";
    }

    if (!validator.isEmail(data.email)) {
        err.email = "Email is invalid";
    }

    if (!validator.isLength(data.email, {
            min: 2,
            max: 30
        })) {
        err.email = "Email must be between 2 or 30 characters";
    }

    if (validator.isEmpty(data.password)) {
        err.password = "Password field is required";
    }

    if (!validator.isLength(data.password, {
            min: 2,
            max: 30
        })) {
        err.password = "Email must be between 2 or 30 characters";
    }

    if (validator.isEmpty(data.passwordConfirm)) {
        err.passwordConfirm = "Confirm password field is required";
    }

    if (!validator.equals(data.password, data.passwordConfirm)) {
        err.password = "Password is not match";
    }

    return {
        err,
        isValid: isEmpty(err)
    }
}