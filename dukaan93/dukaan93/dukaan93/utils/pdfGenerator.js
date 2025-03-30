const PDFDocument = require('pdfkit');

class PDFGenerator {
  static async generateReport(reportType, data) {
    return new Promise((resolve, reject) => {
      try {
        // Create a new PDF document
        const doc = new PDFDocument({ margin: 50 });
        
        // Buffer to store PDF
        const buffers = [];
        doc.on('data', buffers.push.bind(buffers));
        doc.on('end', () => {
          const pdfData = Buffer.concat(buffers);
          resolve(pdfData);
        });
        
        // Generate specific report based on type
        switch(reportType) {
          case 'stock-summary':
            this.generateStockSummary(doc, data);
            break;
          case 'sales-report':
            this.generateSalesReport(doc, data);
            break;
          case 'purchase-report':
            this.generatePurchaseReport(doc, data);
            break;
          case 'party-ledger':
            this.generatePartyLedger(doc, data);
            break;
          case 'expense-report':
            this.generateExpenseReport(doc, data);
            break;
          case 'voucher':
            this.generateVoucher(doc, data);
            break;
          default:
            throw new Error('Invalid report type');
        }
        
        // Finalize the PDF
        doc.end();
        
      } catch (error) {
        reject(error);
      }
    });
  }
  
  static generateStockSummary(doc, data) {
    // Add title
    doc.fontSize(20).text('Stock Summary Report', { align: 'center' });
    doc.moveDown();
    
    // Add company details
    doc.fontSize(12).text(`Firm: ${data.firmName}`, { align: 'left' });
    doc.text(`Date: ${new Date().toLocaleDateString()}`, { align: 'left' });
    doc.moveDown();
    
    // Add table headers
    const tableTop = 150;
    doc.fontSize(10)
      .text('Product', 50, tableTop)
      .text('Purchase Price', 200, tableTop)
      .text('Quantity', 300, tableTop)
      .text('Value', 380, tableTop);
    
    // Add line
    doc.moveTo(50, tableTop + 15)
      .lineTo(500, tableTop + 15)
      .stroke();
    
    // Add table data
    let y = tableTop + 30;
    data.products.forEach(product => {
      doc.text(product.name, 50, y)
        .text(`₹${product.purchasePrice.toFixed(2)}`, 200, y)
        .text(product.quantity.toString(), 300, y)
        .text(`₹${product.value.toFixed(2)}`, 380, y);
      
      y += 20;
    });
    
    // Add line
    doc.moveTo(50, y)
      .lineTo(500, y)
      .stroke();
    
    // Add total
    doc.fontSize(12)
      .text('Total Stock Value:', 200, y + 20)
      .text(`₹${data.totalStockValue.toFixed(2)}`, 380, y + 20);
  }
  
  static generateSalesReport(doc, data) {
    // Add title
    doc.fontSize(20).text('Sales Report', { align: 'center' });
    doc.moveDown();
    
    // Add company details and date range
    doc.fontSize(12).text(`Firm: ${data.firmName}`, { align: 'left' });
    doc.text(`Period: ${data.startDate} to ${data.endDate}`, { align: 'left' });
    doc.text(`Date Generated: ${new Date().toLocaleDateString()}`, { align: 'left' });
    doc.moveDown();
    
    // Add summary
    doc.fontSize(12)
      .text(`Total Sales: ₹${data.totalAmount.toFixed(2)}`, { align: 'left' })
      .text(`Number of Transactions: ${data.count}`, { align: 'left' });
    doc.moveDown();
    
    // Add table headers
    const tableTop = 200;
    doc.fontSize(10)
      .text('Date', 50, tableTop)
      .text('Voucher No', 150, tableTop)
      .text('Party', 230, tableTop)
      .text('Amount', 380, tableTop);
    
    // Add line
    doc.moveTo(50, tableTop + 15)
      .lineTo(500, tableTop + 15)
      .stroke();
    
    // Add table data
    let y = tableTop + 30;
    data.vouchers.forEach(voucher => {
      doc.text(new Date(voucher.date).toLocaleDateString(), 50, y)
        .text(voucher.voucherNumber, 150, y)
        .text(voucher.party.name, 230, y)
        .text(`₹${voucher.totalAmount.toFixed(2)}`, 380, y);
      
      y += 20;
      
      // Add page if needed
      if (y > 700) {
        doc.addPage();
        y = 50;
      }
    });
  }
  
