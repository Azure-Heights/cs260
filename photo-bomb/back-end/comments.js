const mongoose = require('mongoose');
const express = require("express");
const router = express.Router();

const users = require("./users.js");
const User = users.model;
const photos = require("./photos.js");
const Photo = photos.model;
const validUser = users.valid;

const commentSchema = new mongoose.Schema({
    user: {
        type: mongoose.Schema.ObjectId,
        ref: 'User'
    },
    photo: {
        type: mongoose.Schema.ObjectId,
        ref: 'Photo'
    },
    text: String,
    created: {
        type: Date,
        default: Date.now
    },
});

const Comment = mongoose.model('Comment', commentSchema);


/* endpoints */

router.get("/:id", async (req, res) => {
    // return comments for a given photo id
    try {
        let comments = await Comment.find({
            photo: req.params.id
        }).sort({
            created: -1
        }).populate('user');

        return res.send(comments);
    } catch (error) {
        console.log(error);
        return res.sendStatus(500);
    }
});

router.post("/:id", validUser, async (req, res) => {
    try {
        let photo = await Photo.findOne({
            _id: req.params.id
        });

        if (!photo)
            res.sendStatus(404);

        let comment = new Comment({
            text: req.body.text,
            user: req.user,
            photo: photo,
        });

        comment.save();
        res.sendStatus(200);
    } catch (error) {
        console.log(error);
        return res.sendStatus(500);
    }
});

module.exports = {
    model: Comment,
    routes: router,
}
