// const mongoose = require('mongoose');

// const noteSchema = new mongoose.Schema({
//     title: { type: String, required: true },
//     description: { type: String },
//     category: { type: mongoose.Schema.Types.ObjectId, ref: 'Category' },
//     fileUrl: { type: String, required: true },
//     user: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
// }, { timestamps: true });

// const Note = mongoose.model('Note', noteSchema);

// module.exports = Note;



const mongoose = require('mongoose');

const noteSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true
    },
    fileUrl: {
        type: String,
        required: true
    },
    subject: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Subject',
        required: true
    }
}, {
    timestamps: true
});

const Note = mongoose.model('Note', noteSchema);

module.exports = Note;

