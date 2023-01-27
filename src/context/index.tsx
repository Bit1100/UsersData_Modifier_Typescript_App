import { createContext, useContext, useReducer, useMemo } from "react";

type Children = {
  children: React.ReactNode;
};

export type user = {
  id: string;
  fullName: string;
  emailId: string;
  aadharNumber: string;
  panNumber: string;
  employeeType: string;
  joiningDate: string;
};

type errorState = {
  message: string;
  errStatus: boolean;
};

type usersState = {
  users: user[];
  formUser: user;
  error: errorState;
  modalState: boolean;
};

type users = {
  type: "SET_USERS";
  payload: user[];
};

type formUser = {
  type: "GET_USER";
  payload: user;
};

type modal = {
  type: "SET_MODAL";
  payload: boolean;
};

type error = {
  type: "SET_ERROR";
  payload: errorState;
};

// Discriminated Union Typing
type actionState = users | formUser | modal | error;

type usersContextType = {
  state: usersState;
  dispatch: React.Dispatch<actionState>;
};

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
  const initialState: usersState = {
    users: [],
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
