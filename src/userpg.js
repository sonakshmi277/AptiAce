import React, { useState,useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "./userPage.css";
import axios from "axios";

export default function Userpg() {
    const navigate = useNavigate();
    const [chapters, setChapters] = useState([]);
    
    useEffect(() => {
        const fetchChapters = async () => {
            try {
                const res = await axios.post("http://localhost:8000/users"); 
                if (res.data) {
                    setChapters(res.data); 
                }
            } catch (error) {
                console.error("Error fetching chapters", error);
            }
        };

        fetchChapters();
    }, []); 
    
    return (
        <div className="main-box">
            <div className="headLine">
                <h1>Chapter Names</h1>
            </div>
            <ul className="chapter-list">
                {chapters.map((chapter, index) => (
                    <li 
                        key={index} 
                        className="chapter-item"
                        onClick={() => navigate(`/chapter/${chapter}`)} 
                    >
                        {chapter}
                    </li>
                ))}
            </ul>
        </div>
    );
    
}
