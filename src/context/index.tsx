import { createContext, useContext, useReducer, useMemo } from "react";

import { Children, usersState, actionState, usersContextType } from "../types";

const UsersContext = createContext<usersContextType | null>(null);

UsersContext.displayName = "UsersContext";

const reducer = (state: usersState, action: actionState): usersState => {
  switch (action.type) {
    case "SET_USERS": {
      return { ...state, users: action.payload };
    }
    case "SET_MODAL": {
      return { ...state, modalState: action.payload };
    }
    case "SET_ERROR": {
      return { ...state, error: action.payload };
    }
    case "GET_USER": {
      return { ...state, formUser: action.payload };
    }
    default: {
      return state;
    }
  }
};

export const UsersContextProvider = ({ children }: Children) => {
  // Initial Data
  const initialState: usersState = {
    users: [], //Your updated data is safe in LocalStorage
    formUser: Object.create({}),
    error: { message: "", errStatus: false },
    modalState: false,
  };

  const [state, dispatch] = useReducer(reducer, initialState);

  const value = useMemo(
    () => ({
      state,
      dispatch,
    }),
    [state, dispatch]
  );

  return (
    <UsersContext.Provider value={value}>{children}</UsersContext.Provider>
  );
};

export const useUsers = () => {
  const context = useContext(UsersContext);

  if (!context) {
    throw new Error(
      "useUsers() hook should be used inside the UsersContextProvider"
    );
  }

  return context;
};
