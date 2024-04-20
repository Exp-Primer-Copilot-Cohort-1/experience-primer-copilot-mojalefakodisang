// Create web server
// Create a comment
// Read all comments
// Read a comment
// Update a comment
// Delete a comment
// Delete all comments
// Import express module
const express = require('express');
// Import body-parser module
const bodyParser = require('body-parser');
// Import mongoose module
const mongoose = require('mongoose');
// Import Comment model
const Comment = require('./models/comment');
// Create express app
const app = express();
// Connect to MongoDB
mongoose.connect('mongodb://localhost:27017/comments', {
    useNewUrlParser: true,
    useUnifiedTopology: true
});
// Parse application/json
app.use(bodyParser.json());
// Create a comment
app.post('/comments', (req, res) => {
    const comment = new Comment(req.body);
    comment.save()
        .then(() => {
            res.send(comment);
        })
        .catch((error) => {
            res.status(400).send(error);
        });
});
// Read all comments
app.get('/comments', (req, res) => {
    Comment.find()
        .then((comments) => {
            res.send(comments);
        })
        .catch((error) => {
            res.status(500).send(error);
        });
});
// Read a comment
app.get('/comments/:id', (req, res) => {
    const id = req.params.id;
    Comment.findById(id)
        .then((comment) => {
            if (comment) {
                res.send(comment);
            } else {
                res.status(404).send();
            }
        })
        .catch((error) => {
            res.status(500).send(error);
        });
});
// Update a comment
app.patch('/comments/:id', (req, res) => {
    const id = req.params.id;
    const body = req.body;
    Comment.findByIdAndUpdate(id, {
        $set: body
    }, {
        new: true
    })
        .then((comment) => {
            if (comment) {
                res.send(comment);
            } else {
                res.status(404).send();
            }
        })
        .catch((error) => {
            res.status(400).send(error);
        });
});
// Delete a comment
app.delete('/comments/:id', (req, res) => {
    const id = req.params.id;
    Comment.findByIdAndDelete(id)
        .then((comment) => {
            if (comment) {
                res