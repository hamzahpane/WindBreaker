import React, { useEffect, useState } from 'react';
import { FaArrowLeft } from 'react-icons/fa';
import './stylee/Invoice.css';
import Loading from './Loading';
import { NavLink } from 'react-router-dom';
import { getInvoice } from '../app/api/invoice';

const Invoice = () => {
  const token = localStorage.getItem('Token');
  const [loading, setLoading] = useState(true);
  const [invoices, setInvoices] = useState([]);

  useEffect(() => {
    const fetchInvoices = async () => {
      try {
        const response = await getInvoice(token);
        console.log(response.data); // Memeriksa struktur data yang diterima
        setInvoices(response.data);
        setLoading(false);
      } catch (error) {
        console.error('Error fetching invoices:', error);
        setLoading(false);
      }
    };

    fetchInvoices();
  }, [token]);

  if (loading) {
    return <Loading />; // Menampilkan halaman loading saat data sedang dimuat
  }

  return (
    <div className="invoice-container">
      <div className="HeaderInvoice">
        <NavLink to="/Menu"><FaArrowLeft /> Back to Menu</NavLink>
      </div>

      <div className='ContainerInvoice'> 
        <button className='invoice-button'>Read Invoice</button>
      </div>

      <div className='containerbox'> 
        {invoices.length > 0 ? (
          <table className="invoice-table">
            <thead>
              <tr>
                <th>Order Date</th>
                <th>Total Amount</th>
                <th>Delivery Address</th>
                <th>Items</th>
                <th>Payment</th>
              </tr>
            </thead>
            <tbody>
              {invoices.map(invoice => (
                <tr key={invoice._id}>
                  <td>{new Date(invoice.order.orderDate).toLocaleDateString()}</td>
                  <td>{invoice.order.totalAmount}</td>
                  <td>
                    {invoice.order.deliveryAddress.alamat}, {invoice.order.deliveryAddress.kecamatan}, {invoice.order.deliveryAddress.kelurahan}, {invoice.order.deliveryAddress.kabupaten}
                  </td>
                  <td>
                    <ul>
                      {invoice.order.orderItems.map(item => (
                        <li key={item._id}>
                          {item.name} - {item.quantity} x ${item.price}
                        </li>
                      ))}
                    </ul>
                  </td>
                  <td>{invoice.order.payment}</td>
                </tr>
              ))}
            </tbody>
          </table>
        ) : (
          <p>No invoices found.</p>
        )}
      </div>
    </div>
  );
};

export default Invoice;
