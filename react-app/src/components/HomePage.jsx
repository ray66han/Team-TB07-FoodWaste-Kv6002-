import React from 'react';
import './styles/HomePage.css';
import './styles/HomeEducationalPhotos.css'
import Footer from './Footer';

function HomePage() {
    
return (
    <>
        {/* --------------------------------------------Banner Section Start Here-------------------------------------------- */}
        <div className="banner">
            <div className="banner-content">
                <h1>Take Control of Food Waste: Manage Your Fridge</h1>
                <div className="banner-section">
                    <p className="banner-text">
                        Log in or Sign up to track your food items, stay ahead of expiry dates, and reduce waste effectively.
                    </p>
                </div>
                <button className="banner-btn"><b>Log in to Fridge System</b></button>
            </div>
        </div>

        {/* --------------------------------------------About Us Section Start Here-------------------------------------------- */}
        <div className="container">
            <div className="about-us-section">
                <div className="about-us-content">
                    <div className="about-us-text">
                        <h2>About Us</h2>
                        <p className="about-us-text-introduction">
                            ExpiryAlert is a smart, easy-to-use system designed to help individuals reduce food waste and contribute to a more sustainable future. Our platform offers an intuitive “My Fridge” feature that allows users to easily track food items, monitor expiry dates, and gain insights into their food waste habits. By receiving timely notifications, users can stay on top of food that’s about to expire, reducing the chances of unnecessary waste.
                        </p>

                        <p className="about-us-text-mission">
                            Our mission is to empower individuals to make better food management decisions and decrease both personal food waste and the environmental impact associated with it. Food waste is a significant contributor to climate change, and ExpiryAlert aims to tackle this issue head-on by making it easier for people to use their food efficiently and save money at the same time.
                        </p>

                        <p className="about-us-text-tools">
                            Through simple yet effective tools, ExpiryAlert provides users with the knowledge and means to minimize waste in their households. Whether it’s setting custom alerts or keeping track of savings, our system enables you to take control of your food management, helping you make a meaningful difference for both your wallet and the planet.
                        </p>

                        <p className="about-us-text-invite">
                            Join us in reducing food waste, one meal at a time!
                        </p>
                    </div>
                    <div className="about-us-image">
                        <img
                            src="/src/assets/images/About-Us/About-us-food-image.jpg"
                            alt="About Us"
                        />
                    </div>
                </div>
            </div>
        </div>

        {/* --------------------------------------------Impact of Food Waste Section Start Here-------------------------------------------- */}
        <div className="container">
            <div className="impact-section">
                <div className="impact-text">
                    <h2>Impact of Food Waste</h2>
                    <p className="food-waste-impact-text">
                        Did you know that <strong>food waste</strong> is a major contributor to climate change? When food is discarded, it rots in landfills, releasing methane—a potent greenhouse gas. This accelerates global warming, contributing to <em>extreme weather events</em> and <a href="https://www.worldwildlife.org/stories/fight-climate-change-by-preventing-food-waste" target="_blank" rel="noopener noreferrer">environmental damage</a>. Not only does food waste harm the planet, but it also wastes valuable resources like <span className="highlight-water-energy">water</span> and <span className="highlight-water-energy">energy</span>, which are used during food production, transportation, and storage. By reducing food waste, you not only help the environment but also save money. Start taking action today with the help of tools like <strong>ExpiryAlert</strong>!
                    </p>
                </div>
                
                <div className="impact-image-section">
                    <div className="impact-image">
                        <img src="src/assets/images/ImpactOfFoodWaste/Impact-Image-01.jpg" alt="Food Waste Impact" />
                        <div className="image-overlay">A landfill overflowing with discarded food, emphasizing the harmful methane emissions from food waste.</div>
                    </div>
                    <div className="impact-image">
                        <img src="src/assets/images/ImpactOfFoodWaste/Impact-Image-02.jpg" alt="Food Waste Impact" />
                        <div className="image-overlay">Food waste fuels climate change, wasting precious resources and harming the environment.</div>
                    </div>
                    <div className="impact-image">
                        <img src="src/assets/images/ImpactOfFoodWaste/Impact-Image-03.jpg" alt="Food Waste Impact" />
                        <div className="image-overlay">An infographic showing how food waste releases methane, a powerful greenhouse gas accelerating climate change.</div>
                    </div>
                </div>
            </div>
        </div>


        {/* --------------------------------------------Educational Videos Section Start Here-------------------------------------------- */}
        <div className="container">
            <div className="educational-video-section">
                <div className="section-header">
                    <h2>Videos on Reducing Food Waste</h2>
                </div>

                <div className="educational-video-text">
                    <p>Here are some videos that will help you learn more about how to reduce food waste:</p>
                </div>

                <div className="carousel-container">
                    <button className="carousel-control prev" onClick={() => {
                        const carousel = document.getElementById("carousel");
                        carousel.scrollLeft -= carousel.offsetWidth; // Scroll by 100% of the container width
                    }}>
                        &lt;
                    </button>
                    
                    <div id="carousel" className="carousel">
                        <iframe
                            src="https://www.youtube.com/embed/1MpfEeSem_4"
                            title="YouTube video 1"
                            frameBorder="0"
                            allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture"
                            allowFullScreen
                            className="carousel-video"
                        ></iframe>
                        <iframe
                            src="https://www.youtube.com/embed/BmDZU1UTBeY"
                            title="YouTube video 2"
                            frameBorder="0"
                            allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture"
                            allowFullScreen
                            className="carousel-video"
                        ></iframe>
                        <iframe
                            src="https://www.youtube.com/embed/wgLuXvtaLyQ"
                            title="YouTube video 3"
                            frameBorder="0"
                            allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture"
                            allowFullScreen
                            className="carousel-video"
                        ></iframe>
                        <iframe
                            src="https://www.youtube.com/embed/KpD3joneuwY"
                            title="YouTube video 4"
                            frameBorder="0"
                            allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture"
                            allowFullScreen
                            className="carousel-video"
                        ></iframe>
                        <iframe
                            src="https://www.youtube.com/embed/Lm56PvEYUVQ"
                            title="YouTube video 5"
                            frameBorder="0"
                            allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture"
                            allowFullScreen
                            className="carousel-video"
                        ></iframe>
                        <iframe
                            src="https://www.youtube.com/embed/VvCCfIxEO7s"
                            title="YouTube video 6"
                            frameBorder="0"
                            allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture"
                            allowFullScreen
                            className="carousel-video"
                        ></iframe>
                    </div>

                    <button className="carousel-control next" onClick={() => { 
                        const carousel = document.getElementById("carousel");
                        carousel.scrollLeft += carousel.offsetWidth; // Scroll by 100% of the container width
                        }}>
                        &gt;
                    </button>
                </div>
            </div>
        </div>




        {/* --------------------------------------------Educational Photos Section Start Here-------------------------------------------- */}
        <div className="container">
            <div className="educational-photo-section">
        
                <div className="section-header">
                    <h2>Visual Guide to Reducing Food Waste</h2>
                </div>

                <div className="educational-video-text">
                        <p>Here are some photos that will help you learn more about how to reduce food waste:</p>
                </div>
                
                <div className="carousel-container">
                    
                    <button 
                    className="carousel-control prev" 
                    onClick={() => document.getElementById("photo-carousel").scrollLeft -= 800}
                    >
                    &lt;
                    </button>
                    
                    <div id="photo-carousel" className="carousel">
                    <div className="carousel-photo">
                        <img
                        src="/src/assets/images/EducationalPhotots/image01.jpg"
                        alt="Educational Photo 1"
                        className="carousel-image"
                        />
                        <div className="photo-caption">
                            Food waste accelerates climate change. Reduce it to protect our planet.
                        </div>
                    </div>
                    <div className="carousel-photo">
                        <img
                        src="/src/assets/images/EducationalPhotots/image02.jpg"
                        alt="Educational Photo 2"
                        className="carousel-image"
                        />
                        <div className="photo-caption">
                            Planning meals and checking expiry dates prevents food waste.
                        </div>
                    </div>
                    <div className="carousel-photo">
                        <img
                        src="/src/assets/images/EducationalPhotots/image03.png"
                        alt="Educational Photo 3"
                        className="carousel-image"
                        />
                        <div className="photo-caption">
                            Wasting food is like throwing away money.
                        </div>
                    </div>
                    <div className="carousel-photo">
                        <img
                        src="/src/assets/images/EducationalPhotots/image04.jpg"
                        alt="Educational Photo 4"
                        className="carousel-image"
                        />
                        <div className="photo-caption">
                            Reduce food waste and save the environment for a sustainable future.
                        </div>
                    </div>
                    </div>
                    
                    <button 
                    className="carousel-control next" 
                    onClick={() => document.getElementById("photo-carousel").scrollLeft += 800}
                    >
                    &gt;
                    </button>
                    
                </div>
                
            </div>
        </div>

        {/* --------------------------------------------Join the Movement Section Start Here-------------------------------------------- */}
        <div className="container">
            <div className="join-movement-section">
                <div className="join-movement-content">
                    {/* Left side with image */}
                    <div className="join-movement-image">
                        <img
                            src="/src/assets/images/JoinTheMovement/Image-01.jpg"
                            alt="Join the Movement"
                        />
                    </div>

                    {/* Right side with text and button */}
                    <div className="join-movement-text">
                        <h2>Join the Movement</h2>
                        <p>
                            By using ExpiryAlert, you become part of a global effort to reduce food waste and its harmful impact on the environment. Every small action, from tracking expiry dates to minimizing waste, contributes to a more sustainable future for all. Together, we can make a difference—one meal at a time.
                        </p>
                        <p>
                            Sign in or sign up to use “Your Fridge” and keep track of your food items to reduce waste effectively.
                        </p>
                        <button className="join-movement-btn">Your Fridge</button>
                    </div>
                </div>
            </div>
        </div>

        {/* --------------------------------------------Recycle Bins Section Start Here-------------------------------------------- */}        
        <div className="recycle-bins-section">
            <div className="section-header">
                <h2>Effective Waste Management: Sorting for Sustainability</h2>
            </div>
            <p>Using separate bins for waste, recycling, and composting is essential for promoting sustainability and reducing environmental impact. Each bin serves a specific purpose, helping to keep waste organized and ensuring that materials are disposed of in the most eco-friendly way possible. The General Waste Bin is for items that can’t be reused, recycled, or composted. The Recycle Bin ensures that recyclable materials like plastics and glass are processed properly, and the Compost Bin turns organic waste into valuable resources for gardens. By following this system, we can all contribute to a more sustainable future and reduce unnecessary waste.</p>

            <div className="recycle-bins-cards">
                <div className="recycle-bin-card">
                    <h3>General Waste Bin (Black or Grey)</h3>
                    <img src="/src/assets/images/Bins/Black.jpg" alt="General Bin" />
                    <p>This bin is for food items that are no longer edible or cannot be recycled or composted, such as moldy produce or packaging with mixed materials. It’s where non-reusable waste should go to ensure proper disposal.</p>
                </div>
                <div className="recycle-bin-card">
                    <h3>Recycle Bin (Blue)</h3>
                    <img src="/src/assets/images/Bins/Blue.jpg" alt="Recycle Bin" />
                    <p>Use this bin for food packaging that can be recycled, like cardboard, plastic containers, and glass bottles. Be sure items are clean and dry to avoid contamination in the recycling stream.</p>
                </div>
                <div className="recycle-bin-card">
                    <h3>Compost Bin (Green or Brown)</h3>
                    <img src="/src/assets/images/Bins/Green.jpg" alt="Other Bin" />
                    <p>This bin is for organic food waste such as fruit and vegetable scraps, coffee grounds, and eggshells. Composting turns this waste into nutrient-rich soil, reducing landfill waste and creating natural fertilizer.</p>
                </div>
            </div>
        </div>

        {/* --------------------------------------------References to Reduce Food Waste Section Start Here-------------------------------------------- */}        
        <div className="container">
            <div className="references-section">
                <div className="section-header">
                    <h2>Useful Resources on Reducing Food Waste</h2>
                </div>

                {/* Section 1: Title and Text */}
                <div className="references-content">
                    <div className="references-text">
                        <p>
                            Food waste is a global issue, and there are many ways to reduce it. We encourage you to explore various methods to
                            minimize waste in your daily life. Stay informed and learn more about how you can contribute to reducing food waste with these helpful resources:
                        </p>
                    </div>
                </div>

                {/* Section 2: 50% Text and 50% Image */}
                <div className="references-content">
                    <div className="references-text">
                        <h3>Websites for Practical Tips:</h3>
                        <p>
                            Simple changes in your daily routine can have a big impact. By planning meals, using leftovers creatively, and 
                            understanding food labels, we can significantly reduce the amount of food we throw away. Learn more about how to make
                            these changes by visiting the resources below.
                            <ul>
                                <li><a href="https://www.mayoclinichealthsystem.org/hometown-health/speaking-of-health/7-ways-to-reduce-food-waste-in-your-kitchen" target="_blank" rel="noopener noreferrer">7 Ways to Reduce Food Waste in Your Kitchen - Mayo Clinic</a></li>
                                <li><a href="https://fareshare.org.uk/tips-for-reducing-food-waste/" target="_blank" rel="noopener noreferrer">Tips for Reducing Food Waste - FareShare</a></li>
                                <li><a href="https://www.triodos.co.uk/articles/2022/10-tips-for-reducing-food-waste" target="_blank" rel="noopener noreferrer">10 Tips for Reducing Food Waste - Triodos Bank</a></li>
                                <li><a href="https://www.bhf.org.uk/informationsupport/heart-matters-magazine/news/10-ways-to-cut-your-food-waste" target="_blank" rel="noopener noreferrer">10 Ways to Cut Your Food Waste - British Heart Foundation</a></li>
                                <li><a href="https://www.wastemanaged.co.uk/our-news/food-waste/food-waste-facts-statistics/#:~:text=The%20UK%20wastes%20approximately%209.5,distribution%2C%20retail%2C%20and%20households" target="_blank" rel="noopener noreferrer">Food Waste Facts and Statistics - Waste Managed</a></li>
                            </ul>
                        </p>
                    </div>
                    <div className="references-image">
                        <img src="/src/assets/images/Resources/Image01.jpeg" alt="Food Waste Awareness" />
                    </div>
                </div>

                {/* Section 3: More References and Links */}
                <div className="references-content">
                    <div className="references-text">
                        <h3>Additional Reading on the Impact:</h3>
                        <ul>
                            <li><a href="https://www.google.com/amp/s/www.devon.gov.uk/news/reducing-food-waste-can-save-you-money/%3famp=1" target="_blank" rel="noopener noreferrer">Reducing Food Waste Can Save You Money - Devon County Council</a></li>
                            <li><a href="https://www.worldwildlife.org/stories/fight-climate-change-by-preventing-food-waste#:~:text=When%20we%20waste%20food%2C%20we,more%20potent%20than%20carbon%20dioxide" target="_blank" rel="noopener noreferrer">Fighting Climate Change by Preventing Food Waste - World Wildlife Fund</a></li>
                            <li><a href="https://www.europarl.europa.eu/topics/en/article/20230316STO77629/climate-change-the-greenhouse-gases-causing-global-warming#:~:text=Greenhouse%20gases%20act%20similarly%20to,be%2C%20supporting%20life%20on%20Earth" target="_blank" rel="noopener noreferrer">The Greenhouse Gases Causing Global Warming - European Parliament</a></li>
                            <li><a href="https://www.usda.gov/media/blog/2022/01/24/food-waste-and-its-links-greenhouse-gases-and-climate-change#:~:text=Food%20loss%20and%20waste%20also,even%20more%20potent%20greenhouse%20gas" target="_blank" rel="noopener noreferrer">Food Waste and its Links to Greenhouse Gases - USDA</a></li>
                            <li><a href="https://www.un.org/en/climatechange/science/climate-issues/food#:~:text=Food%20needs%20to%20be%20grown,emissions%20is%20linked%20to%20food" target="_blank" rel="noopener noreferrer">Food's Impact on Climate Change - United Nations</a></li>
                            <li><a href="https://www.epa.gov/recycle" target="_blank" rel="noopener noreferrer">EPA - Reducing Food Waste</a></li>
                            <li><a href="https://www.reducereuserecycle.org/food-waste/" target="_blank" rel="noopener noreferrer">Reduce Reuse Recycle - Food Waste</a></li>
                            <li><a href="https://www.wfp.org/stories/how-reduce-food-waste" target="_blank" rel="noopener noreferrer">WFP - How to Reduce Food Waste</a></li>
                        </ul>
                    </div>
                </div>
            </div>
        </div>

        {/* --------------------------------------------Footer Section Start Here-------------------------------------------- */} 
        <Footer />  {/* Include Footer here */}
    </>
);
}

export default HomePage;