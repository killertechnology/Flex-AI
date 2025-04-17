import React, { useEffect, useRef, useState } from 'react';

function InstacartProjectCard() {
  // Reference for the Instacart video (for the in-view auto-play functionality)
  const videoRef = useRef(null);
  // State and ref for the AI Personal Assistant modal video
  const [assistantModalOpen, setAssistantModalOpen] = useState(false);
  const modalVideoRef = useRef(null);

  // IntersectionObserver to auto-play the Instacart video when 50% visible
  useEffect(() => {
    const video = videoRef.current;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && video) {
          video.play();
        }
      },
      {
        threshold: 0.5, // 50% of the video should be visible
      }
    );

    if (video) {
      observer.observe(video);
    }

    return () => {
      if (video) {
        observer.unobserve(video);
      }
    };
  }, []);

  // Functions to open and close the modal
  const openAssistantModal = () => {
    setAssistantModalOpen(true);
  };

  const closeAssistantModal = () => {
    setAssistantModalOpen(false);
    if (modalVideoRef.current) {
      modalVideoRef.current.pause();
      modalVideoRef.current.currentTime = 0; // reset video to start
    }
  };

  return (
    <div className="content1">
      <b className="flex-logo">Projects</b>
      <br />
      Explore some of the AI-driven and technology-focused projects I've worked on.
      
      <table
        className="project-card"
        border={0}
        cellPadding={0}
        cellSpacing={0}
        width={"30%"}
        height="1"
        align="center"
      >
        <tbody>
          <tr>
            <td valign="top" height={1}>
              <div>
                <a href="https://personaltrainer.flex-ai.com" target="new">
                  <img src="../images/home4.webp" width="350" alt="CGM Personal Trainer" />
                </a>
              </div>
              <div id="cgm-trainer" className="content-box">
                <a href="https://personaltrainer.flex-ai.com" target="new">
                  <b>CGM Personal Trainer</b>
                </a>
                <br />
                T1D is a serious disease that affects millions of people. This CGM Personal Trainer gamifies blood glucose management using real-time data from CGM devices. 
                It assigns scores based on time-in-range performance, provides feedback on insulin timing, and rewards users for maintaining stable glucose levels. 
                The app encourages better diabetes management through engagement and interactive insights.
                <br />
              </div>
            </td>
          </tr>
        </tbody>
      </table>
      <hr />

      <table
        className="project-card"
        border={0}
        cellPadding={0}
        cellSpacing={0}
        width={"30%"}
        height="1"
        align="center"
      >
        <tbody>
          <tr>
            <td>
              <div>
                <a href="https://earthquake.flex-ai.com" target="new">
                  <img src="../images/home1.webp" width="350" alt="AI Earthquake Detector" />
                </a>
              </div>
              <div id="earthquake-ai" className="content-box">
                <p>
                  <a href="https://earthquake.flex-ai.com" target="_blank">
                    <b>AI Earthquake Detector</b>
                  </a>
                  <br />
                  The Earthquake Application provides real-time earthquake alerts, safety recommendations, and historical seismic activity data. 
                  It utilizes AI and geospatial analytics to predict potential aftershocks and guide users through preparedness and response measures. 
                  The app is designed to enhance public safety by delivering accurate and timely information.
                  <br />
                </p>
              </div>
            </td>
          </tr>
        </tbody>
      </table>
      <hr />

      <table
        className="project-card"
        border={0}
        cellPadding={0}
        cellSpacing={0}
        width={"30%"}
        height="1"
        align="center"
      >
        <tbody>
          <tr>
            <td>
              <div>
                <a href="https://hotdogornothotdog.com" target="_new">
                  <img src="../images/newcircus-home.jpg" width="350" alt="Hot Dog or Not Hot Dog" />
                </a>
              </div>
              <div id="hotdog-nothotdog" className="content-box">
                <p>
                  <a href="https://hotdogornothotdog.com" target="_blank">
                    <b>Hot Dog or Not Hot Dog??</b>
                  </a>
                  <br />
                  The ultimate homage to the classic Silicon Valley episode that had everyone laughing while debating AI classification of a hot dog. Our playful AI image classifier harnesses OpenAI's GPT-Vision 4 LLM to instantly determine if an image is a genuine hot dog, showcasing the remarkable capabilities of modern AI image classification. Embrace a fun twist on a tech classic and witness how humor meets high performance at HotDogOrNotHotDog.com.
                  <br />
                </p>
              </div>
            </td>
          </tr>
        </tbody>
      </table>
      <hr />

      <table
        className="project-card"
        border={0}
        cellPadding={0}
        cellSpacing={0}
        width={"30%"}
        height="1"
        align="center"
      >
        <tbody>
          <tr>
            <td>
              <div className="content-box">
                <b>
                  <u>Instacart AI Product Analyzer</u>
                </b>
                <br />
                Flex-AI uses the power of AI to analyze Instacart product images and return instant ingredient breakdowns or nutrition insights. When you pass a product image URL and optional ingredient data into the page via the query string, Flex-AI:
                <h3>Who is it for?</h3>
                <ul>
                  <li>Shoppers who want to know more about what's in their food.</li>
                  <li>People with allergies or health goals.</li>
                  <li>Nutritionists and dietitians who want a quick breakdown of ingredients.</li>
                  <li>App builders or developers working on smart food tools.</li>
                </ul>
                <br />
                <div style={{ textAlign: "center" }}>
                  <video
                    id="sdvid"
                    ref={videoRef}
                    playsInline
                    muted
                    controls
                    preload="metadata"
                    style={{ border: "2px solid black" }}
                  >
                    <source src="/images/instacart-ai-trim-480p.mov" type="video/mp4" />
                    Your browser does not support the video tag.
                  </video>
                </div>
              </div>
            </td>
          </tr>
        </tbody>
      </table>
      <hr />

      <table
        className="project-card"
        border={0}
        cellPadding={0}
        cellSpacing={0}
        width={"30%"}
        height="1"
        align="center"
      >
        <tbody>
          <tr>
            <td>
              {/* Clicking this image now opens the modal */}
              <div onClick={openAssistantModal} style={{ cursor: "pointer" }}>
                <img
                  src="../images/phoneassistant.webp"
                  width="350"
                  alt="AI Personal Assistant (Bland.io)"
                />
              </div>
              <div id="cgm-trainer" className="content-box">
                <p>
                  {/* You can also make the title clickable if desired */}
                  <b>AI Personal Assistant (Bland.io)</b>
                  <br />
                  The AI Personal Assistant on Bland.io is designed to streamline daily tasks, enhance productivity, and provide intelligent automation. 
                  It integrates with various services to manage schedules, answer queries, and execute commands efficiently. 
                  With natural language processing and adaptive learning, the assistant evolves to meet user needs more effectively over time.
                  <br />
                </p>
              </div>
            </td>
          </tr>
        </tbody>
      </table>
      <br /><br /><br />

      {/* Full-screen modal for the AI Personal Assistant video */}
      {assistantModalOpen && (
        <div
          style={{
            position: "fixed",
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            backgroundColor: "rgba(0,0,0,0.8)",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            zIndex: 1000,
          }}
        >
          <div style={{ position: "relative", width: "100%", height: "74%" }}>
            <button
              onClick={closeAssistantModal}
              style={{
                position: "absolute",
                top: 20,
                right: 20,
                zIndex: 1001,
                backgroundColor: "#fff",
                border: "none",
                padding: "10px 15px",
                cursor: "pointer",
              }}
            >
              Close
            </button>
            <video
              ref={modalVideoRef}
              src="/images/AI-assistant.mov"
              autoPlay
              style={{ width: "100%", height: "100%" }}
            />
          </div>
        </div>
      )}
    </div>
  );
}

export default InstacartProjectCard;
