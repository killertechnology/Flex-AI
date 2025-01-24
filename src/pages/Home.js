import React from 'react';

function Home() {
    return (
        <div className='content1'>
            <div class="video-background">
                <video autoplay="true" loop muted playsinline>
                    <source src="highway-loop.mp4" type="video/mp4" />
                    Your browser does not support the video tag.
                </video>
            </div>

            <h1 className="flex-logo">Welcome to Flex AI</h1>
            <h3 className="flex-text">An AI Services Company</h3>
            
            <p className="flex-text">We provide responsible AI integrations to elevate your business.</p>
            <p className="flex-text" align="center">
            <img src='flex-ai-logo.png' width='400'></img>
            </p>
            
                
        </div>
    );
}

export default Home;
