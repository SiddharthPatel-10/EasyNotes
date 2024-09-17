const Testimonial = require('../models/Testimonials');

// @desc    Get all testimonials
// @route   GET /api/testimonials
// @access  Public
const getTestimonials = async (req, res) => {
    try {
        const testimonials = await Testimonial.find();
        res.status(200).json(testimonials);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// @desc    Create a new testimonial
// @route   POST /api/testimonials
// @access  Public
const createTestimonial = async (req, res) => {
    const { name, review } = req.body;

    if (!name || !review) {
        return res.status(400).json({ message: "Name and review are required." });
    }

    const newTestimonial = new Testimonial({
        name,
        review
    });

    try {
        const savedTestimonial = await newTestimonial.save();
        res.status(201).json(savedTestimonial);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// @desc    Update a testimonial
// @route   PUT /api/testimonials/:id
// @access  Public
const updateTestimonial = async (req, res) => {
    const { id } = req.params;
    const { name, review } = req.body;

    try {
        const updatedTestimonial = await Testimonial.findByIdAndUpdate(
            id,
            { name, review },
            { new: true, runValidators: true }
        );

        if (!updatedTestimonial) {
            return res.status(404).json({ message: "Testimonial not found." });
        }

        res.status(200).json(updatedTestimonial);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// @desc    Delete a testimonial
// @route   DELETE /api/testimonials/:id
// @access  Public
const deleteTestimonial = async (req, res) => {
    const { id } = req.params;

    try {
        const deletedTestimonial = await Testimonial.findByIdAndDelete(id);

        if (!deletedTestimonial) {
            return res.status(404).json({ message: "Testimonial not found." });
        }

        res.status(200).json({ message: "Testimonial deleted successfully." });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

module.exports = {
    getTestimonials,
    createTestimonial,
    updateTestimonial,
    deleteTestimonial
};
