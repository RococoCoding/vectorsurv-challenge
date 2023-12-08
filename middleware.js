// Import express-validator
const { body } = require('express-validator');

// Validation middleware
const validateMovieData = [
  body('title').trim().isLength({ min: 1 }).withMessage('Title is required.'),
  body('releaseDate').isISO8601().toDate().withMessage('Invalid date format.'),
  body('rating').isFloat({ min: 0, max: 10 }).withMessage('Rating must be between 0 and 10.'),
  body('genre').isIn(['Action', 'Animation', 'Comedy', 'Drama', 'Historical', 'Horror', 'Sci Fi'])
    .withMessage('Invalid genre.'),
  body('studioEmail').isEmail().withMessage('Invalid email address.'),
];

module.exports = validateMovieData;
