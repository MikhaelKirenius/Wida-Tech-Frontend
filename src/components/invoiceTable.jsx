import React from 'react';
import { formatDate } from "../utils/formatDate";
import { formatCurrency } from '../utils/formatCurrency';

const InvoiceTable = ({ items, status, error, page, limit, onNextPage, onPreviousPage, onLimitChange }) => {
  if (status === "failed") {
    return <div>Error: {error}</div>;
  }

  return (
    <div className="overflow-x-auto">
      <div className="flex justify-center">
        <div className="w-4/5 border p-4 rounded-lg shadow-xl">
          <h1 className="font-bold text-center w-full text-2xl">Invoice Data</h1>
          <div className="flex justify-end mb-4">
            <select className="select select-primary max-w-xs" value={limit} onChange={onLimitChange}>
              <option disabled selected>Limit</option>
              <option value="10">10</option>
              <option value="20">20</option>
              <option value="50">50</option>
            </select>
          </div>
          
          <table className="table mx-auto">
            <thead>
              <tr>
                <th>Date</th>
                <th>Customer Name</th>
                <th>Sales Person Name</th>
                <th>Total Amount Paid</th>
                <th>Notes</th>
              </tr>
            </thead>
            <tbody>
            {items.map((invoice) => (
                <tr key={invoice.id} className="hover">
                    <th>{formatDate(invoice.date)}</th>
                    <td>{invoice.customer_name}</td>
                    <td>{invoice.salesperson_name}</td>
                    <td>{formatCurrency(invoice.total_amount_paid)}</td>
                    <td>{invoice.notes}</td>
                </tr>
            ))}
            </tbody>
          </table>
          <div className="flex flex-row justify-center my-3 gap-5">
            <button className="btn btn-outline w-30" onClick={onPreviousPage} disabled={page <= 1}>Previous</button>
            <button className="btn btn-outline w-40" onClick={onNextPage}>Next</button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default InvoiceTable;