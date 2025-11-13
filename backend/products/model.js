

const mongoose = require('mongoose');


const JobSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true
    },
    postedBy: {
        type: String,
        required: true
    },
    category: {
        type: String,
        required: true
    },
    summary: {
        type: String
    },
    coverImage : {
        type: String
    },
    ownerEmail: {
        type: String
    },
    acceptedBy: {
        type: String
    }
}, { timestamps: true }  );


JobSchema.index( { title: 1, postedBY: 1 } );
const Job = mongoose.model("Job", JobSchema);


const CategorySchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        unique: true
    }
});

const Category = mongoose.model( 'Category', CategorySchema );


module.exports = {  Job, Category };


