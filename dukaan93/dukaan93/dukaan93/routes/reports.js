const express = require('express');
const router = express.Router({ mergeParams: true });
const { protect } = require('../middlewares/auth');
const {
  getStockSummary,
  getSalesReport,
  getPurchaseReport,
  getPartyLedger,
  generatePDFReport
} = require('../controllers/reportController');

// Protect all routes
router.use(protect);

router.route('/stock-summary')
  .get(getStockSummary);

router.route('/sales')
  .get(getSalesReport);

router.route('/purchases')
  .get(getPurchaseReport);

router.route('/party-ledger/:partyId')
  .get(getPartyLedger);

router.route('/generate-pdf')
  .post(generatePDFReport);

module.exports = router;