  static generatePurchaseReport(doc, data) {
    // Add title
    doc.fontSize(20).text('Purchase Report', { align: 'center' });
    doc.moveDown();
    
    // Add company details and date range
    doc.fontSize(12).text(`Firm: ${data.firmName}`, { align: 'left' });
    doc.text(`Period: ${data.startDate} to ${data.endDate}`, { align: 'left' });
    doc.text(`Date Generated: ${new Date().toLocaleDateString()}`, { align: 'left' });
    doc.moveDown();
    
    // Add summary
    doc.fontSize(12)
      .text(`Total Purchases: ₹${data.totalAmount.toFixed(2)}`, { align: 'left' })
      .text(`Number of Transactions: ${data.count}`, { align: 'left' });
    doc.moveDown();
    
    // Add table headers
    const tableTop = 200;
    doc.fontSize(10)
      .text('Date', 50, tableTop)
      .text('Voucher No', 150, tableTop)
      .text('Supplier', 230, tableTop)
      .text('Amount', 380, tableTop);
    
    // Add line
    doc.moveTo(50, tableTop + 15)
      .lineTo(500, tableTop + 15)
      .stroke();
    
    // Add table data
    let y = tableTop + 30;
    data.vouchers.forEach(voucher => {
      doc.text(new Date(voucher.date).toLocaleDateString(), 50, y)
        .text(voucher.voucherNumber, 150, y)
        .text(voucher.party.name, 230, y)
        .text(`₹${voucher.totalAmount.toFixed(2)}`, 380, y);
      
      y += 20;
      
      // Add page if needed
      if (y > 700) {
        doc.addPage();
        y = 50;
      }
    });
  }
  
  static generatePartyLedger(doc, data) {
    // Add title
    doc.fontSize(20).text('Party Ledger', { align: 'center' });
    doc.moveDown();
    
    // Add party details
    doc.fontSize(12).text(`Party: ${data.party}`, { align: 'left' });
    doc.text(`Firm: ${data.firmName}`, { align: 'left' });
    doc.text(`Date Generated: ${new Date().toLocaleDateString()}`, { align: 'left' });
    doc.moveDown();
    
    // Add summary
    doc.fontSize(12)
      .text(`Current Balance: ₹${data.balance.toFixed(2)}`, { align: 'left' });
    doc.moveDown();
    
    // Add table headers
    const tableTop = 200;
    doc.fontSize(10)
      .text('Date', 50, tableTop)
      .text('Voucher No', 120, tableTop)
      .text('Type', 210, tableTop)
      .text('Amount', 290, tableTop)
      .text('Balance', 380, tableTop);
    
    // Add line
    doc.moveTo(50, tableTop + 15)
      .lineTo(500, tableTop + 15)
      .stroke();
    
    // Add table data
    let y = tableTop + 30;
    data.transactions.forEach(transaction => {
      doc.text(new Date(transaction.date).toLocaleDateString(), 50, y)
        .text(transaction.voucherNo, 120, y)
        .text(transaction.type.charAt(0).toUpperCase() + transaction.type.slice(1), 210, y)
        .text(`₹${transaction.amount.toFixed(2)}`, 290, y)
        .text(`₹${transaction.balance.toFixed(2)}`, 380, y);
      
      y += 20;
      
      // Add page if needed
      if (y > 700) {
        doc.addPage();
        y = 50;
      }
    });
  }
  
