import { useEffect } from "react";
import TabularData from "./components/TabularData";
import Form from "./components/Form";
import Modal from "./components/Modal";
import "./assets/styles/main.scss";
import { useUsers } from "./context";
import { getUsers, setUsers } from "./utils/storage";
import { data } from "./data";

const App = () => {
  const {
    state: { users },
    dispatch,
  } = useUsers();

  // Set amd then get users data into/to localStorage and populate users in state
  useEffect(() => {
    setUsers(data);
    dispatch({ type: "SET_USERS", payload: getUsers() });
  }, []);

  // Storing the updated users into the localStorage
  useEffect(() => {
    setUsers(users);
  }, [users]);

  return (
    <div className="container">
      <TabularData />
      <Modal>
        <Form />
      </Modal>
    </div>
  );
};

export default App;
