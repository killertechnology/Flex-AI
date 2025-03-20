import React, { useState } from 'react';

function Services() {
    const [expandedSection, setExpandedSection] = useState(null);
    const [selectedContent, setSelectedContent] = useState({});

    const services = [
        {
            title: "AI Agent Development",
            buttons: [
                { name: "Workflow Automation", content: "Our autonomous agents streamline workflows by automating repetitive tasks and enhancing efficiency. We design systems that integrate seamlessly into your processes, reducing manual effort and boosting productivity.\n\nUsing advanced algorithms, our agents optimize operations, ensuring smooth task execution and resource allocation. We tailor solutions to fit your unique business needs.\n\nWith automated workflows, you save time and resources, enabling your team to focus on strategic priorities and drive innovation." },
                { name: "Natural Language Analysis", content: "We build autonomous agents capable of analyzing natural language to extract insights and understand user intent. These systems process text and speech with precision, delivering actionable information.\n\nOur solutions enhance communication, enabling better customer support, sentiment analysis, and data-driven decision-making. They are designed to evolve with your language processing needs.\n\nBy leveraging natural language analysis, you unlock deeper insights and improve user experiences across applications." },
                { name: "Conversational Pathways", content: "Our autonomous agents create dynamic conversational pathways, enabling seamless user interactions. They adapt in real time, delivering personalized and context-aware responses.\n\nWe design these systems to enhance customer engagement, improve support experiences, and drive satisfaction. Each pathway aligns with your business objectives and audience needs.\n\nWith conversational pathways, you offer intuitive, impactful interactions that strengthen relationships and achieve results." },
                { name: "Self-Adaptive Decision Systems", content: "We develop self-adaptive decision systems that enable autonomous agents to learn and evolve. These systems adjust to new data and conditions, ensuring optimal decision-making.\n\nOur solutions empower agents to operate independently, solving complex problems and improving outcomes over time. They are designed to be robust and scalable.\n\nWith self-adaptive systems, your business gains agility and responsiveness, staying competitive in dynamic environments." }
            ]
        },
        {
            title: "Enterprise Consulting",
            buttons: [
                { name: "Strategy Development", content: "Our AI business develops tailored strategies that align technology with your goals. We analyze your vision, challenges, and market landscape to create actionable roadmaps that optimize operations and drive growth.<br /><br />Our process identifies core challenges, analyzes trends, and designs AI strategies to enhance efficiency and innovation. We prioritize measurable outcomes and long-term success for your organization.<br /><br />From ideation to implementation, we ensure strategies remain adaptive and future-proof, delivering lasting value as your business evolves." },
                { name: "Performance Evaluation", content: "We provide comprehensive performance evaluations to ensure your AI models deliver accurate and reliable results. Using advanced metrics, we assess alignment with your goals and optimize for scalability.<br /><br />Our evaluations identify improvements, reduce bias, and enhance reliability. Whether for predictive analytics or automation, we maximize the value of your AI investment.<br /><br />We also guide upgrades or retraining, ensuring your models stay relevant and effective as requirements evolve." },
                { name: "Use Case Identification", content: "We identify high-impact AI use cases that solve key challenges. Through consultations, we uncover opportunities to address bottlenecks, market gaps, and customer needs.<br /><br />Each use case aligns with clear objectives, detailing ROI and operational benefits. We prioritize and implement cases that deliver quick wins and long-term value.<br /><br />Our expertise ensures your use cases align with strategic goals, enabling scalable growth and innovation." },
                { name: "Feasibility Assessments", content: "We conduct detailed feasibility assessments to evaluate AI project viability. By analyzing impact, resources, and risks, we ensure initiatives are aligned with your capabilities.<br /><br />We assess data infrastructure, technical constraints, and stakeholder readiness, identifying challenges and mitigation strategies.<br /><br />Our assessments provide realistic timelines, costs, and insights, helping you pursue AI projects with confidence and measurable results." }
            ]
        },
        {
            title: "Chatbot Development",
            buttons: [
                { name: "GPT Development", content: "We specialize in developing GPT-based chatbots tailored to your business needs. These advanced models deliver natural, engaging, and intelligent conversations with users.<br /><br />Our GPT chatbots integrate seamlessly into your platforms, enhancing customer experiences and automating communication. They are designed to understand context and provide accurate responses.<br /><br />With GPT development, you gain a powerful tool for scalable, efficient, and user-friendly interactions." },
                { name: "Secure Solutions & Responsibility", content: "We prioritize security and ethical responsibility in chatbot development, ensuring data protection and compliance with privacy standards. Our systems are built with robust safeguards to prevent misuse.<br /><br />Our team incorporates ethical AI principles, ensuring transparency, fairness, and accountability in chatbot interactions.<br /><br />With secure and responsible solutions, you can deploy chatbots with confidence, fostering trust with your users." },
                { name: "Knowledge Response", content: "Our chatbots excel in delivering accurate, context-aware responses using vast knowledge bases. They provide users with precise information tailored to their queries.<br /><br />We ensure the systems are designed to learn and update as knowledge evolves, maintaining relevance and accuracy over time.<br /><br />With knowledge response capabilities, your chatbots enhance user trust and satisfaction by delivering the right answers, every time." },
                { name: "Model Tuning", content: "We provide expert model tuning to customize chatbot behavior and improve performance. This ensures your chatbot aligns with your specific use cases and brand personality.<br /><br />Our team fine-tunes models for accuracy, efficiency, and responsiveness, addressing domain-specific needs and user preferences.<br /><br />With optimized model tuning, your chatbot delivers superior interactions and adapts seamlessly to your goals." }
            ]
        }
    ];

    return (
        <section className="services-container">
            <h2>Our Services</h2>
            <p>Flex-AI offers a comprehensive suite of AI-driven services tailored to meet the unique needs of businesses across various industries.</p>
            <div style={{"justify-content":"center"}} style={{"padding-left": 30 }}>

                
                {services.map((service, index) => (
                    

                    
                        <table align='center' border={1} width={"90%"} height={"1"}>
                            <tbody>
                                <tr className="service-card tab card1 w-inline-block w-tab-link" onClick={() => setExpandedSection(expandedSection === index ? null : index)}>
                                    <td valign='middle'>
                                        <div key={index} >
                                            {service.title}
                                        </div>
                                    </td>
                                    <td valign='middle'>
                                        <div class="services-card-number-div">
                                            <div class="services-button-version-2 white">
                                                <div>#${index+1} </div>
                                            </div>
                                            <div class="services-indicator-outline">
                                                <div class="div-block-2"></div>
                                            </div>
                                        </div>
                                    </td>
                                </tr>
                                {expandedSection === index && (
                                    <>
                                <tr>
                                    <td colSpan={2}>
                                                <div className="button-container">
                                                    {service.buttons.map((button, btnIndex) => (
                                                        <button key={btnIndex} 
                                                            onClick={() => setSelectedContent({ ...selectedContent, [index]: button.content })} 
                                                            style={{ padding: '20px', height: '50px',
                                                                border: '1px black'
                                                             }}>
                                                            {button.name}
                                                        </button>
                                                    ))}
                                                </div>
                                    </td>
                                </tr>
                                <tr>
                                    <td colSpan={2}><div className="content-box">{selectedContent[index]}</div></td>
                                </tr>
                                </>
                             )}
                            </tbody>
                        </table>
                        
                        
                        


                ))}</div>
        </section>
    );
}

export default Services;
