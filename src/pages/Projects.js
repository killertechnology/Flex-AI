import React from 'react';

function Projects() {
    return (
        <div className='content1'>
            

            <b className="flex-logo">Projects</b><br />
            Explore some of the AI-driven and technology-focused projects I've worked on.
            
<div className="project-card">
    <table border={0} cellPadding={0} cellSpacing={0} width={"80%"} height="1" align="center">
        <tbody>
            <tr>
                <td valign='top' height={1}>
                    <div id="cgm-trainer" className="content-box">
                        <a href='http://personaltrainer.flex-ai.com' target='new'><b>CGM Personal Trainer</b></a><br />
                        T1D is a serious disease that affects millions of people. This CGM Personal Trainer gamifies blood glucose management using real-time data from CGM devices. 
                        It assigns scores based on time-in-range performance, provides feedback on insulin timing, and rewards users 
                        for maintaining stable glucose levels. The app encourages better diabetes management through engagement and interactive insights.
                        <br /><a href='http://personaltrainer.flex-ai.com' target='new'><img src='../images/home4.webp' width="350"></img></a>
                    </div>
                </td>
            </tr>
        </tbody>
    </table>
</div>

            


<div className="project-card">
    <table border={0} cellPadding={0} cellSpacing={0} width={"80%"} height="1" align="center">
        <tbody>
            <tr>
                <td>
                    <div id="earthquake-ai" className="content-box">
                        <p><a href='http://earthquake.flex-ai.com' target='_blank'><b>AI Earthquake Detector</b></a><br />
                        The Earthquake Application provides real-time earthquake alerts, safety recommendations, and historical seismic activity data. 
           It utilizes AI and geospatial analytics to predict potential aftershocks and guide users through preparedness and response measures. 
           The app is designed to enhance public safety by delivering accurate and timely information.
                        <br /><a href='http://earthquake.flex-ai.com' target='new'><img src='../images/home1.webp' width="350"></img></a></p>
                    </div>
                </td>
            </tr>
        </tbody>
    </table>
</div>

<div className="project-card">
<table border={0}  cellPadding={0} cellSpacing={0} width={"80%"} height="1" align="center">
        <tbody>
            <tr>
                <td>
                    <div id="hotdog-nothotdog" className="content-box">
                        <p><a href='https://hotdogornothotdog.com' target='_blank'><b>Hot Dog or Not Hot Dog??</b></a><br />
                        HotDogOrNotHotDog.com—the ultimate homage to the classic Silicon Valley episode that had everyone laughing while debating AI classification of a hot dog. Our playful AI image classifier harnesses OpenAI's GPT-Vision 4 LLM to instantly determine if an image is a genuine hot dog, showcasing the remarkable capabilities of modern AI image classification. Embrace a fun twist on a tech classic and witness how humor meets high performance at HotDogOrNotHotDog.com.
                        <br /><a href='http://hotdogornothotdog.com' target='_new'><img src='../images/newcircus-home.jpg' width="350"></img></a></p>
                    </div>
                </td>
            </tr>
        </tbody>
    </table>
</div>

<div className="project-card">
<table border={0}  cellPadding={0} cellSpacing={0} width={"80%"} height="1" align="center">
        <tbody>
            <tr>
                <td>
                    <div id="cgm-trainer" className="content-box">
                        <p><a href='http://aiassistant.flex-ai.com' target='_blank'><b>AI Personal Assistant (Bland.io)</b></a><br />
                        The AI Personal Assistant on Bland.io is designed to streamline daily tasks, enhance productivity, and provide intelligent automation. 
           It integrates with various services to manage schedules, answer queries, and execute commands efficiently. 
           With natural language processing and adaptive learning, the assistant evolves to meet user needs more effectively over time.
                        <br /><a href='http://aiassistant.flex-ai.com' target='new'><img src='../images/phoneassistant.webp' width="350"></img></a></p>
                    </div>
                </td>
            </tr>
        </tbody>
    </table>
</div>
        
                
        </div>
    );
}

export default Projects;


