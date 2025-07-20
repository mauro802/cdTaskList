import { UpdateTaskPayload } from "@/app/types";
import axios from "@/lib/axios";

export const updateTask = async (data: UpdateTaskPayload) => {
  const response = await axios.put(`/tasks/${data.id}`, data);
  return response.data;
};
