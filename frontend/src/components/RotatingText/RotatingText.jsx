import React, { useState, useEffect } from 'react';
import './RotatingText.css';

const RotatingText = ({ texts, interval = 2000 }) => {
    const [index, setIndex] = useState(0);

    useEffect(() => {
        const timer = setInterval(() => {
            setIndex((prevIndex) => (prevIndex + 1) % texts.length);
        }, interval);
        return () => clearInterval(timer);
    }, [texts, interval]);

    return (
        <span className="rotating-text-container">
            {texts.map((text, i) => (
                <span
                    key={i}
                    className={`rotating-text-item ${i === index ? 'active' : ''}`}
                >
                    {text}
                </span>
            ))}
        </span>
    );
};

export default RotatingText;
