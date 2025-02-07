"use client";

import { nanoid } from "nanoid";
import { useState } from "react";

const initialTasks = [];

export default function Page() {
  const [tasks, setTasks] = useState(initialTasks);
  const [text, setText] = useState("");
  const [status, setStatus] = useState("All");

  function addTask() {
    const newTaskText = text;
    if (newTaskText) {
      const newTasks = [{ text: newTaskText, completed: false, id: nanoid() }, ...tasks];
      setTasks(newTasks);
    }
    setText("");
  }
  function handleKeyDown(e) {
    if (e.code === "Enter") {
      addTask();
    }
  }
  function toggleCompleted(index) {
    const clonedTasks = [...tasks];
    clonedTasks[index].completed = !clonedTasks[index].completed;
    setTasks(clonedTasks);
  }
  function editTask(index) {
    const updatedtastText = prompt("Task?", tasks[index].text);

    if (updatedtastText) {
      const clonedTasks = [...tasks];
      clonedTasks[index].text = updatedtastText;
      setTasks(clonedTasks);
    }
  }
  function deleteTask(id) {
    if (confirm("U sure?")) {
      const clonedTasks = tasks.filter((task) => task.id !== id);
      setTasks(clonedTasks);
    }
  }
  let filteredTasks = [];
  if (status === "All") {
    filteredTasks = tasks;
  } else {
    filteredTasks = tasks.filter(filterByStatus);
  }
  function filterByStatus(task) {
    if (status === "Active") {
      return !task.completed;
    } else if (status === "Completed") {
      return task.completed;
    }
  }
  return (
    <div>
      <input placeholder="New task..." type="text" value={text} onKeyDown={handleKeyDown}
        onChange={(e) => setText(e.target.value)} />
      <button onClick={addTask}>Add</button>
      <div style={{ margin: "12px 0" }}>
        <button onClick={() => setStatus("All")} style={status === "All" ? { backgroundColor: "black", color: "white" } : {}}>
          All
        </button>
        <button onClick={() => setStatus("Active")} style={status === "Active" ? { backgroundColor: "black", color: "white" } : {}}>
          Active
        </button>
        <button onClick={() => setStatus("Completed")} style={status === "Completed" ? { backgroundColor: "black", color: "white" } : {}}>
          Completed
        </button>
      </div>

      {filteredTasks.map((task, index) => (
        <div key={task.id} className="task">
          <input type="checkbox" checked={task.completed} onChange={() => toggleCompleted(index)} />
          <span className={task.completed ? "done" : ""}>{task.text}</span>
          <button onClick={() => editTask(index)}>Edit</button>
          <button onClick={() => deleteTask(task.id)}>Delete</button>
        </div>
      ))}
      {filteredTasks.length}
    </div>
  );
}
