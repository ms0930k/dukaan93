const { check, validationResult } = require('express-validator');

// Validation middleware
exports.validate = (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ success: false, errors: errors.array() });
  }
  next();
};

// User validation rules
exports.userValidationRules = [
  check('name', 'Name is required').not().isEmpty(),
  check('email', 'Please include a valid email').isEmail(),
  check('password', 'Password must be 6 or more characters').isLength({ min: 6 })
];

// Login validation rules
exports.loginValidationRules = [
  check('email', 'Please include a valid email').isEmail(),
  check('password', 'Password is required').exists()
];

// Firm validation rules
exports.firmValidationRules = [
  check('name', 'Firm name is required').not().isEmpty(),
  check('address', 'Address is required').not().isEmpty(),
  check('gstin', 'GSTIN should be a valid format').optional().matches(/^[0-9]{2}[A-Z]{5}[0-9]{4}[A-Z]{1}[1-9A-Z]{1}Z[0-9A-Z]{1}$/)
];

// Product validation rules
exports.productValidationRules = [
  check('name', 'Product name is required').not().isEmpty(),
  check('unit', 'Unit is required').not().isEmpty(),
  check('hsnCode', 'HSN code must be a number').optional().isNumeric(),
  check('purchasePrice', 'Purchase price must be a number').isNumeric(),
  check('salePrice', 'Sale price must be a number').isNumeric()
];

// Party validation rules
exports.partyValidationRules = [
  check('name', 'Party name is required').not().isEmpty(),
  check('type', 'Type must be either customer or supplier').isIn(['customer', 'supplier']),
  check('gstin', 'GSTIN should be a valid format').optional().matches(/^[0-9]{2}[A-Z]{5}[0-9]{4}[A-Z]{1}[1-9A-Z]{1}Z[0-9A-Z]{1}$/)
];

// Voucher validation rules
exports.voucherValidationRules = [
  check('type', 'Type must be either sale or purchase').isIn(['sale', 'purchase']),
  check('party', 'Party ID is required').not().isEmpty(),
  check('items', 'Items must be an array').isArray(),
  check('items.*.product', 'Product ID is required for each item').not().isEmpty(),
  check('items.*.quantity', 'Quantity must be a number').isNumeric(),
  check('items.*.rate', 'Rate must be a number').isNumeric(),
  const { check, validationResult } = require('express-validator');

// Validation middleware
exports.validate = (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ success: false, errors: errors.array() });
  }
  next();
};

// User validation rules
exports.userValidationRules = [
  check('name', 'Name is required').not().isEmpty(),
  check('email', 'Please include a valid email').isEmail(),
  check('password', 'Password must be 6 or more characters').isLength({ min: 6 })
];

// Login validation rules
exports.loginValidationRules = [
  check('email', 'Please include a valid email').isEmail(),
  check('password', 'Password is required').exists()
];

// Firm validation rules
exports.firmValidationRules = [
  check('name', 'Firm name is required').not().isEmpty(),
  check('address', 'Address is required').not().isEmpty(),
  check('gstin', 'GSTIN should be a valid format').optional().matches(/^[0-9]{2}[A-Z]{5}[0-9]{4}[A-Z]{1}[1-9A-Z]{1}Z[0-9A-Z]{1}$/)
];

// Product validation rules
exports.productValidationRules = [
  check('name', 'Product name is required').not().isEmpty(),
  check('unit', 'Unit is required').not().isEmpty(),
  check('hsnCode', 'HSN code must be a number').optional().isNumeric(),
  check('purchasePrice', 'Purchase price must be a number').isNumeric(),
  check('salePrice', 'Sale price must be a number').isNumeric()
];

// Party validation rules
exports.partyValidationRules = [
  check('name', 'Party name is required').not().isEmpty(),
  check('type', 'Type must be either customer or supplier').isIn(['customer', 'supplier']),
  check('gstin', 'GSTIN should be a valid format').optional().matches(/^[0-9]{2}[A-Z]{5}[0-9]{4}[A-Z]{1}[1-9A-Z]{1}Z[0-9A-Z]{1}$/)
];

// Voucher validation rules
exports.voucherValidationRules = [
  check('type', 'Type must be either sale or purchase').isIn(['sale', 'purchase']),
  check('party', 'Party ID is required').not().isEmpty(),
  check('items', 'Items must be an array').isArray(),
  check('items.*.product', 'Product ID is required for each item').not().isEmpty(),
  check('items.*.quantity', 'Quantity must be a number').isNumeric(),
  check('items.*.rate', 'Rate must be a number').isNumeric()
];

// Expense validation rules
exports.expenseValidationRules = [
  check('description', 'Description is required').not().isEmpty(),
  check('amount', 'Amount must be a number').isNumeric(),
  check('category', 'Category is required').not().isEmpty(),
  check('paymentMethod', 'Payment method is required').not().isEmpty()
];