import React from 'react';
import { createRoot } from 'react-dom/client';
import App from './App';
//import './styles.css';



const rootElement = document.getElementById('root');
const root = createRoot(rootElement);

root.render(<App />);


const buttons = document.querySelectorAll('.sub-navigation button');
const sections = document.querySelectorAll('.content-section');

buttons.forEach(button => {
    button.addEventListener('click', () => {
        // Remove 'active' class from all buttons
        buttons.forEach(btn => btn.classList.remove('active'));
        // Add 'active' class to the clicked button
        button.classList.add('active');
        console.log('adding button')

        // Hide all sections
        sections.forEach(section => section.classList.remove('active'));
        // Show the corresponding section
        const target = button.getAttribute('data-section');
        document.getElementById(target).classList.add('active');
    });
});
