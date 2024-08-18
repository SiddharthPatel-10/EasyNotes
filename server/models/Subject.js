const mongoose = require('mongoose');

const subjectSchema = mongoose.Schema({
    name: { type: String, required: true },
    semester: { type: mongoose.Schema.Types.ObjectId, ref: 'Semester', required: true }, // Ensure this references the Semester model
}, { timestamps: true });

const Subject = mongoose.model('Subject', subjectSchema);
module.exports = Subject;
