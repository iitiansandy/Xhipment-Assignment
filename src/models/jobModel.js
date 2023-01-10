const mongoose = require('mongoose');

let jobSchema = new mongoose.Schema(
    {
        title: {
            type: String,
            required: true,
            trim: true
        },

        description: {
            type: String,
            required: true,
            trim: true
        },

        skills: {
            type: String,
            require: true,
            unique: true
        },

        experience: {
            type: String,
            require: true,
            unique: true
        }
    }, { timestamps: true }
);

module.exports = mongoose.model("Job", jobSchema);