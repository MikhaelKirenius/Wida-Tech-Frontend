
const addInvoicePrefix = '/add-invoice';
const getInvoicePrefix = '/invoices';
const getDailyInvoicePrefix = '/revenue/daily';
const getWeeklyInvoicePrefix = '/revenue/weekly';
const getMonthlyInvoicePrefix = '/revenue/monthly';
const getProductsPrefix = '/products';
const getSummaryPrefix = '/invoices-summary';

export const endpoint = {
    addInvoice: addInvoicePrefix,
    getInvoice: getInvoicePrefix,
    getProducts: getProductsPrefix,
    getDailyInvoice: getDailyInvoicePrefix,
    getWeeklyInvoice: getWeeklyInvoicePrefix,
    getMonthlyInvoice: getMonthlyInvoicePrefix,
    getSummary: getSummaryPrefix
};