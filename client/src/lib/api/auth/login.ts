import { LoginPayload } from "@/app/types";
import axios from "@/lib/axios";

export const loginUser = async (data: LoginPayload) => {
  const response = await axios.post("/auth/login", data);
  return response.data;
};
