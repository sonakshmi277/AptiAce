import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import "./common.css";

export default function ChapterPage() {
    const { chapterName } = useParams();
    const navigate = useNavigate();
    const [questions, setQuestions] = useState([]);
    const [selectedOptions, setSelectedOptions] = useState({});
    const [showResults, setShowResults] = useState(false);

    useEffect(() => {
        const fetchQuestions = async () => {
            try {
                const res = await axios.get(`http://localhost:8000/questions/${chapterName}`);
                if (res.data) {
                    setQuestions(res.data.questions);
                }
            } catch (error) {
                console.error("Error fetching questions", error);
            }
        };

        fetchQuestions();
    }, [chapterName]);

    const handleOptionSelect = (qIndex, optionIndex) => {
        setSelectedOptions(prev => ({
            ...prev,
            [qIndex]: optionIndex
        }));
    };

    const handleSubmit = () => {
        setShowResults(true);
    };

    return (
        <div className="chapter-container">
            <button className="back-btn" onClick={() => navigate("/userpg")}>← Back to Chapters</button>
            <h1 className="chapter-title">Questions for Chapter {chapterName}</h1>
            
            <div className="question-list">
                {questions.map((question, qIndex) => (
                    <div key={qIndex} className="question-item">
                        <b><p>Q{qIndex + 1}: {question.questionName}</p></b>

                        <div className="options">
                            {question.options.map((option, optionIndex) => {
                                const isSelected = selectedOptions[qIndex] === optionIndex;
                                const isCorrect = showResults && optionIndex === question.correctAnswer;
                                const isWrong = showResults && isSelected && optionIndex !== question.correctAnswer;

                                return (
                                    <label 
                                        key={optionIndex} 
                                        className={`option ${isCorrect ? "correct" : ""} ${isWrong ? "wrong" : ""}`}
                                    >
                                        <input 
                                            type="radio" 
                                            name={`question-${qIndex}`} 
                                            value={option} 
                                            checked={isSelected} 
                                            onChange={() => handleOptionSelect(qIndex, optionIndex)}
                                        />
                                        {option}
                                    </label>
                                );
                            })}
                        </div>
                    </div>
                ))}
            </div>

            <button className="submit-btn" onClick={handleSubmit}>Submit</button>
        </div>
    );
}
