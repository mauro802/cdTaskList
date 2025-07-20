import axios from "@/lib/axios";
import { Task } from "@/app/types";

export async function getAllTasks(): Promise<Task[]> {
  const res = await axios.get("/tasks");
  return res.data.data;
}
