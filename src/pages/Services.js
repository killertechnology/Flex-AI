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
                                            <div>Natural language Analysis</div>
                                            </a>
                                            <a id="btn_complex-data-pipelines" aria-controls="buttonSet1" className="subtab" role="tab">
                                            <div>Conversational Pathways</div>
                                            </a>
                                            <a id="btn_self-adaptive-decision-systems" aria-controls="buttonSet1" className="subtab " role="tab">
                                            <div>Self-Adaptive Decision Systems</div>
                                            </a>
                                        </div>
                                        <div className="tabs-content w-tab-content" id="Card1Content">
                                            <div id="workflow-automation" className="w-tab-pane w--tab-active section" role="tabpanel">
                                                <h3>Workflow Automation</h3>
                                                <p className="paragraph">
                                                    <p>Our autonomous agents streamline workflows by automating repetitive tasks and enhancing efficiency. We design systems that integrate seamlessly into your processes, reducing manual effort and boosting productivity.</p>
                                                    <p>Using advanced algorithms, our agents optimize operations, ensuring smooth task execution and resource allocation. We tailor solutions to fit your unique business needs.</p>
                                                    <p>With automated workflows, you save time and resources, enabling your team to focus on strategic priorities and drive innovation.</p>
                                                </p>
                                            </div>
                                            <div id="natural-language-to-sql" className="w-tab-pane w--tab-active section" role="tabpanel" >
                                                <h3>Natural Language Analysis</h3>
                                                <p className="paragraph-2">
                                                    <p>We build autonomous agents capable of analyzing natural language to extract insights and understand user intent. These systems process text and speech with precision, delivering actionable information.</p>
                                                    <p>Our solutions enhance communication, enabling better customer support, sentiment analysis, and data-driven decision-making. They are designed to evolve with your language processing needs.</p>
                                                    <p>By leveraging natural language analysis, you unlock deeper insights and improve user experiences across applications.</p>
                                                </p>
                                            </div>
                                            <div id="complex-data-pipelines" className="w-tab-pane w--tab-active section" role="tabpanel" >
                                                <h3>Conversational Pathways</h3>
                                                <p className="paragraph-3">
                                                    <p>Our autonomous agents create dynamic conversational pathways, enabling seamless user interactions. They adapt in real time, delivering personalized and context-aware responses.</p>
                                                    <p>We design these systems to enhance customer engagement, improve support experiences, and drive satisfaction. Each pathway aligns with your business objectives and audience needs.</p>
                                                    <p>With conversational pathways, you offer intuitive, impactful interactions that strengthen relationships and achieve results.</p>
                                                </p>
                                            </div>
                                            <div id="self-adaptive-decision-systems" className="w-tab-pane w--tab-active section" role="tabpanel" >
                                                <h3>Self-Adaptive Decision Systems</h3>
                                                <p className="paragraph-4">
                                                    <p>We develop self-adaptive decision systems that enable autonomous agents to learn and evolve. These systems adjust to new data and conditions, ensuring optimal decision-making.</p>
                                                    <p>Our solutions empower agents to operate independently, solving complex problems and improving outcomes over time. They are designed to be robust and scalable.</p>
                                                    <p>With self-adaptive systems, your business gains agility and responsiveness, staying competitive in dynamic environments.</p>
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
                                            <p className="paragraph-5">
                                            <p>Our AI business develops tailored strategies that align technology with your goals. We analyze your vision, challenges, and market landscape to create actionable roadmaps that optimize operations and drive growth.</p>
                                            <p>Our process identifies core challenges, analyzes trends, and designs AI strategies to enhance efficiency and innovation. We prioritize measurable outcomes and long-term success for your organization.</p>
                                            <p>From ideation to implementation, we ensure strategies remain adaptive and future-proof, delivering lasting value as your business evolves.</p>

                                            </p>
                                            </div>
                                            <div id="performance-evaluation" className="w-tab-pane w--tab-active section" role="tabpanel">
                                                <h3>Performance Evaluation</h3>
                                                <p className="paragraph-6"><p>We provide comprehensive performance evaluations to ensure your AI models deliver accurate and reliable results. Using advanced metrics, we assess alignment with your goals and optimize for scalability.</p>
                                                    <p>Our evaluations identify improvements, reduce bias, and enhance reliability. Whether for predictive analytics or automation, we maximize the value of your AI investment.</p>
                                                    <p>We also guide upgrades or retraining, ensuring your models stay relevant and effective as requirements evolve.</p>
                                                </p>
                                            </div>
                                            <div id="use-case-identification" className="w-tab-pane w--tab-active section" role="tabpanel">
                                            <h3>Use Case Identification</h3>
                                            <p className="paragraph-7">
                                                <p>We identify high-impact AI use cases that solve key challenges. Through consultations, we uncover opportunities to address bottlenecks, market gaps, and customer needs.</p>
                                                <p>Each use case aligns with clear objectives, detailing ROI and operational benefits. We prioritize and implement cases that deliver quick wins and long-term value.</p>
                                                <p>Our expertise ensures your use cases align with strategic goals, enabling scalable growth and innovation.</p>
                                            </p>
                                            </div>
                                            <div id="feasibility-assessments" className="w-tab-pane w--tab-active section" role="tabpanel">
                                            <h3>Feasibility Assessments</h3>
                                            <p className="paragraph-8">
                                                <p>We conduct detailed feasibility assessments to evaluate AI project viability. By analyzing impact, resources, and risks, we ensure initiatives are aligned with your capabilities.</p>
                                                <p>We assess data infrastructure, technical constraints, and stakeholder readiness, identifying challenges and mitigation strategies.</p>
                                                <p>Our assessments provide realistic timelines, costs, and insights, helping you pursue AI projects with confidence and measurable results.</p>
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
                                                <p className="paragraph-9">
                                                    <p>We specialize in developing GPT-based chatbots tailored to your business needs. These advanced models deliver natural, engaging, and intelligent conversations with users.</p>
                                                    <p>Our GPT chatbots integrate seamlessly into your platforms, enhancing customer experiences and automating communication. They are designed to understand context and provide accurate responses.</p>
                                                    <p>With GPT development, you gain a powerful tool for scalable, efficient, and user-friendly interactions.</p>
                                                </p>
                                            </div>
                                            <div id="secure-solutions" className="w-tab-pane w--tab-active section" role="tabpanel" aria-labelledby="securesolutions">
                                                <h3> Secure Solutions & Responsibility</h3>
                                                <p className="paragraph-10">
                                                    <p>We prioritize security and ethical responsibility in chatbot development, ensuring data protection and compliance with privacy standards. Our systems are built with robust safeguards to prevent misuse.</p>
                                                    <p>Our team incorporates ethical AI principles, ensuring transparency, fairness, and accountability in chatbot interactions.</p>
                                                    <p>With secure and responsible solutions, you can deploy chatbots with confidence, fostering trust with your users.</p>
                                                </p>
                                            </div>
                                            <div id="knowledge-response" className="w-tab-pane w--tab-active section" role="tabpanel" aria-labelledby="knowledgeresponse">
                                                <h3>Knowledge Response</h3>
                                                <p className="paragraph-11">
                                                    <p>Our chatbots excel in delivering accurate, context-aware responses using vast knowledge bases. They provide users with precise information tailored to their queries.</p>
                                                    <p>We ensure the systems are designed to learn and update as knowledge evolves, maintaining relevance and accuracy over time.</p>
                                                    <p>With knowledge response capabilities, your chatbots enhance user trust and satisfaction by delivering the right answers, every time.</p>
                                                </p>
                                            </div>
                                            <div id="model-tuning" className="w-tab-pane w--tab-active section" role="tabpanel" aria-labelledby="modeltuning">
                                                <h3>Model Tuning</h3>
                                                <p className="paragraph-12">
                                                    <p>We provide expert model tuning to customize chatbot behavior and improve performance. This ensures your chatbot aligns with your specific use cases and brand personality.</p>
                                                    <p>Our team fine-tunes models for accuracy, efficiency, and responsiveness, addressing domain-specific needs and user preferences.</p>
                                                    <p>With optimized model tuning, your chatbot delivers superior interactions and adapts seamlessly to your goals.</p>
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
