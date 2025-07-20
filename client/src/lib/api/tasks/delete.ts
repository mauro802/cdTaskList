import axios from "@/lib/axios";

export const deleteTask = async (id: number) => {
  const response = await axios.delete(`/tasks/${id}`);
  return response.data;
};
