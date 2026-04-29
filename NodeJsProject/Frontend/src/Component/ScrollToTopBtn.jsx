import React, { useState, useEffect } from 'react';

export default function ScrollToTopBtn() {
    const [visible, setVisible] = useState(false);

    useEffect(() => {
        const onScroll = () => {
            setVisible(window.scrollY > 300);
        };
        window.addEventListener('scroll', onScroll);
        return () => window.removeEventListener('scroll', onScroll);
    }, []);

    const scrollUp = () => {
        window.scrollTo({ top: 0, behavior: 'smooth' });
    };

    return (
        <>
            <style>{`
                .scroll-top-btn {
                    position: fixed;
                    bottom: 30px;
                    right: 25px;
                    width: 48px;
                    height: 48px;
                    border-radius: 50%;
                    background: linear-gradient(135deg, #00d4ff, #0099cc);
                    color: #000;
                    border: none;
                    cursor: pointer;
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    font-size: 20px;
                    box-shadow: 0 6px 25px rgba(0, 212, 255, 0.4);
                    z-index: 9999;
                    transition: opacity 0.3s ease, transform 0.3s ease;
                    opacity: 0;
                    transform: translateY(20px);
                    pointer-events: none;
                }

                .scroll-top-btn.show {
                    opacity: 1;
                    transform: translateY(0);
                    pointer-events: all;
                }

                .scroll-top-btn:hover {
                    transform: translateY(-4px);
                    box-shadow: 0 10px 35px rgba(0, 212, 255, 0.55);
                }

                .scroll-top-btn:active {
                    transform: scale(0.94);
                }
            `}</style>

            <button
                className={`scroll-top-btn ${visible ? 'show' : ''}`}
                onClick={scrollUp}
                title="Back to Top"
            >
                <i className="bi bi-arrow-up"></i>
            </button>
        </>
    );
}
