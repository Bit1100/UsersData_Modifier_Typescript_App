import { useEffect } from "react";
import TabularData from "./components/TabularData";
import Form from "./components/Form";
import Modal from "./components/Modal";
import "./assets/styles/main.scss";
import { useState } from "react";
import { contextProvider as Provider } from "./context";
import { data } from "./data";
import { getUsers, setUsers } from "./utils/storage";

const App = () => {
  const [usersData, setUsersData] = useState({
    users: [],
    fetchStatus: false,
  });
  const [formData, setFormData] = useState({});
  const [error, setError] = useState({ msg: "", errStatus: false });
  const [modalActive, setModalActive] = useState(false);

  // Getting the data from localStorage on Page Refresh
  useEffect(() => {
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

  // Storing the new data into the localStorage
  useEffect(() => {
    setUsers(usersData);
  }, [usersData]);

  // Aet Error if it exists while form validation
  function showError(error) {
    const { msg, errStatus } = error;
    setError({ msg, errStatus });
  }

  // Update the user data in the table after form validation
  function updateUserData(e) {
    // Regex Patterns
    const namePattern = /[a-zA-Z0-9]{3,10}/;
    const emailPattern = /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,6})+$/;
    const joiningDatePattern = /(0[1-9]|[12]\d|30|31)-(0[1-9]|1[0-2])-(201\d)/;
    const panNoPattern = /[a-zA-Z0-9]{10}/;

    let _usersData = usersData.users;
    e.preventDefault();
    const {
      id,
      name,
      email,
      aadharNo,
      panNo,
      employeeType,
      joiningDate,
    } = e.target;

    /* Update the data if any*/
    const updateUser = _usersData.find((item) => item.id === +id.value);
    const updateUserIndex = _usersData.findIndex(
      (item) => item.id === +id.value
    );

    // Form Validation
    /* Check for Empty Fields */
    if (
      !name.value.trim() ||
      !email.value.trim() ||
      !aadharNo.value.trim() ||
      !panNo.value.trim() ||
      !employeeType.value.trim() ||
      !joiningDate.value.trim()
    ) {
      showError({ msg: "All Fields Required", errStatus: true });
      return;
    } else {
      showError({ msg: "", errStatus: false });
    }

    /* Name Validation */
    if (!namePattern.test(name.value.trim())) {
      showError({
        msg: "Name must be at least 3 and at most 10 characters long",
        errStatus: true,
      });
      return;
    } else {
      updateUser.name = name.value;
      showError({ msg: "", errStatus: false });
    }

    /* Email Validation */
    if (!emailPattern.test(email.value.trim())) {
      showError({ msg: "Invalid E-mail", errStatus: true });
      return;
    } else {
      updateUser.emailId = email.value;
      showError({ msg: "", errStatus: false });
    }

    /* Aadhar Validation */
    if (aadharNo.value.length !== 10) {
      showError({ msg: "Invalid Aadhar Nunber", errStatus: true });
      return;
    } else {
      updateUser.aadharNumber = aadharNo.value;
      showError({ msg: "", errStatus: false });
    }

    /* PAN Card Validation */
    if (!panNoPattern.test(panNo.value.trim())) {
      showError({ msg: "Invalid PAN Number", errStatus: true });
      return;
    } else {
      updateUser.panNumber = panNo.value;
      showError({ msg: "", errStatus: false });
    }

    /* Joining Date Validation */
    if (!joiningDatePattern.test(joiningDate.value)) {
      showError({ msg: "Invalid Date Format", errStatus: true });
      return;
    } else {
      updateUser.joiningDate = joiningDate.value;
      showError({ msg: "", errStatus: false });
    }

    // Replace the old value by new if updated
    _usersData.splice(updateUserIndex, 1, updateUser);
    setUsersData({ ...usersData, users: _usersData });
  }

  return (
    <Provider
      value={{
        formData,
        setFormData,
        updateUserData,
        error,
        setError,
        usersData,
        modalActive,
        setModalActive,
      }}
    >
      <TabularData />
      <Form />
      <Modal />
    </Provider>
  );
};

export default App;
