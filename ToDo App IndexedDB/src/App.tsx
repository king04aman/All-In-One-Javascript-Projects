import React, { useState } from "react";
import { useIndexedDB } from "./hooks/useIndexedDB";
import { Modal } from "./components/Modal";

export const Database = {
  name: "ToDo_DB",
  version: 1,
  tables: ["todo"],
};

export interface ToDo {
  id: number;
  task: string;
  completed: boolean;
  category: string;
}

function App() {
  const [todos, setTodos] = useState<ToDo[]>([]);
  const [isModalOpen, setModalOpen] = useState(false);
  const { isDBConnecting, getAllValue, putValue, updateValue, deleteValue } =
    useIndexedDB<ToDo>(Database.name, Database.tables);

  React.useEffect(() => {
    if (!isDBConnecting) {
      const fetchTodos = async () => {
        try {
          const todos = await getAllValue("todo");
          setTodos(todos);
        } catch (error) {
          console.error("Error fetching todos:", error);
          setTodos([]);
        }
      };

      fetchTodos();
    }
  }, [isDBConnecting, getAllValue]);

  const handleAddTask = async (task: string, category: string) => {
    try {
      const id = todos.length ? todos[todos.length - 1].id + 1 : 1;
      await putValue("todo", { id, task, category, completed: false });
      setTodos((prevTodos) => [
        ...prevTodos,
        { id, task, category, completed: false },
      ]);
    } catch (error) {
      console.error("Error adding task:", error);
    }
  };

  const handleToggleComplete = async (id: number) => {
    try {
      const todoToUpdate = todos.find((todo) => todo.id === id);
      if (todoToUpdate) {
        const updatedCompletionStatus = !todoToUpdate.completed;
        const updatedTodos = todos.map((todo) =>
          todo.id === id
            ? { ...todo, completed: updatedCompletionStatus }
            : todo
        );
        setTodos(updatedTodos);

        await updateValue({
          tableName: "todo",
          id,
          newItem: { completed: updatedCompletionStatus },
        });
      }
    } catch (error) {
      console.error("Error updating task completion:", error);
    }
  };

  // New delete function
  const handleDeleteTask = async (id: number) => {
    try {
      await deleteValue("todo", id);
      setTodos((prevTodos) => prevTodos.filter((todo) => todo.id !== id));
    } catch (error) {
      console.error("Error deleting task:", error);
    }
  };

  const handleModalToggle = () => setModalOpen(!isModalOpen);

  const groupedTodos = todos.reduce((acc, todo) => {
    if (!acc[todo.category]) acc[todo.category] = [];
    acc[todo.category].push(todo);
    return acc;
  }, {} as Record<string, ToDo[]>);

  return (
    <div className="app-container">
      <h1 className="app-title">To-Do List</h1>
      {isDBConnecting ? (
        <p className="app-status">Connecting to IndexedDB...</p>
      ) : (
        <div className="task-container">
          <h2 className="task-title">Tasks by Category</h2>
          {Object.keys(groupedTodos).map((category) => (
            <div key={category} className="task-category">
              <h3>{category}</h3>
              <ul className="task-list">
                {groupedTodos[category].map((todo) => (
                  <li
                    key={todo.id}
                    className={`task-item ${todo.completed ? "completed" : ""}`}
                  >
                    <input
                      type="checkbox"
                      checked={todo.completed}
                      onChange={() => handleToggleComplete(todo.id)}
                    />
                    {todo.task} - {todo.completed ? "Done" : "Pending"}
                    <button
                      className="delete-task-button"
                      onClick={() => handleDeleteTask(todo.id)}
                    >
                      Delete
                    </button>
                  </li>
                ))}
              </ul>
            </div>
          ))}
          <button className="add-task-button" onClick={handleModalToggle}>
            Add Task
          </button>
        </div>
      )}
      <Modal
        isOpen={isModalOpen}
        onClose={handleModalToggle}
        onAddTask={handleAddTask}
      />
    </div>
  );
}

export default App;