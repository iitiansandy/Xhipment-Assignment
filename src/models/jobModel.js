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
            trim: true
        },

        experience: {
            type: String,
            require: true,
            trim: true
        },

        isDeleted: { type: Boolean, default: false },

    }, { timestamps: true }
);

module.exports = mongoose.model("Job", jobSchema);