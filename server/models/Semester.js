const mongoose = require('mongoose');

const semesterSchema = mongoose.Schema({
    number: { type: Number, required: true }, // E.g., 1, 2, 3, etc.
    branch: { type: mongoose.Schema.Types.ObjectId, ref: 'Branch', required: true }  // Reference to Branch
}, { timestamps: true });

const Semester = mongoose.model('Semester', semesterSchema);
module.exports = Semester;
