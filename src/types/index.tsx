export type Children = {
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

export type errorState = {
  message: string;
  errStatus: boolean;
};

export type usersState = {
  users: user[];
  formUser: user;
  error: errorState;
  modalState: boolean;
};

export type users = {
  type: "SET_USERS";
  payload: user[];
};

export type formUser = {
  type: "GET_USER";
  payload: user;
};

export type modal = {
  type: "SET_MODAL";
  payload: boolean;
};

export type error = {
  type: "SET_ERROR";
  payload: errorState;
};

// Discriminated Union Typing
export type actionState = users | formUser | modal | error;

export type usersContextType = {
  state: usersState;
  dispatch: React.Dispatch<actionState>;
};
