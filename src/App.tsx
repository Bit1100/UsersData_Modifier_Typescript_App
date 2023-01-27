import { useEffect } from "react";
import TabularData from "./components/TabularData";
import Form from "./components/Form";
import Modal from "./components/Modal";
import "./assets/styles/main.scss";
import { useUsers } from "./context";
import { data } from "./data";
// import { getUsers, setUsers } from "./utils/storage";

const App = () => {
  const { dispatch } = useUsers();

  useEffect(() => {
    dispatch({ type: "SET_USERS", payload: data });
  }, []);

  // Getting the data from localStorage on Page Refresh
  /* useEffect(() => {
    // Get the data stored in localStorage on Page Refresh
    setUsersData({
      ...usersData,
      users: getUsers().users,
      fetchStatus: getUsers().fetchStatus,
    });

    // Get the ursersData from the array/remote for the first time only
    !getUsers().fetchStatus &&
      setUsersData({ ...usersData, users: data, fetchStatus: true });
  }, [setUsersData]);
 */
  // Storing the new data into the localStorage
  /* useEffect(() => {
    setUsers(usersData);
  }, [usersData]);
 */

  return (
    <>
      <TabularData />
      <Form />
      <Modal />
    </>
  );
};

export default App;
