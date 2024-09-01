import React from 'react';
import './style/pagination.css'

const Pagination = ({ currentPage, totalPages, onPageChange }) => {

    const handlePrevious = () => {
    if (currentPage > 1) {
        onPageChange(currentPage - 1);
    }
    };

    const handleNext = () => {
    if (currentPage < totalPages) {
    onPageChange(currentPage + 1);
    }
    };

    const handlePageClick = (pageNumber) => {
    onPageChange(pageNumber);
    };

    const renderPageNumbers = () => {
    const pageNumbers = [];
    for (let i = 1; i <= totalPages; i++) {
    
    pageNumbers.push(
        <button
        key={i}
        onClick={() => handlePageClick(i)}
        className={`page-number ${currentPage === i ? 'active' : ''}`}
        >
        {i}
        </button>
      );
    }
    return pageNumbers;
  };

  return (
    <div className="pagination">
      <button onClick={handlePrevious} disabled={currentPage === 1}>
        Previous
    </button>
        {renderPageNumbers()}
        <button onClick={handleNext} disabled={currentPage === totalPages}>
        Next
        </button>
    </div>
    );
};

export default Pagination;
