"use client";
import { useState, useEffect } from "react";
import { toast } from "react-toastify";
import TaskItem from "./TaskItem";
import Button from "./Button";
import TaskModal from "./TaskModal";
import { Task, Status } from "../app/types";
import { createTask } from "@/lib/api/tasks/create";
import { updateTask } from "@/lib/api/tasks/update";
import { getAllTasks } from "@/lib/api/tasks/getAll";
import { deleteTask } from "@/lib/api/tasks/delete";

export default function TaskList() {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [activeFilter, setActiveFilter] = useState<Status | null>(null);
  const [showModal, setShowModal] = useState(false);
  const [editTask, setEditTask] = useState<Task | null>(null);

  useEffect(() => {
    const fetchTasks = async () => {
      try {
        const allTasks = await getAllTasks();

        setTasks(allTasks);
        toast.success("Tasks loaded");
      } catch (error) {
        toast.error("Failed to load tasks");
      }
    };

    fetchTasks();
  }, []);

  const handleFilterClick = (status: Status) => {
    setActiveFilter((prev) => (prev === status ? null : status));
  };

  const handleAddTask = () => {
    setEditTask(null);
    setShowModal(true);
  };

  const handleEditTask = (task: Task) => {
    setEditTask(task);
    setShowModal(true);
  };

  const handleCloseModal = () => {
    setEditTask(null);
    setShowModal(false);
  };

  const handleSaveTask = async (task: Task) => {
    try {
      if (editTask) {
        const response = await updateTask(task);
        const updated = response.data;
        setTasks((prev) => prev.map((t) => (t.id === task.id ? updated : t)));
        toast.success("Task updated successfully");
      } else {
        const response = await createTask({
          name: task.name,
          status: task.status,
          assignee: task.assignee,
        });
        const created = response.data;
        setTasks((prev) => [...prev, created]);
        toast.success("Task created successfully");
      }
    } catch (error) {
      toast.error("Failed to save task");
    }

    handleCloseModal();
  };

  const handleDeleteTask = async () => {
    if (!editTask) return;

    try {
      await deleteTask(editTask.id);
      setTasks((prev) => prev.filter((t) => t.id !== editTask.id));
      toast.success("Task deleted successfully");
    } catch (error) {
      toast.error("Failed to delete task");
    }

    handleCloseModal();
  };

  const filteredTasks = activeFilter
    ? tasks.filter((task) => task.status === activeFilter)
    : tasks;

  return (
    <div className="bg-white rounded-lg shadow p-20">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-xl font-semibold">Task List</h2>
        <Button type="blueButton" label="+ Task" onClick={handleAddTask} />
      </div>
      {/* Filters*/}
      <div className="mb-4 flex gap-2">
        <Button
          type={activeFilter === "To Do" ? "blueButton" : "shortButton"}
          label="To do"
          onClick={() => handleFilterClick("To Do")}
        />
        <Button
          type={activeFilter === "In Progress" ? "blueButton" : "shortButton"}
          label="In Progress"
          onClick={() => handleFilterClick("In Progress")}
        />
        <Button
          type={activeFilter === "Done" ? "blueButton" : "shortButton"}
          label="Done"
          onClick={() => handleFilterClick("Done")}
        />
      </div>
      {/* Tasks Table */}
      <table className="w-full">
        <thead>
          <tr className="text-left text-gray-600 text-sm">
            <th>Task</th>
            <th className="px-2">Status</th>
            <th>Assignee</th>
            <th></th>
          </tr>
        </thead>
        <tbody>
          {filteredTasks.map((task, i) => (
            <TaskItem key={i} task={task} onEdit={() => handleEditTask(task)} />
          ))}
        </tbody>
      </table>

      {showModal && (
        <TaskModal
          mode={editTask ? "edit" : "create"}
          task={editTask || undefined}
          onSave={handleSaveTask}
          onDelete={handleDeleteTask}
          onCancel={handleCloseModal}
        />
      )}
    </div>
  );
}
