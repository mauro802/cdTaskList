import { TaskItemProps } from "../app/types";
import TaskStatusBadge from "./TaskStatusBadge";

export default function TaskItem({ task, onEdit }: TaskItemProps) {
  return (
    <tr>
      <td className="py-2">{task.name}</td>
      <td className="p-2">
        <TaskStatusBadge status={task.status} />
      </td>
      <td className="py-2">{task.assignee}</td>
      <td className="p-2">
        <button
          className="text-gray-500 hover:text-blue-600 cursor-pointer"
          onClick={onEdit}
        >
          ✏️
        </button>
      </td>
    </tr>
  );
}
