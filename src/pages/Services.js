
import React from 'react';

function Services() {
    return (
        <div class='flex-text'>
            <p className="flex-logo">Our Services</p>
            
            <ul>
                <li>Machine learning and data trend prediction using customer data</li>
                <li>Lead generation and upselling automation</li>
                <li>Call center/customer service automation customized for your business</li>
                <li>Content creation and social network marketing automation</li>
                <li>AI website chatbot trained to service your customers and generate leads</li>
                <li>Responsible AI integrations for web/mobile apps and more</li>
            </ul>      

            <div class="w-tab-pane w--tab-active" id="w-tabs-0-data-w-pane-0" role="tabpanel" style={{ opacity: 1, transition: 'all', opacity: '300ms' }}>
            <div class="services-individual-box">
                <div data-current="Tab 4" data-easing="ease" data-duration-in="300" data-duration-out="100" class="w-tabs">
                    <div class="services-page-tab-menu w-tab-menu" role="tablist">
                    <a data-w-tab="Tab 1" id="workflowautomation" class="subtab workflowautomation w-inline-block w-tab-link" href="#workflow-automation" role="tab" aria-controls="workflow-automation" aria-selected="false" tabindex="-1">
                        <div>Workflow Automation</div>
                    </a>
                    <a data-w-tab="Tab 2" id="naturallanguagesql" class="subtab naturallanguagesql w-inline-block w-tab-link w--current" href="#natural-language-to-sql" role="tab" aria-controls="natural-language-to-sql" aria-selected="true">
                        <div>Natural language to SQL</div>
                    </a>
                    <a data-w-tab="Tab 3" id="complexdatapipelines" class="subtab complexdatapipelines w-inline-block w-tab-link" tabindex="-1" href="#complex-data-pipelines" role="tab" aria-controls="complex-data-pipelines" aria-selected="false">
                        <div>Complex Data Pipelines</div>
                    </a>
                    <a id="selfadaptivesystems" data-w-tab="Tab 4" class="subtab selfadaptivesystems w-inline-block w-tab-link" href="#self-adaptive-decision-systems" role="tab" aria-controls="self-adaptive-decision-systems" aria-selected="false" tabindex="-1">
                        <div>Self-Adaptive Decision Systems</div>
                    </a>
                    </div>
                    <div class="tabs-content w-tab-content">
                        <div id="workflow-automation" data-w-tab="Tab 1" class="w-tab-pane" role="tabpanel" aria-labelledby="workflowautomation" >
                            <h3>Workflow Automation</h3>
                            <p class="paragraph">In today's digital era, efficiency is the backbone of any successful business. At Morningside AI, we harness the power of Autonomous Agents to revolutionize your workflow processes. Our Workflow Automation solution goes beyond traditional task automation; it incorporates intelligent agents that can make decisions, adapt to varying circumstances, and consistently optimize operations.<br /><br />Through our deep understanding of AI and its potential, we design agents that can predictively automate tasks, reducing manual intervention and the chances for human error. Whether you're looking to streamline administrative processes, enhance data operations, or elevate customer interactions, our bespoke autonomous agents are built to integrate seamlessly into your environment.</p>
                        </div>
                        <div id="natural-language-to-sql" data-w-tab="Tab 2" class="w-tab-pane w--tab-active" role="tabpanel" aria-labelledby="naturallanguagesql" style={{ transition: 'all', opacity: '300ms', opacity: 1 }}>
                            <h3>Natural Language to SQL</h3>
                            <p class="paragraph-2">In an age where data drives decisions, accessing and querying databases should be as intuitive as asking a question in plain English. At Morningside AI, we pride ourselves on pushing the boundaries of what's possible. In a recent collaboration with a leading Silicon Valley company, we innovated in the NL to SQL domain, achieving results that were over 40% better than current state-of-the-art methods. This accomplishment underscores our commitment to pioneering advancements in AI technology.<br /><br />Our solution transforms natural language queries into precise SQL statements, allowing users to retrieve, manipulate, and analyze data without the need to understand intricate SQL syntax. Empowering both non-tech professionals and experienced developers alike, we bridge the gap between human language and database queries, making data-driven decisions accessible to all.</p>
                        </div>
                    
                        <div id="complex-data-pipelines" data-w-tab="Tab 3" class="w-tab-pane" role="tabpanel" aria-labelledby="complexdatapipelines">
                            <h3>Complex Data Pipelines</h3>
                            <p class="paragraph-3">Data is the lifeblood of modern businesses, but its sheer volume and complexity can make it challenging to harness effectively. At Morningside AI, we're pioneering the development of intricate data pipelines, transforming raw, disparate data into actionable insights. With our autonomous agent-driven solutions, we navigate the complexities of big data, ensuring fluidity and efficiency in data transition, processing, and analytics. <br /><br />Our expertise lies in designing and deploying data pipelines that handle large-scale, multi-dimensional data. Whether you're dealing with real-time data streams, batch processing, or a hybrid, our autonomous agents optimize processes, ensuring data integrity, and timely delivery for advanced analytics and machine learning applications.</p>
                        </div>
                        <div id="self-adaptive-decision-systems" data-w-tab="Tab 4" class="w-tab-pane" role="tabpanel" aria-labelledby="selfadaptivesystems">
                            <h3>Self-Adaptive Decision Systems</h3>
                            <p class="paragraph-4">In the ever-evolving landscape of business, static decision-making models no longer suffice. At Morningside AI, we're at the forefront of developing Self-Adaptive Decision Systems, a groundbreaking approach that empowers businesses to make intelligent decisions dynamically. These systems are not just reactive but proactively adjust to changing environments, learning from new data and evolving patterns.<br /><br />Our self-adaptive solutions harness the full potential of autonomous agents, enabling them to make decisions based on real-time data, past experiences, and predictive analytics. This continuous loop of learning and adapting ensures that your business stays ahead of the curve, optimizing operations and strategizing for future scenarios.</p>
                        </div>
                    </div>
                </div>
            </div>
        </div>      
        </div>
        
    );
}

export default Services;
