import { useState } from "react"
import React from "react"


const NewTodo = ({ createStatus }) => {
    const [title, setTitle] = useState("")


    const handleSubmit = (e) => {
        e.preventDefault()

        let todo = {
            title: title,
            userId: 1,
            completed: false
        }
        createStatus(todo)
        setTitle("")
    }

    return (
        <div>
            <div>
                <form onSubmit={handleSubmit}>
                    <label>Add Item {" "}
                        <input
                            type="text"
                            placeholder="New Item"
                            required
                            value={title}
                            onChange={(e) => setTitle(e.target.value)}
                        />

                    </label>
                    <button>Add Item</button>
                </form>

            </div>
        </div >
    )
}
export default NewTodo
