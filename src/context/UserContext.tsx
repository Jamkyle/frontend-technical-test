import React, { useContext } from "react";
import { User } from "types/user";
import { getLoggedUserId } from "src/utils/getLoggedUserId";

export interface UserContext {
  user: User | null;
  login?: () => void;
  logout?: () => void;
}

interface Action {
  type: string;
  data?: {};
}

export const UserContext = React.createContext<UserContext>({ user: null });

const userReducer = (state = null, action: Action) => {
  switch (action.type) {
    case "SET_USER":
      return { ...state, ...action.data };
    case "LOGOUT_USER":
      return null;
    default:
      return state;
  }
};

export function UserWrapper({ children }) {
  const [user, dispatch] = React.useReducer(userReducer, null);
  const login = () =>
    dispatch({
      type: "SET_USER",
      data: { id: getLoggedUserId() },
    });
  const logout = () =>
    dispatch({
      type: "LOGOUT_USER",
    });
  return (
    <UserContext.Provider value={{ user, login, logout }}>
      {children}
    </UserContext.Provider>
  );
}

export function useUserContext() {
  return useContext(UserContext);
}

// getLoggedUserID then dipatch id on state UserContext
