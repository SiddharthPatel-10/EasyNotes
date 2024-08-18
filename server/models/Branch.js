const mongoose = require('mongoose');

const branchSchema = mongoose.Schema({
    name: { type: String, required: true, unique: true },
    course: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Course',
        required: true,
      },
}, { timestamps: true });

const Branch = mongoose.model('Branch', branchSchema);
module.exports = Branch;
