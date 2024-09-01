import React, { useEffect, useState } from 'react';

const ReadInvoice = ({ createdInvoices }) => {
  const [invoices, setInvoices] = useState([]);

  // Load invoices from localStorage when the component mounts
  useEffect(() => {
    const storedInvoices = localStorage.getItem('createdInvoices');
    if (storedInvoices) {
      setInvoices(JSON.parse(storedInvoices));
    }
  }, []);

  // Save invoices to localStorage whenever createdInvoices changes
  useEffect(() => {
    if (createdInvoices.length > 0) {
      setInvoices(createdInvoices);
      localStorage.setItem('createdInvoices', JSON.stringify(createdInvoices));
    }
  }, [createdInvoices]);

  return (
    <div className="read-invoice-container">
      <h2>Created Invoices</h2>
      {invoices.length === 0 ? (
        <p>No invoices have been created.</p>
      ) : (
        <table className="invoice-table">
          <thead>
            <tr>
              <th>Invoice ID</th>
              <th>Order ID</th>
              <th>Payment Method</th>
              <th>Invoice Date</th>
            </tr>
          </thead>
          <tbody>
            {invoices.map((invoice) => (
              <tr key={invoice._id}>
                <td>{invoice._id}</td>
                <td>{invoice.order._id}</td>
                <td>{invoice.payment}</td>
                <td>{new Date(invoice.createdAt).toLocaleDateString()}</td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
};

export default ReadInvoice;
