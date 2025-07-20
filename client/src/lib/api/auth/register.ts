import { RegisterPayload } from "@/app/types";
import axios from "@/lib/axios";

export const registerUser = async (data: RegisterPayload) => {
  const response = await axios.post("/users", data);
  return response.data;
};
