import React from "react";
import "./common.css";
import {useNavigate} from 'react-router-dom';
export default function FirstPg(){
    const navigate=useNavigate();
    const goToUser=()=>{
        navigate("/userpg");
    };
    const goToAdmin=()=>{
        navigate("/admin");
    };

    return(
        <div className='main'>
            <div className="user1">
                <button onClick={goToAdmin} className="adminBt">Admin</button>
            </div>

            <div className="user2">
                <button onClick={goToUser} className="userBt">User</button>
            </div>  
        </div>
    )
}