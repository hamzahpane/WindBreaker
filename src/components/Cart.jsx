import React from 'react';
import { useNavigate } from 'react-router-dom';
import './style/cart.css';
import { useStoreproduct } from '../stateM/productStore';

const Cart = ({ isOpen, handleClick }) => {
    const navigate = useNavigate();
    const { selectedProducts, removeSelectedProduct, clearAllSelectedProducts, incrementProductQuantity, decrementProductQuantity } = useStoreproduct((state) => ({
        selectedProducts: state.selectedProducts,
        removeSelectedProduct: state.removeSelectedProduct,
        clearAllSelectedProducts: state.clearAllSelectedProducts,
        incrementProductQuantity: state.incrementProductQuantity,
        decrementProductQuantity: state.decrementProductQuantity,
    }));

    const handleRemoveProduct = (productId) => {
        removeSelectedProduct(productId);
    };

    const handleIncrement = (productId) => {
        incrementProductQuantity(productId);
    };

    const handleDecrement = (productId) => {
        decrementProductQuantity(productId);
    };

    const handleClearCart = () => {
        clearAllSelectedProducts();
    };

    const handleSubmitOrder = () => {
        // Simpan selectedProducts ke localStorage sebelum pindah ke halaman Order
        localStorage.setItem('cartProducts', JSON.stringify(selectedProducts));
        navigate('/Order');
    };

    const totalPrice = selectedProducts.reduce((total, product) => {
        return total + (product.price * product.quantity);
    }, 0);

    return (
        <div className={`cart-container ${isOpen ? 'open' : 'closed'}`}>
            <button className="cart-close-button" onClick={handleClick}>X</button>
            <h1>Your Cart</h1>
            {selectedProducts.length > 0 ? (
                <div className="cart-items">
                    {selectedProducts.map((product) => (
                        <div key={product._id} className="cartitem">
                            <div className="cart-item-details">
                                <h3 className="cart-item-title">{product.name}</h3>
                                <p className="cart-item-price">${(product.price * product.quantity)}</p>
                                <div className="cart-item-quantity">
                                    <button
                                        className="quantity-button"
                                        onClick={() => handleDecrement(product._id)}
                                    >
                                        -
                                    </button>
                                    <span className="quantity">{product.quantity}</span>
                                    <button
                                        className="quantity-button"
                                        onClick={() => handleIncrement(product._id)}
                                    >
                                        +
                                    </button>
                                </div>
                                <button
                                    className="remove-button"
                                    onClick={() => handleRemoveProduct(product._id)}
                                >
                                    Remove
                                </button>
                            </div>
                        </div>
                    ))}
                    <button className="clear-cart-button" onClick={handleClearCart}>
                        Clear Cart
                    </button>
                    <div className="total-price">
                        <span>Total Price: </span>
                        <span>${totalPrice.toFixed(2)}</span>
                    </div>
                    <button className='Submit_cart' onClick={handleSubmitOrder}>
                        Submit Orderan
                    </button>
                </div>
            ) : (
                <p>Your cart is empty.</p>
            )}
        </div>
    );
};

export default Cart;
