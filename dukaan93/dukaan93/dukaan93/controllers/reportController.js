const Voucher = require('../models/Voucher');
const Product = require('../models/Product');
const Party = require('../models/Party');
const Expense = require('../models/Expense');
const PDFGenerator = require('../utils/pdfGenerator');

// Stock Summary Report
exports.getStockSummary = async (req, res) => {
  try {
    const firmId = req.params.firmId;
    
    // Get all products with quantity and value
    const products = await Product.find({ firm: firmId });
    
    // Calculate stock value
    let totalStockValue = 0;
    const stockSummary = products.map(product => {
      const value = product.quantity * product.purchasePrice;
      totalStockValue += value;
      
      return {
        id: product._id,
        name: product.name,
        purchasePrice: product.purchasePrice,
        quantity: product.quantity,
        value: value
      };
    });
    
    res.status(200).json({ 
      success: true, 
      data: { 
        products: stockSummary,
        totalStockValue
      } 
    });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
};

// Sales Report
exports.getSalesReport = async (req, res) => {
  try {
    const firmId = req.params.firmId;
    const { startDate, endDate } = req.query;
    
    // Query parameters for date filtering
    const dateQuery = {};
    if (startDate) dateQuery.$gte = new Date(startDate);
    if (endDate) dateQuery.$lte = new Date(endDate);
    
    // Find all sales vouchers
    const query = { 
      firm: firmId, 
      type: 'sale',
    };
    
    // Add date filter if provided
    if (startDate || endDate) {
      query.date = dateQuery;
    }
    
    const salesVouchers = await Voucher.find(query)
      .populate('party', 'name')
      .sort({ date: -1 });
    
    // Calculate total sales amount
    let totalSalesAmount = 0;
    salesVouchers.forEach(voucher => {
      totalSalesAmount += voucher.totalAmount;
    });
    
    res.status(200).json({ 
      success: true, 
      data: { 
        vouchers: salesVouchers,
        count: salesVouchers.length,
        totalAmount: totalSalesAmount
      } 
    });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
};

// Purchase Report
exports.getPurchaseReport = async (req, res) => {
  try {
    const firmId = req.params.firmId;
    const { startDate, endDate } = req.query;
    
    // Query parameters for date filtering
    const dateQuery = {};
    if (startDate) dateQuery.$gte = new Date(startDate);
    if (endDate) dateQuery.$lte = new Date(endDate);
    
    // Find all purchase vouchers
    const query = { 
      firm: firmId, 
      type: 'purchase',
    };
    
    // Add date filter if provided
    if (startDate || endDate) {
      query.date = dateQuery;
    }
    
    const purchaseVouchers = await Voucher.find(query)
      .populate('party', 'name')
      .sort({ date: -1 });
    
    // Calculate total purchase amount
    let totalPurchaseAmount = 0;
    purchaseVouchers.forEach(voucher => {
      totalPurchaseAmount += voucher.totalAmount;
    });
    
    res.status(200).json({ 
      success: true, 
      data: { 
        vouchers: purchaseVouchers,
        count: purchaseVouchers.length,
        totalAmount: totalPurchaseAmount
      } 
    });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
};

// Party Ledger
exports.getPartyLedger = async (req, res) => {
  try {
    const partyId = req.params.partyId;
    const firmId = req.params.firmId;
    
    // Get party details
    const party = await Party.findOne({ _id: partyId, firm: firmId });
    if (!party) {
      return res.status(404).json({ success: false, error: 'Party not found' });
    }
    
    // Get all vouchers for this party
    const vouchers = await Voucher.find({ party: partyId, firm: firmId })
      .sort({ date: 1 });
    
    // Calculate balance
    let balance = 0;
    const transactions = vouchers.map(voucher => {
      if (voucher.type === 'sale') {
        balance += voucher.totalAmount;
      } else {
        balance -= voucher.totalAmount;
      }
      
      return {
        date: voucher.date,
        voucherNo: voucher.voucherNumber,
        type: voucher.type,
        amount: voucher.totalAmount,
        balance
      };
    });
    
    res.status(200).json({ 
      success: true, 
      data: { 
        party: party.name,
        transactions,
        balance
      } 
    });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
};

// Generate PDF Report
exports.generatePDFReport = async (req, res) => {
  try {
    const { reportType, data } = req.body;
    
    // Generate PDF based on report type
    const pdfBuffer = await PDFGenerator.generateReport(reportType, data);
    
    // Set response headers for PDF download
    res.setHeader('Content-Type', 'application/pdf');
    res.setHeader('Content-Disposition', `attachment; filename=${reportType}-report.pdf`);
    
    // Send the PDF buffer
    res.send(pdfBuffer);
    
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
};