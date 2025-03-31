import { createSlice } from "@reduxjs/toolkit"
import { PayloadAction } from "@reduxjs/toolkit"
import { IUserDetails } from "../../models/IUserDetails"


interface UserState {
  user: IUserDetails;
  isLoading: boolean;
  error: string;
  isLogged: boolean;
}

const initialState: UserState = {
  user: {
    id: '',
    email: '',
    firstName: '',
    lastName: '',
    isAdmin: false,
    createdAt: '',
    like: false
  },
  isLoading: false,
  error: '',
  isLogged: false,
}

export const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    userFetching(state) {
      state.isLoading = true;
    },
    userFetchingSuccess(state, action: PayloadAction<IUserDetails>) {
      state.isLoading = false;
      state.error = '';
      state.user = action.payload
    },
    userFetchingError(state, action: PayloadAction<string>) {
      state.isLoading = false;
      state.error = action.payload;
    },
  },
})

export default userSlice.reducer;