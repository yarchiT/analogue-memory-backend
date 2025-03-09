import Joi from 'joi'

// Schema for ID parameter validation
export const idParamSchema = Joi.object({
  id: Joi.string().required().messages({
    'string.empty': 'ID cannot be empty',
    'any.required': 'ID is required',
  }),
})

// Schema for category ID parameter validation
export const categoryIdParamSchema = Joi.object({
  categoryId: Joi.string().required().messages({
    'string.empty': 'Category ID cannot be empty',
    'any.required': 'Category ID is required',
  }),
})

// Schema for search query validation
export const searchQuerySchema = Joi.object({
  query: Joi.string().required().min(2).messages({
    'string.empty': 'Search query cannot be empty',
    'string.min': 'Search query must be at least {#limit} characters long',
    'any.required': 'Search query is required',
  }),
})

// Schema for pagination and sorting
export const paginationSchema = Joi.object({
  page: Joi.number().integer().min(1).default(1).messages({
    'number.base': 'Page must be a number',
    'number.integer': 'Page must be an integer',
    'number.min': 'Page must be at least {#limit}',
  }),
  limit: Joi.number().integer().min(1).max(100).default(10).messages({
    'number.base': 'Limit must be a number',
    'number.integer': 'Limit must be an integer',
    'number.min': 'Limit must be at least {#limit}',
    'number.max': 'Limit cannot exceed {#limit}',
  }),
  sort: Joi.string().valid('name', 'popularity', 'year', '-name', '-popularity', '-year').default('name').messages({
    'string.base': 'Sort must be a string',
    'any.only': 'Sort must be one of {#valids}',
  }),
}) 