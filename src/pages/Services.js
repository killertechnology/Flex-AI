import React, { useEffect } from 'react';
import $ from 'jquery';

function Services() {

    useEffect(() => {
        // Code to execute after render goes here
        console.log('starting!!')
        
        const pageheaders = document.querySelectorAll('.services-tab-menu-1 a');
        const buttons = document.querySelectorAll(' .buttonset a');
        const buttonSets = document.querySelectorAll('.w-tabs');
        const sectionSets = document.querySelectorAll(' .section');

        console.log(buttonSets);

        //Load in the cards
        pageheaders.forEach(pageheader => {
            console.log("Card added " + pageheader.id);
            pageheader.addEventListener('click', () => {
                //resetContent();
                clearButtons();
                console.log("header clicked: " + pageheader.getAttribute("aria-controls"));
                const thisOne = document.getElementById(pageheader.getAttribute("aria-controls"));
                //console.log(thisOne.children[0].children[0].children[1]);
                thisOne.children[0].children[0].children[0].setAttribute("style","display:visible")
                thisOne.children[0].children[0].children[1].setAttribute("style","display:visible")
                thisOne.children[0].children[0].children[1].children[0].setAttribute("style","display:visible")

                clearButtonSets();
                clearSections();

                //Turn on the buttonset
                const thisBS = document.getElementById(thisOne.id).children[0].children[0];
                document.getElementById(thisBS.id).setAttribute("style","display:inline");
                console.log(thisBS.id);                

                //Turn on the section
                const thisSectionId = String(thisBS.children[0].children[0].id).replace("btn_","");
                console.log("Default section: " + thisSectionId);
                document.getElementById(thisSectionId).setAttribute("style","display:visible");
                
                //Turn on the default button
                document.getElementById("btn_" + thisSectionId).setAttribute("class","subtab w--current");

                //Finally, set this button to active
                //w--current
                const wchClass = "tab card" + thisBS.id.toString().replace("buttonSet","") + " w-inline-block w-tab-link"
                pageheaders.forEach(ph => {
                    ph.className = "tab card3 w-inline-block w-tab-link";
                   // ph.classList.remove("w--current");
                });
                
                //const updatetocurrent =  document.getElementById(pageheader.id).getAttribute("class") + " w--current";
                const updatetocurrent = "tab card1 w-inline-block w-tab-link w--current";
                document.getElementById(pageheader.id).setAttribute("class",updatetocurrent);



            });
            
        });
        //Turn off all buttonSet

        //Turn off all secttionSets


        function clearHeaders(){
            
            console.log('Turning off Card Contents')
            //document.getElementById("sectionSet1").setAttribute("style","display:none");
            //document.getElementById("sectionSet2").setAttribute("style","display:none");
            //document.getElementById("sectionSet3").setAttribute("style","display:none");
            //pageheaders.forEach(pageheader => {
            //    pageheader.classList.remove("w--current");
            //});
        }

        

        function clearSections(itemToRemain){
            console.log("* * * * toggling off Cards - Remain: " + itemToRemain);
            sectionSets.forEach(sectionSet => {
                //console.log('* * * * toggling off Card Section' + sectionSet.id);
                
                if (sectionSet.id != itemToRemain){
                    //console.log(sectionSet.id)
                    sectionSet.setAttribute("style","display:none");
                }
            });

        }
        function clearButtons(){ buttons.forEach(button => {   button.className = "subtab";  });  }

        function clearButtonSets(){
            //console.log(buttonSets);
            buttonSets.forEach(buttonSet => {
                //console.log('* * turning buttonSet off: ' + buttonSet.id);
                buttonSet.setAttribute("style","display:none");
            });
        }

        function clearContent(){
            //console.log('Turning off Card Contents')
            //document.getElementById("Card1Content").setAttribute("style","display:none");
            //document.getElementById("Card2Content").setAttribute("style","display:none");
            //document.getElementById("Card3Content").setAttribute("style","display:none");
            pageheaders.forEach(pageheader => {
                console.log("turning off content contents: " + pageheader.id);
                pageheader.classList.remove("w--current");
            });
        }

        function resetContent(){
            clearSections();
           // clearButtons();
           // clearButtonsets();
            //clearContent();
            
            
        }

        buttons.forEach(button => {
            //console.log('adding button ' + button.id + " controls: " + button.getAttribute("aria-controls"));
            //buttonSet.className = "subtab";
            button.addEventListener('click', () => {
                // Remove 'active' class from all buttons
                clearButtons();
                clearButtonSets();
                clearSections(button.id.replace("btn_",""));

                //console.log(button);
                button.setAttribute("class","subtab w--current");
                
                //Turn on the section
                const thisSectionId = button.id.replace("btn_","");
                console.log("Chosen section: " + thisSectionId);
                document.getElementById(thisSectionId).setAttribute("style","display:visible");
                
                const thisCard = document.getElementById(button.id).getAttribute("aria-controls");
                document.getElementById(thisCard).setAttribute("style","display:visible");
                
                console.log("Chosen Card: " + thisCard);

            });
            
        });/**/

        console.log('Services2 has rendered!');
      });

    return (
        
        <div className='flex-text'>
            <div className="flex-logo">Our Services</div><br/>
                <section>
                    <figure className="w-layout-blockcontainer container w-container">
                        <div data-current="enterprise-consulting" data-easing="ease" data-duration-in="300" data-duration-out="100" className="services-tabs">
                        <div className="services-tab-menu-1 w-tab-menu" role="tablist">
                            <a id="card1" data-w-tab="autonomous-agent-development" 
                                className="tab card1 w-inline-block w-tab-link w--current"  
                                role="tab" aria-controls="sectionSet1">
                                <div className="services-card-number-div">
                                    <div className="services-button-version-2 white">
                                        <div>#1 </div>
                                    </div>
                                    <div className="services-indicator-outline">
                                        <div className="div-block-2"></div>
                                    </div>
                                </div>
                                <h3 className="h3 green">AUTONOMOUS AGENT DEVELOPMENT</h3>
                            </a>

                            <a id="card2" data-w-tab="enterprise-consulting" 
                                className="tab card2 w-inline-block w-tab-link" role="tab" 
                                aria-controls="sectionSet2">
                                <div className="services-card-number-div">
                                    <div className="services-button-version-2 white">
                                        <div>#2 </div>
                                    </div>
                                    <div className="services-indicator-outline white">
                                        <div className="div-block-2 _2"></div>
                                    </div>
                                </div>
                                <h3 className="h3 green">ENTERPRISE CONSULTING</h3>
                            </a>

                            <a id="card3" data-w-tab="chatbot-development" 
                                className="tab card3 w-inline-block w-tab-link"  role="tab" 
                                aria-controls="sectionSet3">
                                <div className="services-card-number-div">
                                    <div className="services-button-version-2 white">
                                        <div>#3 </div>
                                    </div>
                                    <div className="services-indicator-outline white">
                                        <div className="div-block-2 _2"></div>
                                    </div>
                                </div>
                                <h3 className="h3 green">CHATBOT DEVELOPMENT</h3>
                            </a>
                        </div>
                        
                        
                        <div className="services-tab-content-1 w-tab-content">
                            <div data-w-tab="autonomous-agent-development" className="w-tab-pane w--tab-active" id="sectionSet1" aria-labelledby="card1" >
                                <div className="services-individual-box">
                                    <div id="buttonSet1" data-easing="ease" data-duration-in="300" className="w-tabs">
                                        <div className="services-page-tab-menu w-tab-menu buttonset" role="tablist" id='subnav-buttonset1'>
                                            <a id="btn_workflow-automation" aria-controls="buttonSet1" className="subtab w--current" role="tab">
                                            <div>Workflow Automation</div>
                                            </a>
                                            <a id="btn_natural-language-to-sql" aria-controls="buttonSet1" className="subtab"  role="tab">
                                            <div>Natural language to SQL</div>
                                            </a>
                                            <a id="btn_complex-data-pipelines" aria-controls="buttonSet1" className="subtab" role="tab">
                                            <div>Complex Data Pipelines</div>
                                            </a>
                                            <a id="btn_self-adaptive-decision-systems" aria-controls="buttonSet1" className="subtab " role="tab">
                                            <div>Self-Adaptive Decision Systems</div>
                                            </a>
                                        </div>
                                        <div className="tabs-content w-tab-content" id="Card1Content">
                                            <div id="workflow-automation" className="w-tab-pane w--tab-active section" role="tabpanel">
                                                <h3>Workflow Automation</h3>
                                                <p className="paragraph">In today's digital era, efficiency is the backbone of any successful business. At Morningside AI, we harness the power of Autonomous Agents to revolutionize your workflow processes. Our Workflow Automation solution goes beyond traditional task automation; it incorporates intelligent agents that can make decisions, adapt to varying circumstances, and consistently optimize operations. <br />
                                                    <br />Through our deep understanding of AI and its potential, we design agents that can predictively automate tasks, reducing manual intervention and the chances for human error. Whether you're looking to streamline administrative processes, enhance data operations, or elevate customer interactions, our bespoke autonomous agents are built to integrate seamlessly into your environment.
                                                </p>
                                            </div>
                                            <div id="natural-language-to-sql" className="w-tab-pane w--tab-active section" role="tabpanel" >
                                                <h3>Natural Language to SQL</h3>
                                                <p className="paragraph-2">In an age where data drives decisions, accessing and querying databases should be as intuitive as asking a question in plain English. At Morningside AI, we pride ourselves on pushing the boundaries of what's possible. In a recent collaboration with a leading Silicon Valley company, we innovated in the NL to SQL domain, achieving results that were over 40% better than current state-of-the-art methods. This accomplishment underscores our commitment to pioneering advancements in AI technology. <br />
                                                    <br />Our solution transforms natural language queries into precise SQL statements, allowing users to retrieve, manipulate, and analyze data without the need to understand intricate SQL syntax. Empowering both non-tech professionals and experienced developers alike, we bridge the gap between human language and database queries, making data-driven decisions accessible to all.
                                                </p>
                                            </div>
                                            <div id="complex-data-pipelines" className="w-tab-pane w--tab-active section" role="tabpanel" >
                                                <h3>Complex Data Pipelines</h3>
                                                <p className="paragraph-3">Data is the lifeblood of modern businesses, but its sheer volume and complexity can make it challenging to harness effectively. At Morningside AI, we're pioneering the development of intricate data pipelines, transforming raw, disparate data into actionable insights. With our autonomous agent-driven solutions, we navigate the complexities of big data, ensuring fluidity and efficiency in data transition, processing, and analytics. <br />
                                                    <br />Our expertise lies in designing and deploying data pipelines that handle large-scale, multi-dimensional data. Whether you're dealing with real-time data streams, batch processing, or a hybrid, our autonomous agents optimize processes, ensuring data integrity, and timely delivery for advanced analytics and machine learning applications.
                                                </p>
                                            </div>
                                            <div id="self-adaptive-decision-systems" className="w-tab-pane w--tab-active section" role="tabpanel" >
                                                <h3>Self-Adaptive Decision Systems</h3>
                                                <p className="paragraph-4">In the ever-evolving landscape of business, static decision-making models no longer suffice. At Morningside AI, we're at the forefront of developing Self-Adaptive Decision Systems, a groundbreaking approach that empowers businesses to make intelligent decisions dynamically. These systems are not just reactive but proactively adjust to changing environments, learning from new data and evolving patterns. <br />
                                                    <br />Our self-adaptive solutions harness the full potential of autonomous agents, enabling them to make decisions based on real-time data, past experiences, and predictive analytics. This continuous loop of learning and adapting ensures that your business stays ahead of the curve, optimizing operations and strategizing for future scenarios.
                                                </p>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            
                            <div data-w-tab="enterprise-consulting" className="w-tab-pane w--tab-active" id="sectionSet2" aria-labelledby="card2" >
                                <div className="services-individual-box">
                                    <div id="buttonSet2" data-easing="ease" data-duration-in="300" data-duration-out="100" className="w-tabs">
                                        <div className="services-page-tab-menu w-tab-menu buttonset" role="tablist" id='subnav-buttonset2'>
                                            <a id="btn_strategy-development" aria-controls="buttonSet2" className="subtab w--current"  aria-selected="true" role="tab">
                                            <div>Strategy Development</div>
                                            </a>
                                            <a id="btn_performance-evaluation" aria-controls="buttonSet2" className="subtab" role="tab">
                                            <div>Performance Evaluation</div>
                                            </a>
                                            <a id="btn_use-case-identification" aria-controls="buttonSet2" className="subtab" role="tab">
                                            <div>Use Case Identification</div>
                                            </a>
                                            <a id="btn_feasibility-assessments" aria-controls="buttonSet2" className="subtab" role="tab">
                                            <div>Feasibility Assessments</div>
                                            </a>
                                        </div>
                                        <div className="tabs-content w-tab-content" id="Card2Content">
                                            <div id="strategy-development" className="w-tab-pane w--tab-active section" role="tabpanel">
                                            <h3>Strategy Development</h3>
                                            <p className="paragraph-5">At Morningside AI, we leverage deep industry knowledge and cutting-edge insights to architect a coherent, actionable AI strategy tailored for your business. We understand that every enterprise has unique goals, challenges, and landscapes; our strategy development is designed to reflect that individuality. <br />
                                                <br />We don't just skim the surface; our consultants dive deep into your organization's DNA, understanding its intricacies to pinpoint where AI can be a game-changer. From ideation to blueprinting, our strategy development process is a meticulous blend of your vision and our expertise.
                                            </p>
                                            </div>
                                            <div id="performance-evaluation" className="w-tab-pane w--tab-active section" role="tabpanel">
                                            <h3>Performance Evaluation</h3>
                                            <p className="paragraph-6">In the realm of AI-driven enterprises, the maxim "what gets measured gets managed" has never been more pertinent. Morningside AI's Performance Evaluation service offers a comprehensive assessment of your AI initiatives, ensuring they deliver tangible results and are in alignment with set benchmarks. <br />
                                                <br />Understanding the impact of AI solutions isn't just about number-crunching; it's about discerning the nuances that drive those numbers.With our seasoned consultants, we delve into both qualitative and quantitative metrics, providing a holistic view of your AI implementations. Whether it's the efficiency of an algorithm, the accuracy of predictions, or the tangible business outcomes achieved, we meticulously evaluate every facet.
                                            </p>
                                            </div>
                                            <div id="use-case-identification" className="w-tab-pane w--tab-active section" role="tabpanel">
                                            <h3>Use Case Identification</h3>
                                            <p className="paragraph-7">Morningside AI’s Use Case Identification service is a specialized approach to uncover the most potent AI applications tailored for your enterprise. We believe in harnessing AI where it matters most, transforming potential into palpable impact. <br />
                                                <br />Our &nbsp;consultants engage in a deep-dive analysis of your organization's operations, culture, and aspirations. By weaving together this understanding with our vast knowledge of AI advancements, we illuminate AI opportunities that resonate with your business objectives and industry dynamics.
                                            </p>
                                            </div>
                                            <div id="feasibility-assessments" className="w-tab-pane w--tab-active section" role="tabpanel">
                                            <h3>Feasibility Assessments</h3>
                                            <p className="paragraph-8">Venturing into AI initiatives without gauging their feasibility can lead to expended resources with little to show for it. Morningside AI’s Feasibility Assessments provide a rigorous examination of proposed AI projects, ensuring they stand on a foundation of practicality, viability, and potential return on investment. <br />
                                                <br />With a meticulous approach, our consultants evaluate the technical, operational, and financial aspects of your AI aspirations. This comprehensive assessment ensures that every AI project you undertake is actionable and aligns with your business's infrastructure, goals, and resources.
                                            </p>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            
                            <div data-w-tab="chatbot-development" className="w-tab-pane w--tab-active" id="sectionSet3"  aria-labelledby="card3" >
                                <div width="100%" className="services-individual-box">
                                    <div id="buttonSet3" width="100%" data-easing="ease" data-duration-in="300" data-duration-out="100" className="w-tabs">
                                        <div width="100%" className="services-page-tab-menu w-tab-menu buttonset" role="tablist" id='subnav-buttonset3'>
                                            <a id="btn_gpt4-development" className="subtab w--current" role="tab" aria-controls="buttonSet3" aria-selected="true">
                                            <div>GPT Development</div>
                                            </a>
                                            <a id="btn_secure-solutions" className="subtab" role="tab" aria-controls="buttonSet3" aria-selected="false">
                                            <div>Secure Solutions</div>
                                            </a>
                                            <a id="btn_knowledge-response" className="subtab" role="tab" aria-controls="buttonSet3" aria-selected="false">
                                            <div>Knowledge Response</div>
                                            </a>
                                            <a id="btn_model-tuning" className="subtab" role="tab" aria-controls="buttonSet3" aria-selected="false">
                                            <div>Model Tuning</div>
                                            </a>
                                        </div>
                                        <div className="tabs-content w-tab-content" id="Card3Content">
                                            <div id="gpt4-development" className="w-tab-pane w--tab-active section" role="tabpanel" aria-labelledby="gpt4development">
                                                <h3>GPT Development</h3>
                                                <p className="paragraph-9">The conversational AI landscape has been revolutionized with the advent of models like GPT-3 and GPT-4. At Morningside AI, we harness the unmatched capabilities of these groundbreaking models to create state-of-the-art chatbots that deliver human-like interactions, rich contextual understanding, and seamless user experiences. <br />
                                                    <br />Our expertise in GPT-3 and GPT-4 development places us at the forefront of chatbot innovation. By tapping into these models, we craft chatbots that are not just reactive but can also anticipate user needs, understand nuances, and offer solutions that feel genuinely intuitive. <br />
                                                    <br />We are also pleased to announce the introduction of our OpenAI&nbsp;GPT&nbsp;development services. On the back of OpenAI's introduction of GPTs, Morningside AI is now developing GPTs for businesses around the globe.
                                                </p>
                                            </div>
                                            <div id="secure-solutions" className="w-tab-pane w--tab-active section" role="tabpanel" aria-labelledby="securesolutions">
                                                <h3>Secure Solutions</h3>
                                                <p className="paragraph-10">We understand that security is not just an afterthought—it's a foundational requirement. At Morningside AI, we prioritize the protection of your data and your users' interactions, ensuring we are inline with your security and compliance requirements. We craft chatbots that are robust against vulnerabilities and threats, without compromising on functionality or user experience. <br />
                                                    <br />With cyber risks ever-looming, our approach to chatbot development is underpinned by rigorous security protocols. From data encryption to intrusion detection, we incorporate cutting-edge security measures that safeguard both the chatbot and its users.
                                                </p>
                                            </div>
                                            <div id="knowledge-response" className="w-tab-pane w--tab-active section" role="tabpanel" aria-labelledby="knowledgeresponse">
                                                <h3>Knowledge Response</h3>
                                                <p className="paragraph-11">We all know that our data is vast and ever-evolving. Morningside AI can help you tap into your expansive information reservoir, allowing chatbots to provide accurate, up-to-date, and contextually relevant answers. We transcend traditional chatbot capabilities, moving beyond preset responses to offer insights drawn from a rich tapestry of data sources. <br />
                                                    <br />Our chatbots, equipped with Knowledge Response, become dynamic information hubs. They sift through volumes of data, discerning context, intent, and nuance to deliver not just any answer, but the right answer.
                                                </p>
                                            </div>
                                            <div id="model-tuning" className="w-tab-pane w--tab-active section" role="tabpanel" aria-labelledby="modeltuning">
                                                <h3>Model Tuning</h3>
                                                <p className="paragraph-12">A chatbot is only as effective as the underlying model that powers it. We recognize the value of precision, responsiveness, and accuracy. Our Model Tuning service dives deep into the intricacies of your chatbot's machine learning model, optimizing its parameters for peak performance and ensuring it aligns seamlessly with your specific use-case demands. <br />
                                                    <br />Model tuning is both an art and a science. By employing advanced algorithms and a meticulous iterative process, we refine the model, pushing its capabilities to the edge of perfection. The outcome? A chatbot that understands better, responds smarter, and engages more effectively.
                                                </p>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        </div>
                    </figure>
                </section>         
        </div>

        
    );
}

export default Services;
