import React, { useEffect } from 'react';

function Services() {

    useEffect(() => {
        // Code to execute after render goes here

        const buttons = document.querySelectorAll('.sub-navigation button');
        const sections = document.querySelectorAll('.content-section');

        buttons.forEach(button => {
            console.log('adding button');
            button.addEventListener('click', () => {
                // Remove 'active' class from all buttons
                buttons.forEach(btn => btn.classList.remove('active'));
                // Add 'active' class to the clicked button
                button.className='active';
                

                // Hide all sections
                sections.forEach(section => section.classList.remove('active'));
                // Show the corresponding section
                const target = button.getAttribute('data-section');
                document.getElementById(target).classList.add('active');
            });
        });

        console.log('Services has rendered!');
      });

    return (
        
        <div className='flex-text'>
            <div className="flex-logo">Our Services</div><br/>
            
                 
            <div className="container">
                <div className="sub-navigation">
                    <div className="flex-text">
                        <a id="card1" data-w-tab="autonomous-agent-development" data-w-id="cac2a898-8bcc-bd89-1138-d25fe07862a5" class="tab card1 w-inline-block w-tab-link w--current" href="#w-tabs-0-data-w-pane-0" role="tab" aria-controls="w-tabs-0-data-w-pane-0" aria-selected="true">
                            <div class="services-card-number-div">
                                <div class="services-button-version-2">
                                    <div>#1 </div>
                                </div>
                                <div class="services-indicator-outline">
                                    <div class="div-block-2"></div>
                                </div>
                            </div>
                            <h3 class="h3 green">AUTONOMOUS AGENT DEVELOPMENT</h3>
                        </a>
                    </div>
                    <div className="flex-text">
                        <a id="card1" data-w-tab="autonomous-agent-development" data-w-id="cac2a898-8bcc-bd89-1138-d25fe07862a5" class="tab card1 w-inline-block w-tab-link w--current" href="#w-tabs-0-data-w-pane-0" role="tab" aria-controls="w-tabs-0-data-w-pane-0" aria-selected="true">
                            <div class="services-card-number-div">
                                <div class="services-button-version-2">
                                <div>#1 </div>
                                </div>
                                <div class="services-indicator-outline">
                                <div class="div-block-2"></div>
                                </div>
                            </div>
                            <h3 class="h3 green">AUTONOMOUS AGENT DEVELOPMENT</h3>
                        </a>
                    </div>
                    <div className="flex-text">
                        <a id="card3" data-w-tab="chatbot-development" data-w-id="cac2a898-8bcc-bd89-1138-d25fe07862ab" class="tab card3 w-inline-block w-tab-link" href="#w-tabs-0-data-w-pane-2" role="tab" aria-controls="w-tabs-0-data-w-pane-2" aria-selected="false">
                            <div class="services-card-number-div">
                                <div class="services-button-version-2 white">
                                <div>#3 </div>
                                </div>
                                <div class="services-indicator-outline white">
                                <div class="div-block-2 _2"></div>
                                </div>
                            </div>
                            <h3 class="h3 white">CHATBOT DEVELOPMENT</h3>
                        </a>
                    </div>
                </div><br/>
                <div className="sub-navigation">
                    <button data-section="workflow-automation" className="active">Workflow Automation</button>
                    <button data-section="natural-language-sql">Natural Language to SQL</button>
                    <button data-section="complex-data-pipelines">Complex Data Pipelines</button>
                    <button data-section="self-adaptive-decisions">Self-Adaptive Decision Systems</button>
                </div>
                <div id="workflow-automation" className="content-section active">
                    <h2>Workflow Automation</h2>
                    <p>Streamline your business processes with intelligent workflow automation designed to save time and increase efficiency.</p>
                    <ul>
                        <li>Machine learning and data trend prediction using customer data</li>
                        <li>Lead generation and upselling automation</li>
                        <li>Call center/customer service automation customized for your business</li>
                        <li>Content creation and social network marketing automation</li>
                        <li>AI website chatbot trained to service your customers and generate leads</li>
                        <li>Responsible AI integrations for web/mobile apps and more</li>
                    </ul>
                </div>
                <div id="natural-language-sql" className="content-section">
                    <h2>Natural Language to SQL</h2>
                    <p>Convert natural language queries into structured SQL commands, enabling seamless data analysis for non-technical users.</p>
                </div>
                <div id="complex-data-pipelines" className="content-section">
                    <h2>Complex Data Pipelines</h2>
                    <p>Manage and process complex data pipelines with ease using our advanced integration and orchestration tools.</p>
                </div>
                <div id="self-adaptive-decisions" className="content-section">
                    <h2>Self-Adaptive Decision Systems</h2>
                    <p>Implement self-adaptive decision-making systems that dynamically optimize operations and improve outcomes.</p>
                </div>
            </div>
        </div>

        
    );
}

export default Services;
