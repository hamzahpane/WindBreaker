import React, { useEffect, useState } from 'react';
import Navbar from '../components/Navbar';
import Pagination from '../components/Pagination';
import Footer from '../components/Footer';
import { fetchProducts } from '../app/api/product';
import { IoBicycle } from "react-icons/io5";
import { PiTireFill } from "react-icons/pi";
import { IoMdArrowDropdown } from 'react-icons/io';
import Pedal from '../Img/pedals.png';
import Crank from '../Img/crank-arm.png';
import Handlebar from '../Img/handlebar.png';
import './stylee/menu.css';
import '../components/style/product.css';
import '../components/style/category.css';
import Loading from './Loading';
import { useStoreproduct } from '../stateM/productStore';
import Cart from '../components/Cart';
import toggleIsOpen from '../stateM/toggleStore';
const Menu = () => {
    const [products, setProducts] = useState([]);
    const [searchQuery, setSearchQuery] = useState('');
    const [selectedTag, setSelectedTag] = useState('');
    const [selectedCategory, setSelectedCategory] = useState('All');
    const [isOpen, setOpen] = useState(false);
    const [currentPage, setCurrentPage] = useState(1);
    const [loading  , setLoading] = useState(true);
    const [isLoading, setIsLoading] = useState(false);
    const itemsPerPage = 3;
    const addSelectedProduct = useStoreproduct((state) => state.addSelectedProduct);

    // Cart state
    const setIsCartOpen = toggleIsOpen((state) => state.setIsOpen)
    const isCartOpen = toggleIsOpen((state) => state.isOpen)
    
    
    useEffect(() => {
        const fetchData = async () => {
            const data = await fetchProducts(searchQuery, selectedTag, selectedCategory);
            setProducts(data);
            setIsLoading(false);
        };
        
        fetchData();
        const timer = setTimeout(() => {
            setIsLoading(false);
        }, 2000);
        return () => clearTimeout(timer);
    }, [searchQuery, selectedTag, selectedCategory, currentPage]);

    const handleSearch = (event) => {
        setSearchQuery(event.target.value);
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
    const handleSearchSubmit = (event) => {
        event.preventDefault();
        setCurrentPage(1);
    };

    const handleTagClick = (tag) => {
        setSelectedTag((prevTag) => (prevTag === tag ? '' : tag));
        setCurrentPage(1);
    };

    const handleCategoryClick = (category) => {
        setSelectedCategory(category);
        setCurrentPage(1);
        setOpen(false);
    };

    const toggleDropdown = () => {
        setOpen((prevState) => !prevState);
    };

    const handlePageChange = (pageNumber) => {
        setCurrentPage(pageNumber);
    };

    const handleAddProduct = (product) => {
        addSelectedProduct(product);
    };

    const handleTogleCart = () => {
        setIsCartOpen(!isCartOpen)
    }
    // Calculate pagination data
    const indexOfLastProduct = currentPage * itemsPerPage;
    const indexOfFirstProduct = indexOfLastProduct - itemsPerPage;
    const currentProducts = products.slice(indexOfFirstProduct, indexOfLastProduct);
    const totalPages = Math.ceil(products.length / itemsPerPage);

    // Tags array
    const tags = [
        { name: 'bicycle', icon: <IoBicycle size={24} /> },
        { name: 'tire', icon: <PiTireFill size={24} /> },
        { name: 'paddle', icon: <img src={Pedal} alt='' className='tag_image' /> },
        { name: 'chain', icon: <img src={Crank} alt='' className='tag_image' /> },
        { name: 'grip', icon: <img src={Handlebar} alt='' className='tag_image' /> }
    ];

    // Categories array
    const categories = [
        'all',
        'bicycle street',
        'bicycle Mountain',
        'tire street',
        'paddle street',
        'paddle Mountain',
        'chain street',
        'grip style',
    ];

    return (
        <>
            {isLoading ? (
                <Loading />
            ) : (
                <div className='Menu_Container'>
                    <div className='Header_container_Menu'>
                        <Navbar onCartClick={() => setIsCartOpen(true)} />
                    </div>

                    <div className='Hero_contoiner_Menu'>
                        <div className='trasnparan_hero_menu'>
                            <div className='text_hero_Menu'>
                                <h1>Ride in style and stand out from the crowd with our premium street</h1>
                                <div className='search_container'>
                                    <input
                                        type="text"
                                        placeholder="Search..."
                                        className='search_input'
                                        value={searchQuery}
                                        onChange={handleSearch}
                                    />
                                    <button
                                        type="button"
                                        className='search_button'
                                        onClick={handleSearchSubmit}
                                    >
                                        Search
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className='Content'>
                        <div className='Tags_container_Menu'>
                            {tags.map((tag) => (
                                <button
                                    key={tag.name}
                                    className={`tag_button ${selectedTag === tag.name ? 'active' : ''}`}
                                    onClick={() => handleTagClick(tag.name)}
                                >
                                    {tag.icon} {tag.name}
                                </button>
                            ))}
                        </div>

                        <div className='Container_Box'>
                            <div className='Box1'>
                                <div className='Category_Container'>
                                    <div className='title_Category'>
                                        <h1>Category</h1>
                                    </div>
                                    <div className='dropdown'>
                                        <button onClick={toggleDropdown} className='dropdown_button'>
                                            {selectedCategory} <IoMdArrowDropdown size={20} />
                                        </button>
                                        {isOpen && (
                                            <div className='dropdown_content'>
                                                {categories.map((category, index) => (
                                                    <div
                                                        key={index}
                                                        className={`item ${selectedCategory === category ? 'active' : ''}`}
                                                        onClick={() => handleCategoryClick(category)}
                                                    >
                                                        {category}
                                                    </div>
                                                ))}
                                            </div>
                                        )}
                                    </div>
                                </div>
                            </div>
                            <div className='Box2'>
                                <div className="product-list">
                                    {currentProducts.length > 0 ? (
                                        currentProducts.map((product) => (
                                            <div key={product.id} className="product-card">
                                                <img
                                                    src={`http://localhost:4000/images/products/${product.image_url}`}
                                                    alt={product.title}
                                                    className="product-image"
                                                />
                                                <div className="product-details">
                                                    <h3 className="product-title">{product.name}</h3>
                                                    <p className="product-price">{product.price}</p>
                                                    <div className="button-container">
                                                        <button className="add-button" onClick={() => handleAddProduct(product)}>Tambahkan</button>
                                                    </div>
                                                </div>
                                            </div>
                                        ))
                                    ) : (
                                        <p>No products available.</p>
                                    )}
                                </div>
                            </div>
                        </div>

                        <div className='pagination_container'>
                            <Pagination
                                currentPage={currentPage}
                                totalPages={totalPages}
                                onPageChange={handlePageChange}
                            />
                        </div>
                    </div>

                    <div className='Footer_Menu'>
                        <Footer />
                    </div>
                    {
                        isCartOpen &&
                        <Cart isOpen={isCartOpen} handleClick={handleTogleCart} />
                    }                
                </div>
            )}
        </>
    );
};

export default Menu;
