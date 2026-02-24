// Input validation middleware
const validateNews = (req, res, next) => {
  const { title, content, category, image_url } = req.body;

  const errors = [];

  if (!title || typeof title !== 'string' || title.trim().length < 5) {
    errors.push('Title is required and must be at least 5 characters');
  }

  if (!content || typeof content !== 'string' || content.trim().length < 20) {
    errors.push('Content is required and must be at least 20 characters');
  }

  if (!category || typeof category !== 'string' || category.trim().length === 0) {
    errors.push('Category is required');
  }

  if (image_url && typeof image_url !== 'string') {
    errors.push('Image URL must be a string');
  }

  if (errors.length > 0) {
    return res.status(400).json({
      success: false,
      message: 'Validation failed',
      errors
    });
  }

  next();
};

const validateGallery = (req, res, next) => {
  const { album_name, description } = req.body;

  const errors = [];

  if (!album_name || typeof album_name !== 'string' || album_name.trim().length < 3) {
    errors.push('Album name is required and must be at least 3 characters');
  }

  if (description && typeof description !== 'string') {
    errors.push('Description must be a string');
  }

  if (errors.length > 0) {
    return res.status(400).json({
      success: false,
      message: 'Validation failed',
      errors
    });
  }

  next();
};

const validateId = (req, res, next) => {
  const { id } = req.params;

  if (!id || isNaN(id) || id <= 0) {
    return res.status(400).json({
      success: false,
      message: 'Invalid ID provided'
    });
  }

  next();
};

module.exports = {
  validateNews,
  validateGallery,
  validateId
};
