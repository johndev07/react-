import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { Option } from "../../types/option";
import { ApiGet } from "../types/apiTypes";
import { Schema } from "../types/schema";

export const useStates = () => {
  return useQuery({
    queryKey: ["states"],
    queryFn: () => {
      return axios
        .get<Option[]>("http://localhost:3000/states")
        .then((res) => res.data);
    },
  });
};

export const useLanguages = () => {
  return useQuery({
    queryKey: ["languages"],
    queryFn: () =>
      axios
        .get<Option[]>("http://localhost:3000/languages")
        .then((res) => res.data),
  });
};

export const useGender = () => {
  return useQuery({
    queryKey: ["gender"],
    queryFn: () =>
      axios
        .get<Option[]>("http://localhost:3000/genders")
        .then((res) => res.data),
  });
};

export const useSkills = () => {
  return useQuery({
    queryKey: ["skills"],
    queryFn: () =>
      axios
        .get<Option[]>("http://localhost:3000/skills")
        .then((res) => res.data),
  });
};

export const useUsers = () => {
  return useQuery({
    queryKey: ["users"],
    queryFn: (): Promise<Option[]> =>
      axios
        .get<ApiGet[]>("http://localhost:3000/users")
        .then((res) =>
          res.data.map(({ name, id }) => ({ id, label: name } satisfies Option))
        ),
  });
};

export function useUser(id: string) {
  return useQuery({
    queryKey: ["user", { id }],
    queryFn: async (): Promise<Schema> => {
      const { data } = await axios.get<ApiGet>(
        `http://localhost:3000/users/${id}`
      );
      return {
        ...data,
        variant: "edit",
        registerationDateAndTime: new Date(data.registerationDateAndTime),
      };
    },
  });
}
