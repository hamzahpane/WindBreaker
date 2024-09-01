import React, {  useEffect ,useState } from 'react';
import { FaArrowLeft } from 'react-icons/fa';
import './stylee/Invoice.css';
import { NavLink } from 'react-router-dom';
import CreateInvo from '../components/CreateInvoice';
import ReadInvoice from '../components/ReadInvoice'; // Komponen baru untuk menampilkan invoice yang sudah dibuat
import Loading from './Loading';

const Invoice = () => {
  // State untuk mengelola tab yang aktif ("create" atau "read")
  const [activeTab, setActiveTab] = useState('create');
  const [createdInvoices, setCreatedInvoices] = useState([]); // State untuk menyimpan invoice yang sudah dibuat
  const [loading ,  setLoading] = useState(true);

  const handleCreateInvoice = (newInvoice) => {
    setCreatedInvoices([...createdInvoices, newInvoice]); // Tambahkan invoice baru ke daftar createdInvoices
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
    <div className="invoice-container">
      <div className="HeaderInvoice">
        <NavLink to="/Menu"><FaArrowLeft /> Back to Menu</NavLink>
      </div>

      <div className="ContainerInvoice">
        {/* Tombol untuk memilih tab */}
        <button
          className={`invoice-button ${activeTab === 'create' ? 'active' : ''}`}
          onClick={() => setActiveTab('create')}
        >
          Create Invoice
        </button>
        <button
          className={`invoice-button ${activeTab === 'read' ? 'active' : ''}`}
          onClick={() => setActiveTab('read')}
        >
          Read Invoice
        </button>
      </div>

      {/* Konten yang ditampilkan berdasarkan tab yang aktif */}
      <div className="containerbox">
        {activeTab === 'create' ? (
          <CreateInvo setCreatedInvoice={handleCreateInvoice} createdInvoices={createdInvoices} />
        ) : (
          <ReadInvoice createdInvoices={createdInvoices} /> // Menampilkan invoice yang sudah dibuat
        )}
      </div>
    </div>
  );
};

export default Invoice;
