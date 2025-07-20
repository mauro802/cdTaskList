import { Status } from "@/app/types";

export default function TaskStatusBadge({ status }: { status: Status }) {
  const color =
    status === "Done"
      ? "bg-green-100 text-green-700"
      : status === "To Do"
      ? "bg-blue-100 text-blue-700"
      : "bg-orange-100 text-orange-700";
  return (
    <span className={`px-2 py-1 rounded text-xs font-semibold ${color}`}>
      {status}
    </span>
  );
}
