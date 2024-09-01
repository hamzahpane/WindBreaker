import React, { useState, useEffect } from 'react';
import { NavLink, useLocation, useNavigate } from 'react-router-dom';
import { IoCartSharp } from "react-icons/io5";
import { BsBicycle } from "react-icons/bs";
import { AiOutlineClose } from 'react-icons/ai';
import { IoMdList } from 'react-icons/io';
import useAuthStore from '../stateM/authstore';
import useUserStore from '../stateM/user';
import { useStoreproduct } from '../stateM/productStore';
import toggleIsOpen from '../stateM/toggleStore';
import './style/navbar.css';  // Pastikan untuk menambahkan style CSS yang akan kita buat

const Navbar = () => {
    const [clicked, setClicked] = useState(false);
    const [hasNewProducts] = useState(false);
    const [profileDropdownOpen, setProfileDropdownOpen] = useState(false);
    const [showAlert, setShowAlert] = useState(false);  // State untuk mengontrol visibilitas alert
    const location = useLocation();
    const navigate = useNavigate();
    const { token, logout, setToken } = useAuthStore();
    const { user, fetchUser } = useUserStore();
    const setIsOpenCart = toggleIsOpen((state) => state.setIsOpen);
    const isOpenCart = toggleIsOpen((state) => state.isOpen);
    const selectedProducts = useStoreproduct((state) => state.selectedProducts);
    const total = selectedProducts.reduce((total, product) => total + product.quantity, 0);

    useEffect(() => {
        const token = localStorage.getItem('Token');
        setToken(token);
    }, [setToken]);

    useEffect(() => {
        setClicked(false);
    }, [location]);

    useEffect(() => {
        if (token) {
            fetchUser();
        }
    }, [token, fetchUser]);

    const handleClick = () => {
        setClicked(!clicked);
    };

    const handleLogout = async () => {
        await logout();
        localStorage.removeItem('Token');
        navigate('/');
    };

    const toggleProfileDropdown = () => {
        setProfileDropdownOpen(!profileDropdownOpen);
    };

    const handleOrderClick = (e) => {
        if (!token) {
            e.preventDefault();  // Mencegah navigasi jika tidak ada token
            setShowAlert(true);  // Tampilkan alert custom
        } else {
            navigate('/Order');  // Lanjutkan ke halaman Order jika ada token
        }
    };

    const handleInvoiceClick = (e) => {
        if (!token) {
            e.preventDefault();  // Mencegah navigasi jika tidak ada token
            setShowAlert(true);  // Tampilkan alert
        } else {
            navigate('/Invoice');  
        }
    };

    const handleCartClick = () => {
        if (!token) {
            setShowAlert(true);  // Tampilkan alert jika tidak ada token
        } else {
            setIsOpenCart(!isOpenCart);  // Buka atau tutup cart jika ada token
        }
    };

    const closeAlert = () => {
        setShowAlert(false);  // Menyembunyikan alert
    };

    const handleContinue = () => {
        navigate('/Login');  // Navigasi ke halaman login
        setShowAlert(false);
    };

    return (
        <div className="Navbar_Container">
            <div className='Logo'>
                <NavLink to="/"> <BsBicycle size={20}/> WindBreaker </NavLink> 
            </div>

            <ul id="Navbar" className={clicked ? 'Navbar active' : 'Navbar'}>
                <li><NavLink exact to="/" activeClassName="active">Home</NavLink></li>
                <li><NavLink to="/menu" activeClassName="active">Menu</NavLink></li>
                <li><NavLink to="/Order" activeClassName="active" onClick={handleOrderClick}>Order</NavLink></li>
                <li><NavLink to="/Invoice" activeClassName="active" onClick={handleInvoiceClick}>Invoice</NavLink></li>
                <li><NavLink to="/contact" activeClassName="active">Contact</NavLink></li>
            </ul>

            <div id='cart_login'>
                <div className={`cart-item-container ${hasNewProducts ? 'new-product' : ''}`}>
                    <button className="cart-item" onClick={handleCartClick}>
                        <IoCartSharp />
                    </button>
                    <div className="cart-item-count">{total}</div> 
                </div>

                {token ? (
                    <div className="profile-dropdown">
                        <button className='button_profile' onClick={toggleProfileDropdown}>
                            {user?.username}
                        </button>
                        {profileDropdownOpen && (
                            <div className="dropdown-menu">
                                <div className="dropdown-item">Name: {user?.username}</div>
                                <button className="dropdown-item" onClick={handleLogout}>Logout</button>
                            </div>
                        )}
                    </div>
                ) : (
                    <NavLink className='button_login' to="/Login">Login</NavLink>
                )}

                <div id="Menu-icons" onClick={handleClick}>
                    {clicked ? <AiOutlineClose color='#021526' /> : <IoMdList color='#021526' />}
                </div>
            </div>

            {/* Custom Alert */}
            {showAlert && (
                <div className="custom-alert">
                    <div className="alert-content">
                        <p>You must be logged in to access the cart.</p>
                        <div className="alert-buttons">
                            <button className="alert-button-close" onClick={closeAlert}>Tutup</button>
                            <button className="alert-button-continue" onClick={handleContinue}>Continue</button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default Navbar;
