import React from "react";

interface IUsersContextData {
  id: number;
  email: string;
  first_name: string;
  avatar: string;
  last_name: string;
}

export const usersContext = React.createContext<IUsersContextData[] | undefined>([]);