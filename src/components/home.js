import React, { useEffect, useState } from "react";
import NewTodo from "./newTodo";
import AllTodos from "./todoIndex";
import { useNavigate } from "react-router-dom";

function Home() {
    const [todos, setTodos] = useState([])
    const [filter, setFilter] = useState("all")
    const navigate = useNavigate()

    let callAll = async () => {
        try {
            let response = await fetch('https://jsonplaceholder.typicode.com/todos')
            if (response.ok) {
                let list = await response.json()
                setTodos(list)
            }
        } catch (error) {
            console.error(error)
        }
    }

    const updateStatus = async (todo) => {
        try {
            let response = await fetch(`https://jsonplaceholder.typicode.com/todos/${todo.id}`, {
                method: "PUT",
                body: { ...todo, completed: !todo.completed }
            })
            let temp = [...todos]
            temp[todo.id - 1] = {
                ...temp[todo.id - 1], completed: !temp[todo.id - 1].completed
            }
            setTodos(temp)
        }
        catch (e) {
            console.error(e)
        }
    }

    const createStatus = async (todo) => {
        try {
            let response = await fetch(`https://jsonplaceholder.typicode.com/todos`, {
                method: "POST",
                body: todo
            })
            if (response.ok) {
                // let created = await response.json()
                let temp = [...todos]
                todo.id = todos.length + 1
                temp.push(todo)
                setTodos(temp)
            }
        }
        catch (e) {
            console.error(e)
        }
    }

    const filterTodos = () => {
        if (filter === "complete") {
            return todos.filter(todo => todo.completed === true)
        }
        else if (filter === "incomplete") {
            return todos.filter(todo => todo.completed === false)
        } else {
            return todos
        }
    }
    useEffect(() => {
        callAll()
    }, [])

    return (
        <div className="App">
            <button onClick={() => navigate("/images")}>Carousel</button>
            <button onClick={() => navigate("/nasa")}>Nasa</button>
            <div className="pic"> Sort By:{" "}
                <button onClick={() => setFilter("all")}>All</button>
                <button onClick={() => setFilter("complete")}>Completed</button>
                <button onClick={() => setFilter("incomplete")}>Incomplete</button>
            </div>
            <NewTodo createStatus={createStatus} />
            {todos && <AllTodos updateStatus={updateStatus} todos={filterTodos()} />}
        </div >
    )
}
export default Home
