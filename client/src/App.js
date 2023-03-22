import React, { useState, useEffect } from "react";
import axios from "axios";

const App = () => {
  const [todos, setTodos] = useState([]);
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [editTodoId, setEditTodoId] = useState(null);

  useEffect(() => {
    getTodos();
  }, []);

  const getTodos = async () => {
    const { data } = await axios.get("http://localhost:5000/todos");
    setTodos(data);
  };

  const addTodo = async () => {
    const { data } = await axios.post("http://localhost:5000/todos", {
      title,
      description,
    });
    setTodos([...todos, data]);
    setTitle("");
    setDescription("");
  };

  const updateTodo = async (id) => {
    const { data } = await axios.put(`http://localhost:5000/todos/${id}`, {
      title,
      description,
    });
    setTodos(todos.map((todo) => (todo._id === id ? data : todo)));
    setTitle("");
    setDescription("");
    setEditTodoId(null);
  };

  const deleteTodo = async (id) => {
    await axios.delete(`http://localhost:5000/todos/${id}`);
    setTodos(todos.filter((todo) => todo._id !== id));
  };

  const handleEditTodo = (id, title, description) => {
    setTitle(title);
    setDescription(description);
    setEditTodoId(id);
  };

  return (
    <div>
      <h1>MERN Todo App</h1>
      <form>
        <input
          type="text"
          placeholder="Title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />
        <input
          type="text"
          placeholder="Description"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
        />
        {editTodoId ? (
          <button type="button" onClick={() => updateTodo(editTodoId)}>
            Update Todo
          </button>
        ) : (
          <button type="button" onClick={addTodo}>
            Add Todo
          </button>
        )}
      </form>
      <ul>
        {todos.map((todo) => (
          <li key={todo._id}>
            <input
              type="text"
              value={todo.title}
              readOnly={true}
            />
            <input
              type="text"
              value={todo.description}
              readOnly={true}
            />
            <button type="button" onClick={() => handleEditTodo(todo._id, todo.title, todo.description)}>
              Edit
            </button>
            <button type="button" onClick={() => deleteTodo(todo._id)}>
              Delete
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default App;
