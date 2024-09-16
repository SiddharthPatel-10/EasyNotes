const express = require('express');
const router = express.Router();
const {
    getTestimonials,
    createTestimonial,
    updateTestimonial,
    deleteTestimonial
} = require('../controllers/testimonialController');

// Get all testimonials
router.get('/testimonials', getTestimonials);

// Create a new testimonial
router.post('/testimonials', createTestimonial);

// Update a testimonial by ID
router.put('/testimonials/:id', updateTestimonial);

// Delete a testimonial by ID
router.delete('/testimonials/:id', deleteTestimonial);

module.exports = router;
