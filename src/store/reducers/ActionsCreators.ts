import { AppDispatch } from "../store";
import { getUsers, getUser } from "../../api/api";
import { usersSlice } from "./UsersSlice";
import { userSlice } from "./UserSlice";
import { IUser } from "../../models/IUser";

// Тестовые данные для заглушки
const mockUsers: IUser[] = [
  {
    id: "1",
    email: "test1@example.com",
    firstName: "Иван",
    lastName: "Петров",
    isAdmin: false,
    createdAt: new Date().toISOString(),
    like: false
  },
  {
    id: "2",
    email: "test2@example.com",
    firstName: "Мария",
    lastName: "Сидорова",
    isAdmin: true,
    createdAt: new Date().toISOString(),
    like: false
  },
  {
    id: "3",
    email: "test3@example.com",
    firstName: "Алексей",
    lastName: "Иванов",
    isAdmin: false,
    createdAt: new Date().toISOString(),
    like: false
  },
  {
    id: "4",
    email: "test4@example.com",
    firstName: "Елена",
    lastName: "Козлова",
    isAdmin: false,
    createdAt: new Date().toISOString(),
    like: false
  }
];

export const fetchUsers = (token: string) => async (dispatch: AppDispatch) => {
  try {
    if (token && token.length > 0 && token !== "undefined") {
      dispatch(usersSlice.actions.usersFetching());
      
      // Используем заглушку вместо реального API
      // const users = await getUsers();
      // const usersWithLike = users.map((user: IUser) => ({
      //   ...user,
      //   like: false
      // }));
      
      // Используем тестовые данные
      dispatch(usersSlice.actions.usersFetchingSuccess(mockUsers));
    }
  } catch (e) {
    if (e instanceof Error) {
      dispatch(usersSlice.actions.usersFetchingError(e.message));
    }
  }
}

export const fetchUser = (id: string) => async (dispatch: AppDispatch) => {
  try {
    dispatch(usersSlice.actions.usersFetching());
    // Используем заглушку вместо реального API
    // const user = await getUser(id);
    
    // Используем тестовые данные
    const user = mockUsers.find(u => u.id === id);
    if (user) {
      dispatch(userSlice.actions.userFetchingSuccess(user));
    } else {
      throw new Error('User not found');
    }
  } catch (e) {
    if (e instanceof Error) {
      dispatch(usersSlice.actions.usersFetchingError(e.message));
    }
  }
}


