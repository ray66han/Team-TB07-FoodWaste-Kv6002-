import React from 'react';
import './styles/HomePage.css';

function HomePage() {
return (
    <>
        {/* Banner Section */}
        <div className="banner">
            <div className="banner-content">
                <h1>Want to save FoodWaste!</h1>
                <p>It's Easy to achieve. For managing your fridge food items click "Your Fridge".</p>
                <button className="banner-btn">Your Fridge</button>
            </div>
        </div>

        <div className="container">
            {/* About Us - Section */}
            <div className="about-us-section">
                <div className="about-us-content">
                    <div className="about-us-text">
                        <h2>About Us</h2>
                        <p>
                            We are a team of passionate individuals committed to providing high-quality services. 
                            Our goal is to create impactful solutions and deliver them with excellence.
                        </p>
                    </div>
                    <div className="about-us-image">
                        <img
                            src="https://via.placeholder.com/400" /* Replace with your image URL */
                            alt="About Us"
                        />
                    </div>
                </div>
            </div>
        </div>

        <div className="container">
            {/* Impact of Food Waste Section */}
            <div className="impact-section">
                <div className="impact-text">
                    <h2>Impact of Food Waste</h2>
                    <p>
                        Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur.irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. erit in voluptate velit esse cillum dolore eu fugiat nulla pariatur.irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur.
                    </p>
                </div>
                
                <div className="impact-image-section">
                    <div className="impact-image">
                        <img src="https://via.placeholder.com/150x500" alt="Food Waste Impact" />
                        <div className="image-overlay">Image 1</div>
                    </div>
                    <div className="impact-image">
                        <img src="https://via.placeholder.com/150x500" alt="Food Waste Impact" />
                        <div className="image-overlay">Image 2</div>
                    </div>
                    <div className="impact-image">
                        <img src="https://via.placeholder.com/150x500" alt="Food Waste Impact" />
                        <div className="image-overlay">Image 3</div>
                    </div>
                </div>
            </div>
        </div>


    {/* Educational Videos Section */}
    <div className="educational-video-section">
            <div className="section-header">
                <h2>Educational Videos</h2>
            </div>

            <div className="carousel">
                {/* Carousel for YouTube videos */}
                <div className="carousel-inner">
                    <div className="carousel-item">
                        <iframe
                            src="https://www.youtube.com/embed/1MpfEeSem_4?si=XqlTnu4B4Zf0XIS2"
                            title="YouTube video 1"
                            frameBorder="0"
                            allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture"
                            allowFullScreen
                            className="carousel-video"
                        ></iframe>
                    </div>
                    <div className="carousel-item">
                        <iframe
                            src="https://www.youtube.com/embed/BmDZU1UTBeY?si=gJRzpEyuthR8-7zq"
                            title="YouTube video 2"
                            frameBorder="0"
                            allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture"
                            allowFullScreen
                            className="carousel-video"
                        ></iframe>
                    </div>
                    <div className="carousel-item">
                        <iframe
                            src="https://www.youtube.com/embed/wgLuXvtaLyQ?si=7tyLRWPRufSS4u4N"
                            title="YouTube video 3"
                            frameBorder="0"
                            allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture"
                            allowFullScreen
                            className="carousel-video"
                        ></iframe>
                    </div>
                    <div className="carousel-item">
                        <iframe
                            src="https://www.youtube.com/embed/KpD3joneuwY?si=TGzvSSCVOAcLH9eU"
                            title="YouTube video 4"
                            frameBorder="0"
                            allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture"
                            allowFullScreen
                            className="carousel-video"
                        ></iframe>
                    </div>
                    <div className="carousel-item">
                        <iframe
                            src="https://www.youtube.com/embed/Lm56PvEYUVQ?si=C39PGzfXmBYjW4W7"
                            title="YouTube video 5"
                            frameBorder="0"
                            allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture"
                            allowFullScreen
                            className="carousel-video"
                        ></iframe>
                    </div>
                    <div className="carousel-item">
                        <iframe
                            src="https://www.youtube.com/embed/VvCCfIxEO7s?si=tIwbMo5TOw-OlrN0"
                            title="YouTube video 6"
                            frameBorder="0"
                            allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture"
                            allowFullScreen
                            className="carousel-video"
                        ></iframe>
                    </div>
                </div>
            </div>

            {/* Carousel Controls */}
            <button className="carousel-control prev" onClick={() => document.getElementById("carousel").scrollLeft -= 600}>
                &lt; Prev
            </button>
            <button className="carousel-control next" onClick={() => document.getElementById("carousel").scrollLeft += 600}>
                Next &gt;
            </button>
        </div>
    </>
);
}

export default HomePage;