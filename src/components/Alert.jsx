import React from 'react';
import './style/Alert.css';

const Alert = ({ message, type, onClose }) => {
    if (!message) return null;

    return (
    <div className={`alert ${type}`}>
    <span>{message}</span>
    <button onClick={onClose} className="closeBtn">x</button>
    </div>
);
};

export default Alert;
