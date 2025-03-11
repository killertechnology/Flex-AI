import React from "react";
import styled from "styled-components";
// rainyday-wrapper.js
import './rainyday.js'; // This file sets window.RainyDay
//export const RainyDay = window.RainyDay;


const Background = styled.div`
  height: 100vh;
  background-position: center;
  background-repeat: no-repeat;
  background-size: cover;
  background-image: url(./images/demo.jpg);
  overflow: hidden;
  z-index:-999;
  transform-origin: bottom;
`;

export default class Home extends React.Component {
 
 /**/
    ref = React.createRef();

  componentDidMount() {
    const image = this.ref.current;
    var engine = new window.RainyDay({
      image,
      blur: 10,
      paddingTop:250,
      zIndex:-999,
      onInitialized: () => {
        engine.rain([[5, 5, 10]]);
        engine.rain([[3, 3, 0.88], [2, 10, 10.9], [6, 2, 1]], 1);
      }
    });
  }


  render() {
    return(
      <>
        <Background ref={this.ref} style={{ zIndex:-1 }} />
        <div className="container">
          <div className='content1'>
                <div className="video-background">
                    {/* <video autoplay="true" loop muted playsinline>
                        <source src="highway-loop.mp4" type="video/mp4" />
                        Your browser does not support the video tag.
                    </video> */}
                </div>

                <h1 className="flex-logo">Welcome to Flex AI</h1>
                <h3 className="flex-text">An AI Services Company</h3>
                
                <p className="flex-text">We provide responsible AI integrations to elevate your business.</p>
                <p className="flex-text" align="center">
                    <img src='flex-ai-logo.png' width='400'></img>
                </p>
            </div>
        </div>
      </>
    );
  }
}