  static generateExpenseReport(doc, data) {
    // Add title
    doc.fontSize(20).text('Expense Report', { align: 'center' });
    doc.moveDown();
    
    // Add company details and date range
    doc.fontSize(12).text(`Firm: ${data.firmName}`, { align: 'left' });
    doc.text(`Period: ${data.startDate} to ${data.endDate}`, { align: 'left' });
    doc.text(`Date Generated: ${new Date().toLocaleDateString()}`, { align: 'left' });
    doc.moveDown();
    
    // Add summary
    doc.fontSize(12)
      .text(`Total Expenses: ₹${data.totalAmount.toFixed(2)}`, { align: 'left' });
    doc.moveDown();
    
    // Add category summary
    doc.fontSize(14).text('Expense By Category', { align: 'left' });
    doc.moveDown(0.5);
    
    let y = doc.y;
    data.categorySummary.forEach(category => {
      doc.fontSize(10)
        .text(category._id || 'Uncategorized', 50, y)
        .text(`₹${category.total.toFixed(2)}`, 380, y);
      
      y += 20;
    });
    
    doc.moveDown(2);
    
    // Add table headers
    const tableTop = doc.y;
    doc.fontSize(10)
      .text('Date', 50, tableTop)
      .text('Description', 120, tableTop)
      .text('Category', 260, tableTop)
      .text('Amount', 380, tableTop);
    
    // Add line
    doc.moveTo(50, tableTop + 15)
      .lineTo(500, tableTop + 15)
      .stroke();
    
    // Add table data
    y = tableTop + 30;
    data.expenses.forEach(expense => {
      doc.text(new Date(expense.date).toLocaleDateString(), 50, y)
        .text(expense.description, 120, y, { width: 130 })
        .text(expense.category || 'Uncategorized', 260, y)
        .text(`₹${expense.amount.toFixed(2)}`, 380, y);
      
      y += 20;
      
      // Add page if needed
      if (y > 700) {
        doc.addPage();
        y = 50;
      }
    });
  }
  
  static generateVoucher(doc, data) {
    // Add title
    const voucherType = data.type.charAt(0).toUpperCase() + data.type.slice(1);
    doc.fontSize(20).text(`${voucherType} Voucher`, { align: 'center' });
    doc.moveDown();
    
    // Add voucher details
    doc.fontSize(12).text(`Voucher No: ${data.voucherNumber}`, { align: 'left' });
    doc.text(`Date: ${new Date(data.date).toLocaleDateString()}`, { align: 'left' });
    doc.text(`Firm: ${data.firmName}`, { align: 'left' });
    doc.moveDown();
    
    // Add party details
    doc.fontSize(12).text(`${data.type === 'sale' ? 'Customer' : 'Supplier'}: ${data.partyName}`, { align: 'left' });
    doc.moveDown();
    
    // Add table headers
    const tableTop = 200;
    doc.fontSize(10)
      .text('Item', 50, tableTop)
      .text('Quantity', 200, tableTop)
      .text('Rate', 280, tableTop)
      .text('Amount', 380, tableTop);
    
    // Add line
    doc.moveTo(50, tableTop + 15)
      .lineTo(500, tableTop + 15)
      .stroke();
    
    // Add table data
    let y = tableTop + 30;
    data.items.forEach(item => {
      doc.text(item.product.name, 50, y)
        .text(item.quantity.toString(), 200, y)
        .text(`₹${item.rate.toFixed(2)}`, 280, y)
        .text(`₹${item.amount.toFixed(2)}`, 380, y);
      
      y += 20;
    });
    
    // Add line
    doc.moveTo(50, y)
      .lineTo(500, y)
      .stroke();
    
    // Add total
    doc.fontSize(12)
      .text('Total Amount:', 280, y + 20)
      .text(`₹${data.totalAmount.toFixed(2)}`, 380, y + 20);
    
    // Add notes
    if (data.notes) {
      doc.moveDown(2);
      doc.fontSize(10).text('Notes:', { align: 'left' });
      doc.text(data.notes, { align: 'left' });
    }
    
    // Add signature
    doc.moveDown(4);
    doc.fontSize(10)
      .text('Authorized Signature', 380, doc.y, { align: 'center' });
  }
}

module.exports = PDFGenerator;