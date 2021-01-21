const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const UserSchema = mongoose.Schema({
    username: {
        type: String,
        trim: true,
        required: "Username is required"
    },

    password: {
        type: String,
        trim: true,
        required: "Password is required",
        validate: [({length}) => length >=6, "Password should be longer"]
    },

    email: {
        type: String,
        unique: true,
        match: [/.+@.+\..+/, "Enter a valid email address"]
    },

    userCreated: {
        type: Date,
        default: Date.now
    }
});

const User = mongoose.model("user", UserSchema);

module.exports = User;