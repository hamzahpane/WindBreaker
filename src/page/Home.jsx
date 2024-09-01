import React, { useEffect, useState } from 'react';
import { NavLink } from 'react-router-dom';
import './stylee/home.css';
import Loading from './Loading';


const Home = () => {
  const [isLoading, setIsLoading] = useState(true); // Loading state

useEffect(() => {
  const timer = setTimeout(() => {
    setIsLoading(false); // Stop loading after a delay (simulate loading time)
  }, 2000); // Set your desired loading time

  return () => clearTimeout(timer); // Cleanup timer
}, []);

  return (
    <>

{isLoading ? (
        <Loading /> // Show loading component when loading
      ) : (
      <div>
  
        <div className='container_home'>
            <div className='trasnparan_hero'> 
                    <div className='Text_hero'> 
                        <h1>  "Ride Unique Customize Your 
                              Perfect Bike with Us!"  </h1>
                        <text>
                        Customize your frame, color, and components for a 
                        ride that's uniquely yours.Start 
                        designing now! </text>
                        <NavLink to='/Menu'> Order Now </NavLink>
                    </div>
            </div>
        </div>
      </div> 
      )
    }
    </>
  );
};

export default Home;
