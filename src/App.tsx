import { useEffect } from "react";
import TabularData from "./components/TabularData";
import Form from "./components/Form";
import Modal from "./components/Modal";
import "./assets/styles/main.scss";
import { useUsers } from "./context";
import { setUsers } from "./utils/storage";
import { data } from "./data";
import { ErrorBoundary } from "react-error-boundary";
import { ErrorFallback } from "./components/Error";

const App = () => {
  const {
    state: { users },
    dispatch,
  } = useUsers();

  // Set amd then get users data into/to localStorage and populate users in store for the first time only
  useEffect(() => {
    dispatch({ type: "SET_USERS", payload: data });
  }, []);

  // Get users from localstorage & Update users into store
  useEffect(() => {
    setUsers(users);
  }, [users]);

  return (
    <div className="container">
      <ErrorBoundary
        FallbackComponent={ErrorFallback}
        onReset={() => {
          dispatch({ type: "SET_USERS", payload: data });
        }}
      >
        <TabularData />
        <Modal>
          <Form />
        </Modal>
      </ErrorBoundary>
    </div>
  );
};

export default App;
