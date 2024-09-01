import React, { useState, useEffect } from 'react';
import { deleteOrder, getOrders } from '../app/api/order';
import { getpay } from '../app/api/payment';
import { CreateInvoice } from '../app/api/invoice';

import './style/cretInvo..css';

const CreateInvo = ({ setCreatedInvoice }) => {
  const [orders, setOrders] = useState([]);
  const [selectedOrderId, setSelectedOrderId] = useState('');
  const [paymentMethod, setPaymentMethod] = useState('');
  const [paymentOptions, setPaymentOptions] = useState([]);
  const [processedOrders, setProcessedOrders] = useState(new Set()); // Menyimpan order yang sudah diproses
  const token = localStorage.getItem('Token');

  // Fetch orders dan filter order yang sudah diproses
  useEffect(() => {
    const fetchOrders = async () => {
      console.log('getOrders');
      try {
        const response = await getOrders(token);
        // Filter orders untuk hanya menampilkan yang belum diproses
        const filteredOrders = response.data.filter(order => !processedOrders.has(order._id));
        setOrders(filteredOrders);
      } catch (error) {
        console.error('Error fetching orders:', error);
      }
    };

    fetchOrders();
  }, [token, processedOrders]); // Tambahkan processedOrders sebagai dependency

  useEffect(() => {
    const fetchPaymentOptions = async () => {
      try {
        const response = await getpay();
        setPaymentOptions(response.data);
      } catch (error) {
        console.error('Error fetching payment options:', error);
      }
    };

    fetchPaymentOptions();
  }, []);

  const handlePaymentChange = (e) => {
    setPaymentMethod(e.target.value);
  };

  const handleDeleteOrder = async (orderId) => {
    try {
      await deleteOrder(orderId, token);
      alert('Order deleted successfully.');
      
      // Refetch orders after deletion
      const ordersResponse = await getOrders(token);
      const filteredOrders = ordersResponse.data.filter(order => !processedOrders.has(order._id));
      setOrders(filteredOrders);
    } catch (error) {
      console.error('Error deleting order:', error);
      alert('Failed to delete order.');
    }
  };

  const handleCreateInvoice = async () => {
    if (selectedOrderId && paymentMethod) {
      try {
        const payload = {
          order_id: selectedOrderId,
          payment_id: paymentMethod,
        };
        const response = await CreateInvoice(payload, token);
        alert('Invoice created successfully!');
        console.log('Invoice:', response.data);

        // Set invoice yang baru dibuat ke state di parent component
        setCreatedInvoice(response.data);

        // Tambahkan order yang telah dibuat invoice ke set processedOrders
        setProcessedOrders(prev => new Set(prev).add(selectedOrderId));

        // Hapus order setelah invoice dibuat
        await handleDeleteOrder(selectedOrderId);

        // Reset pilihan setelah invoice dibuat
        setSelectedOrderId('');
        setPaymentMethod('');

      } catch (error) {
        console.error('Error creating invoice or deleting order:', error);
        alert('Failed to create invoice or delete order.');
      }
    } else {
      alert('Please select an order and a payment method.');
    }
  };

  return (
    <div className="invoice-container">
      {orders.length === 0 ? (
        <p>No orders found.</p>
      ) : (
        <div className="invoicontainer">
          <table className="invoice-table">
            <thead>
              <tr>
                <th>Select</th>
                <th>Order ID</th>
                <th>Order Date</th>
                <th>Delivery Address</th>
                <th>Order Items</th>
                <th>Total Amount</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              {orders.map((order) => (
                <tr
                  key={order._id}
                  className={selectedOrderId === order._id ? 'selected-row' : ''}
                >
                  <td>
                    <input
                      type="radio"
                      name="selectedOrder"
                      value={order._id}
                      onChange={() => setSelectedOrderId(order._id)}
                    />
                  </td>
                  <td>{order._id}</td>
                  <td>{new Date(order.orderDate).toLocaleDateString()}</td>
                  <td>
                    <p>
                      Address: {order.deliveryAddress?.Kelurahan || 'N/A'},{' '}
                      {order.deliveryAddress?.Kecamatan || 'N/A'},{' '}
                      {order.deliveryAddress?.Kabupaten || 'N/A'}
                    </p>
                  </td>
                  <td>
                    <ul>
                      {order.orderItems.map((item) => (
                        <li key={item._id}>
                          {item.name} - ${item.price} x {item.quantity}
                        </li>
                      ))}
                    </ul>
                  </td>
                  <td>${order.totalAmount}</td>
                  <td>
                    <button
                      onClick={() => handleDeleteOrder(order._id)}
                      className="delete-button"
                    >
                      Delete Order
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>

          <div className="payment-section">
            <label htmlFor="payment">Choose Payment Method:</label>
            <select id="payment" value={paymentMethod} onChange={handlePaymentChange}>
              <option value="">-- Select Payment Method --</option>
              {paymentOptions.map((option) => (
                <option key={option._id} value={option._id}>
                  {option.Name}
                </option>
              ))}
            </select>
          </div>

          <div className="submit-section">
            <button onClick={handleCreateInvoice} className="submit-button">
              Create Invoice
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default CreateInvo;
