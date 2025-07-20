import { useState } from "react";
import Button from "./Button";
import { Status, TaskModalProps } from "../app/types";

export default function TaskModal({
  mode,
  task,
  onSave,
  onDelete,
  onCancel,
}: TaskModalProps) {
  const [name, setName] = useState(task?.name || "");
  const [status, setStatus] = useState<Status>(task?.status || "To Do");
  const [assignee, setAssignee] = useState(task?.assignee || "");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSave({
      id: task?.id ?? Date.now(),
      name,
      status,
      assignee,
    });
  };

  return (
    <div className="fixed inset-0  bg-opacity-40 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg shadow p-6 w-full max-w-md">
        <h2 className="text-xl font-semibold mb-4">
          {mode === "edit" ? "Edit Task" : "Add a new task"}
        </h2>
        <form onSubmit={handleSubmit}>
          <label className="block mb-2 font-medium">
            Task Name<span className="text-red-500">*</span>
          </label>
          <input
            className="w-full mb-4 px-3 py-2 border rounded"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
            placeholder={mode === "create" ? "e.g. design landing page" : ""}
          />
          <label className="block mb-2 font-medium">
            Status<span className="text-red-500">*</span>
          </label>
          <select
            className="w-full mb-4 px-3 py-2 border rounded"
            value={status}
            onChange={(e) => setStatus(e.target.value as Status)}
            required
          >
            <option value="To Do">To Do</option>
            <option value="In Progress">In Progress</option>
            <option value="Done">Done</option>
          </select>
          <label className="block mb-2 font-medium">Assignee</label>
          <select
            className="w-full mb-4 px-3 py-2 border rounded"
            value={assignee}
            onChange={(e) => setAssignee(e.target.value)}
          >
            <option value="">Select team member</option>
            <option value="John Doe">John Doe</option>
            <option value="Jane Smith">Jane Smith</option>
          </select>
          <div className="flex flex-col gap-2 mt-4">
            <Button
              type="blueButton"
              htmlType="submit"
              label={mode === "edit" ? "Save Changes" : "Create Task"}
            />
            {mode === "edit" && onDelete && (
              <Button
                type="redButton"
                htmlType="button"
                label="Delete Task"
                onClick={onDelete}
              />
            )}
            <Button
              type="shortButton"
              htmlType="button"
              label="Cancel"
              onClick={onCancel}
            />
          </div>
        </form>
      </div>
    </div>
  );
}
