import { createSlice } from "@reduxjs/toolkit";

const userSlice = createSlice({
  name: "user",
  initialState: {
    registeredUsers: [],
  },
  reducers: {
    registerUser: (state, action) => {
      state.registeredUsers.push(action.payload);
    },
  },
});

export const { registerUser } = userSlice.actions;
export const selectRegisteredUsers = (state) => state.user.registeredUsers;

export default userSlice.reducer;
