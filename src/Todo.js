import React, { useState } from 'react';
import './Todo.css';

function Todo() {
    const [todos, setTodos] = useState([
        { id: 1, title: "Learn React", completed: false },
        { id: 2, title: "Build a Todo App", completed: true },
        { id: 3, title: "Deploy to Production", completed: false }
    ]);

    const [newTodo, setNewTodo] = useState("");
    const [editId, setEditId] = useState(null);
    const [editText, setEditText] = useState("");

    const handleAddTodo = (e) => {
        e.preventDefault();
        if (newTodo.trim() === "") return;

        const newTodoObj = {
            id: todos.length + 1,
            title: newTodo,
            completed: false
        };

        setTodos([...todos, newTodoObj]);
        setNewTodo("");
    };

    const handleDelete = (id) => {
        setTodos(todos.filter(todo => todo.id !== id));
    };

    const handleEdit = (id, title) => {
        setEditId(id);
        setEditText(title);
    };

    const handleEditSubmit = (e) => {
        e.preventDefault();
        setTodos(todos.map(todo =>
            todo.id === editId ? { ...todo, title: editText } : todo
        ));
        setEditId(null);
        setEditText("");
    };

    const handleToggleComplete = (id) => {
        setTodos(todos.map(todo =>
            todo.id === id ? { ...todo, completed: !todo.completed } : todo
        ));
    };

    return (
        <div className="todo-container">
            <h2>Todo List</h2>
            <form onSubmit={handleAddTodo}>
                <input
                    type="text"
                    value={newTodo}
                    onChange={(e) => setNewTodo(e.target.value)}
                    placeholder="Enter new todo"
                />
                <button type="submit">Add</button>
            </form>

            <ul>
                {todos.map(todo => (
                    <li key={todo.id} className={todo.completed ? "completed" : "pending"}>
                        {editId === todo.id ? (
                            <form onSubmit={handleEditSubmit} className="edit-form">
                                <input
                                    type="text"
                                    value={editText}
                                    onChange={(e) => setEditText(e.target.value)}
                                    autoFocus
                                />
                                <button type="submit">Save</button>
                                <button type="button" onClick={() => setEditId(null)}>Cancel</button>
                            </form>
                        ) : (
                            <>
                                <span>
                                    {todo.title} {todo.completed ? "(Completed)" : "(Pending)"}
                                </span>
                                <div className="btn-group">
                                    <button onClick={() => handleToggleComplete(todo.id)}>
                                        {todo.completed ? "Mark Pending" : "Mark Complete"}
                                    </button>
                                    <button onClick={() => handleEdit(todo.id, todo.title)}>Edit</button>
                                    <button onClick={() => handleDelete(todo.id)}>Remove</button>
                                </div>
                            </>
                        )}
                    </li>
                ))}
            </ul>
        </div>
    );
}

export default Todo;