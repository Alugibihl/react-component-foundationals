import '../index.css'
import React from 'react';
// import { useState } from "react";


const SingleTodo = ({ updateStatus, todo }) => {
    // const [status, setStatus] = useState(todo.completed)
    return (
        <div className="box-hold">
            <div>{todo.title},</div>
            <div> userId: {todo.userId},</div>
            <div> Id: {todo.id},</div>
            <div> Status: {todo.completed === true ? "complete" : "incomplete"}</div>
            <button onClick={() => updateStatus(todo)}>Change Status</button>

        </div>
    )
}
export default SingleTodo;
