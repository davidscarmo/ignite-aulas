import { useQuery } from "react-query";
import { api } from "../api";

type User = {
  id: string;
  name: string;
  email: string;
  createdAt: string;
};
type GetUsersResponse = {
  totalCount: number;
  users: User[];
};
export const getUsers = async (page: number): Promise<GetUsersResponse> => {
  const { data, headers } = await api.get<any>("users", { params: { page } });
  const totalCount = Number(headers["x-total-count"]);
  const users = data.users.map((user) => {
    return {
      id: user.id,
      name: user.name,
      email: user.email,
      createdAt: new Date(user.createdAt).toLocaleDateString("pt-BR", {
        day: "2-digit",
        month: "long",
        year: "numeric",
      }),
    };
  });
  return { users, totalCount };
};
// ["users", page ] it creates a different cache index every time that the page changes for a new page. 
export const useUsers = (page: number) => {
  return useQuery(["users", page], () => getUsers(page), {
    staleTime: 1000 * 5,
  });
};
