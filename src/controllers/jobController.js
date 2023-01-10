const userModel = require("../models/userModel");
const jobModel = require("../models/jobModel");
const { isValidRequestBody, isValidObjectId, isValid } = require('../utils/utils');




/* +++++++++++++++++++++++++++++++++++++++++++++++++++++ Create Job +++++++++++++++++++++++++++++++++++++++++++++++++++ */




const createJob = async (req, res) => {
    try {
        let data = req.body;
        if (!isValidRequestBody(data)) {
            return res.status(400).send({ status: false, message: " please enter data in body" });
        }

        let { title, description, skills, experience } = data;

        if ( !title || !description || !skills || !experience ) {
            return res.status(400).send({ status: false, message: "please fill all fields properly" });
        }

        if (!isValid(title)) {
            return res.status(400).send({ status: false, message: " title should be in onlyalphabate" });
        }

        if (!isValid(description)) {
            return res.status(400).send({ status: false, message: " invalid description" });
        }

        if (!isValid(skills)) {
            return res.status(400).send({ status: false, message: " please provide skills" });
        }

        if (!isValid(experience)) {
            return res.status(400).send({ status: false, message: " experience should be in onlyalphabate" });
        }

        let savedData = await jobModel.create(data);
        return res.status(201).send({ status: true, data: savedData });

    } catch (err) {
        return res.status(500).send({ status: false, message: err.message })
    }
};




/* +++++++++++++++++++++++++++++++++++++++++++++++++++++ Get Job +++++++++++++++++++++++++++++++++++++++++++++++++++ */




const getJob = async (req, res) => {
    try {

        let jobs = await jobModel.find();
        if (jobs.length == 0) return res.status(404).send({ status: false, message: "There are no jobs." });

        return res.status(200).send({ status: true, data: jobs });

    } catch (error) {
        res.status(500).send({ status: false, message: error.message });
    }
};




/* ++++++++++++++++++++++++++++++++++++++++++++++++++++ Update User ++++++++++++++++++++++++++++++++++++++++++++++++++ */




const editJob = async (req, res) => {
    try {
        let userId = req.params.id || req.query.id;
        if (!userId) return res.status(400).send({ status: false, message: 'pls give a userId in params' });
        if (!isValidObjectId(userId)) return res.status(400).send({ status: false, message: 'pls give a valid userId in params' });
        let job = await userModel.findById(userId)
        if (!job) return res.status(404).send({ status: false, message: 'sorry, No such job exists with this Id' });

        let body = req.body;
        let { jobId, title, description, skills, experience } = body;
        if (isValidRequestBody(body)) return res.status(400).send({ status: false, message: 'please enter body' });

        if (job && job.isDeleted == false) {
            job.jobId = jobId;
            job.title = title;
            job.description = description;
            job.skills = skills;
            job.experience = experience;

            job.save();
            return res.status(200).send({ status: true, data: job });
        } else {
            return res.status(404).send({ satus: false, message: 'No such job found or it is deleted' });
        }

    } catch (err) {
        res.status(500).send({ status: false, message: err.message });
    }
};




/* ++++++++++++++++++++++++++++++++++++++++++++++++++++ Delete User ++++++++++++++++++++++++++++++++++++++++++++++++++ */




const deleteJob = async (req, res) => {
    try {

        let jobId = req.params.id;
        console.log(jobId);
        if (!mongoose.Types.ObjectId.isValid(jobId)) return res.status(400).send({ status: false, message: "Give a valid job ObjectId" });

        let job = await jobModel.findOne({ _id: jobId, isDeleted: false });
        if (!job) return res.status(404).send({ status: false, message: "This job doesn't exists." });

        await jobModel.findOneAndUpdate({ _id: id }, { isDeleted: true });

        return res.status(200).send({ status: true, message: "job deleted successfully." });

    } catch (error) {
        res.status(500).send({ status: false, message: error.message });
    }
};



module.exports = { createJob, getJob, editJob, deleteJob };

