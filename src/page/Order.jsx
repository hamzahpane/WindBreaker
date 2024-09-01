import React, { useState, useEffect } from 'react';
import { FaArrowLeft, FaTrash } from 'react-icons/fa';
import './stylee/order.css';
import { NavLink, useNavigate } from 'react-router-dom';
import { useAddressStore } from '../stateM/addresStore';
import Pagination from '../components/Pagination';
import { useStoreproduct } from '../stateM/productStore';
import { postordersItem } from '../app/api/orderItem';
import Loading from './Loading';

const Order = () => {
  const { address, updateAddressField, clearAddress } = useAddressStore();
  const [currentPage, setCurrentPage] = useState(1);
  const [isAddressSubmitted, setIsAddressSubmitted] = useState(false);
  const [loading, setLoading] = useState(true);
  const token = localStorage.getItem('Token');
  const navigate = useNavigate(); 
  const itemsPerPage = 3;
  const { removeSelectedProduct } = useStoreproduct((state) => ({
    removeSelectedProduct: state.removeSelectedProduct,
  }));

  // State untuk produk di cart
  const [products, setProducts] = useState(() => {
    const savedProducts = localStorage.getItem('cartProducts');
    return savedProducts ? JSON.parse(savedProducts) : [];
  });

  // Menghitung total harga
  const totalPrice = products.reduce(
    (acc, product) => acc + product.price * product.quantity,
    0
  );

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

  const handleCreateOrderItem = async () => {
    if (!token) {
      alert('Token is missing. Please login again.');
      return;
    }

    if (products.length === 0) {
      alert('Your cart is empty.');
      return;
    }

    // Cek jika semua field alamat terisi
    if (!address.kecamatan || !address.kelurahan || !address.kabupaten) {
      alert('Please fill in your address before creating an order.');
      return;
    }

    const payload = {
      products: products.map(product => ({
        Nama: product.name,
        Harga: product.price,
        quantity: product.quantity
      })),
      deliveryAddress: {
        kecamatan: address.kecamatan, // Pastikan nama properti sesuai dengan schema
        kelurahan: address.kelurahan,
        kabupaten: address.kabupaten
      },
      totalAmount: totalPrice // Mengirimkan totalAmount, bukan totalPrice
    };

    try {
      const response = await postordersItem(payload, token);
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
    // Simulasi loading
    setTimeout(() => {
      setLoading(false);
    }, 1000); // Ganti dengan waktu loading yang sesuai
  }, []);

  if (loading) {
    return <Loading />; // Menampilkan halaman loading saat data sedang dimuat
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
            <p>Your cart is empty.</p>
          )}
        </div>
        <div className='boxorder2'>
          <h1>Order Summary</h1> 
          <h2> Check your order and the address you entered before placing your order.</h2>
          <h3>Total Price: ${totalPrice}</h3> {/* Menampilkan total harga */}
          <button onClick={handleCreateOrderItem}>Create Order</button>
        </div>
      </div>
    </div>
  );
};

export default Order;
