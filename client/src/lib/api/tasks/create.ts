import { CreateTaskPayload } from "@/app/types";
import axios from "@/lib/axios";

export const createTask = async (data: CreateTaskPayload) => {
  const response = await axios.post("/tasks", data);
  return response.data;
};
