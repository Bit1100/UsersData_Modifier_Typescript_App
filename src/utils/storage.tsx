import { user } from "../types";

export const getUsers = () => {
  const users = JSON.parse(localStorage.getItem("users") || "");
  return users;
};

export const setUsers = (users: user[]) => {
  localStorage.setItem("users", JSON.stringify(users));
};
