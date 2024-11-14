import { QueryClient, useMutation } from "@tanstack/react-query";
import { Schema } from "../types/schema";
import axios from "axios";

export const useCreateUser = () => {
  const queryClient = QueryClient();
  return useMutation({
    mutationFn: async (data: Schema) => {
      await axios.post("http://localhost:8080/users", data);
    },
    onSuccess: () => {},
  });
};
