import "../styles/modal.css";
import React from "react";

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  onAddTask: (task: string, category: string) => void;
}

export function Modal({ isOpen, onClose, onAddTask }: ModalProps) {
  if (!isOpen) return null;

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const task = event.currentTarget.task.value;
    const category = event.currentTarget.category.value;
    onAddTask(task, category);
    onClose();
    event.currentTarget.reset();
  };

  return (
    <div className="modal-overlay">
      <div className="modal-content">
        <h2>Add New Task</h2>
        <form onSubmit={handleSubmit}>
          <label>
            Task:
            <input type="text" name="task" required />
          </label>
          <label>
            Category:
            <input type="text" name="category" required />
          </label>
          <div className="modal-buttons">
            <button type="submit">Add Task</button>
            <button type="button" onClick={onClose}>
              Cancel
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}