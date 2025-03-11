import React from 'react';

function Projects() {
    return (
        <div className='content1'>
            

            <h1 className="flex-logo">Projects</h1>
            <h3 className="flex-text-large">CGM Personal Trainer</h3>
            
            <p className="flex-text">Your AI-powered CGM Personal Trainer app differs from existing diabetes apps, setting it apart as an engagement-based diabetes coaching system. Users get daily scores based on their blood glucose control patterns.
                <ul>
                <li>Blood glucose event tracking</li>
                <li>Rewards for well-timed boluses and stable glucose levels</li>
                <li>Warning indicators for delayed insulin delivery or lack of correction</li>
                <li>Scores are adjusted based on behavioral trends over time, leading to a habit-forming feedback loop.</li>
                </ul>
            </p>
            <p className="flex-text" align="center">
            <a href='http://dexcomtrainer.flex-ai.com'><img src='flex-ai-logo.png' width='400'></img></a>
            </p>


            <h3 className="flex-text-large">AI Personal Assistant Sales Force</h3>
            
            <p className="flex-text">We provide responsible AI integrations to elevate your business.</p>
            <p className="flex-text" align="center">
            <img src='flex-ai-logo.png' width='400'></img>
            </p>
            
                
        </div>
    );
}

export default Projects;
