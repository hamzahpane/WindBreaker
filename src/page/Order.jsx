import React, { useState, useEffect } from 'react';
import { FaArrowLeft, FaTrash } from 'react-icons/fa';
import './stylee/order.css';
import { NavLink, useNavigate } from 'react-router-dom';
import { useAddressStore } from '../stateM/addresStore';
import Pagination from '../components/Pagination';
import { useStoreproduct } from '../stateM/productStore';
import Loading from './Loading';
import { getpay } from '../app/api/payment';
import { createOrder } from '../app/api/order';

const Order = () => {
  const { address, updateAddressField, clearAddress } = useAddressStore();
  const [paymentMethod, setPaymentMethod] = useState('');
  const [paymentOptions, setPaymentOptions] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [isAddressSubmitted, setIsAddressSubmitted] = useState(false);
  const [loading, setLoading] = useState(true);
  const token = localStorage.getItem('Token');
  const navigate = useNavigate(); 
  const itemsPerPage = 3;
  const deliveryFee = 50000; // Fixed delivery fee for this example
  const { removeSelectedProduct } = useStoreproduct((state) => ({
    removeSelectedProduct: state.removeSelectedProduct,
  }));

  // State untuk produk di cart
  const [products, setProducts] = useState(() => {
    const savedProducts = localStorage.getItem('cartProducts');
    return savedProducts ? JSON.parse(savedProducts) : [];
  });

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

  // Menghitung total harga
  const totalProductPrice = products.reduce(
    (acc, product) => acc + product.price * product.quantity,
    0
  );
  
  const totalAmount = totalProductPrice + deliveryFee;

  const indexOfLastProduct = currentPage * itemsPerPage;
  const indexOfFirstProduct = indexOfLastProduct - itemsPerPage;
  const currentProducts = products.slice(indexOfFirstProduct, indexOfLastProduct);
  const totalPages = Math.ceil(products.length / itemsPerPage);

  // Mengubah input alamat
  const handleChange = (e) => {
    const { id, value } = e.target;
    updateAddressField(id, value);
  };

  // Menghapus produk dari cart
  const handleRemoveProduct = (productId) => {
    removeSelectedProduct(productId);
    const updatedProducts = products.filter(product => product._id !== productId);
    setProducts(updatedProducts);
    localStorage.setItem('cartProducts', JSON.stringify(updatedProducts));
  };

  const handleCreateOrder = async () => {
    if (!token) {
      alert('Token is missing. Please login again.');
      return;
    }

    if (products.length === 0) {
      alert('Your cart is empty.');
      return;
    }

    if (!paymentMethod) {
      alert('Please select a payment method.');
      return;
    }

    // Cek jika semua field alamat terisi
    if (!address.kecamatan || !address.kelurahan || !address.kabupaten || !address.alamat) {
      alert('Please fill in your address before creating an order.');
      return;
    }

    const payload = {
      products: products.map(product => ({
        name: product.name, // Pastikan nama field sesuai dengan controller
        price: product.price,
        quantity: product.quantity
      })),
      deliveryAddress: {
        kecamatan: address.kecamatan,
        kelurahan: address.kelurahan,
        kabupaten: address.kabupaten,
        alamat: address.alamat
      },
      totalProductPrice: totalProductPrice,
      totalAmount: totalAmount,
      payment_id: paymentMethod
    };

    try {
      const response = await createOrder(payload, token);
      console.log(response);
      alert('Order created successfully!');
      navigate('/Invoice'); 
      localStorage.removeItem('cartProducts');
      setProducts([]);
      clearAddress();
      setIsAddressSubmitted(false); 
    } catch (error) {
      console.error('Error creating order:', error);
      alert('Failed to create order. Please try again.');
    }
  };

  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  // Simulasi data loading
  useEffect(() => {
    setTimeout(() => {
      setLoading(false);
    }, 1000); // Ganti dengan waktu loading yang sesuai
  }, []);

  if (loading) {
    return <Loading />;
  }

  return (
    <div className='Ordercontainer'>
      <div className='OrderHeader'>
        <NavLink to="/Menu"> <FaArrowLeft />  Order </NavLink>
      </div>
      
      <div className='OrderDeliv'>
        <h1>Your Address</h1>
        {isAddressSubmitted ? (
          <div className="addressSummary">
            <h2>Saved Address</h2>
            <ul>
              <li>Kecamatan: {address.kecamatan}</li>
              <li>Kelurahan: {address.kelurahan}</li>
              <li>Kabupaten: {address.kabupaten}</li>
            </ul>
          </div>
        ) : (
          <form className='orderForm'>
            <div className='formGroup'>
              <label htmlFor='kecamatan'>Kecamatan</label>
              <input
                type='text'
                id='kecamatan'
                value={address.kecamatan}
                onChange={handleChange}
                placeholder='Masukkan kecamatan'
                required
              />
            </div>
            <div className='formGroup'>
              <label htmlFor='kelurahan'>Kelurahan</label>
              <input
                type='text'
                id='kelurahan'
                value={address.kelurahan}
                onChange={handleChange}
                placeholder='Masukkan kelurahan'
                required
              />
            </div>
            <div className='formGroup'>
              <label htmlFor='kabupaten'>Kabupaten</label>
              <input
                type='text'
                id='kabupaten'
                value={address.kabupaten}
                onChange={handleChange}
                placeholder='Masukkan kabupaten'
                required
              />
            </div>
          </form>
        )}
      </div>

      <div className='boxOrder'>
        <div className='boxorder1'>
          <h1>Your Cart</h1>
          <div className="textareaContainer">
            <label htmlFor="orderNotes">Add notes to your order:</label>
            <textarea 
              id="alamat" 
              placeholder="Isi alamat kamu "
              value={address.alamat}
              required 
              onChange={handleChange}
              rows="4" 
              cols="50"
            />
          </div>

          {currentProducts.length > 0 ? (
            <>
              <table className="productTable">
                <thead>
                  <tr>
                    <th>Image</th>
                    <th>Product Name</th>
                    <th>Price</th>
                    <th>Quantity</th>
                    <th>Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {currentProducts.map((product) => (
                    <tr key={product._id}>
                      <td>
                        <img 
                          src={`http://localhost:4000/images/products/${product.image_url}`}
                          alt={product.name} 
                          className='cart-image'
                        />
                      </td>
                      <td className='Textproduct'>{product.name}</td>
                      <td className='Textproduct'>${product.price}</td>
                      <td className='Textproduct'>{product.quantity}</td>
                      <td>
                        <button 
                          onClick={() => handleRemoveProduct(product._id)} 
                          className="removeProductButton"
                        >
                          <FaTrash /> Remove
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
              <Pagination
                currentPage={currentPage}
                totalPages={totalPages}
                onPageChange={handlePageChange}
              />
            </>
          ) : (
            <p style={{ fontSize: '10px', color: 'black', fontFamily: 'Rubik Mono One, monospace' }}>Your cart is empty.</p>
          )}
        </div>
        <div className='boxorder2'>
          <h1>Order Summary</h1> 
          <h2>Check your order and the address you entered before placing your order.</h2>
          <h3>Total Product Price: ${totalProductPrice}</h3>
          <h3>Delivery Fee: ${deliveryFee}</h3>
          <h3>Total Amount: ${totalAmount}</h3>
          <div className="paymentMethods">
            <label htmlFor="paymentMethod">Payment Method:</label>
            <select id="paymentMethod" value={paymentMethod} onChange={handlePaymentChange}>
              <option value="">Select Payment Method</option>
              {paymentOptions.map(option => (
                <option key={option._id} value={option._id}>
                  {option.Name}
                </option>
              ))}
            </select>
          </div>
          <button className='OrderButton' onClick={handleCreateOrder}>Confirm Order</button>
        </div>
      </div>
    </div>
  );
};

export default Order;
