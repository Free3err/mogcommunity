import React from "react";
import "./style.css";

const Loading = () => {
    return (
        <>
            <div className="loading-container">
                <div className="loading-overlay">
                    <div className="loading-spinner"></div>
                </div>
            </div>
        </>
    );
};

export default Loading;
