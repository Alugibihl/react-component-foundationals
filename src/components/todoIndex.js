// import { useEffect, useState } from "react";
import SingleTodo from "./singleTodo";
import React from "react";

const AllTodos = ({ updateStatus, todos }) => {

    return (
        <div>

            {todos.map((todo) => {
                return <div key={todo.id}> <SingleTodo updateStatus={updateStatus} todo={todo} /></div>
            })}


        </div>
    )
}

export default AllTodos;
