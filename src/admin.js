import React, { useState } from "react";
import "./common.css";
import axios from "axios";
export default function Admin() {
    const [chapterName, setChapterName] = useState("");
    const [questionName, setQuestionName] = useState("");
    const [options, setOptions] = useState(["", "", "", ""]); 
    const [correctAnswer, setCorrectAnswer] = useState(null);

    const handleOptionChange = (index, value) => {
        const updatedOptions = [...options];
        updatedOptions[index] = value;
        setOptions(updatedOptions);
    };

    const goToSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.post("http://localhost:8000/chaptt", {
                chapterName,
               questions:[ {questionName,
                options,
                correctAnswer}]
            });
            console.log("Success:", response.data);
            
        } catch (error) {
            console.error("Error:", error.response ? error.response.data : error);
        }
    };

    return (
        <div className="admin-main">
            <h1>Add new question</h1>
            <div className="admin-main2">
                <div className="chap">
                    <input 
                        type="text"
                        value={chapterName}
                        placeholder="Enter chapter name"
                        onChange={(e) => setChapterName(e.target.value)}
                    />
                </div>

                <div className="ques">
                    <input 
                        type="text"
                        value={questionName}
                        placeholder="Enter your question"
                        onChange={(e) => setQuestionName(e.target.value)}
                    />
                </div>
                <div className="options">
                    {options.map((option, index) => (
                        <div key={index} className="option">
                            <input 
                                type="text"
                                value={option}
                                placeholder={`Option ${index + 1}`}
                                onChange={(e) => handleOptionChange(index, e.target.value)}
                            />
                            <input 
                                type="radio"
                                name="correctAnswer"
                                checked={correctAnswer === index}
                                onChange={() => setCorrectAnswer(index)}
                            />
                        </div>
                    ))}
                </div>

               
            </div>
            <div className="submitt">
                <button onClick={goToSubmit} className="bt1">Submit</button>
            </div>
        </div>
    );
}
