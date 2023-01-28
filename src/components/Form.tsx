import { useUsers } from "../context";
import useInput from "../hooks/userInput";
import {
  NAME_PATTERN,
  EMAIL_PATTERN,
  JOININGDATE_PATTERN,
  PANNO_PATTERN,
} from "../constants";
import { user } from "../types";
import { useErrorHandler } from "react-error-boundary";

const Form = () => {
  const handleError = useErrorHandler();
  const {
    state: { users, formUser, error, modalState },
    dispatch,
  } = useUsers();

  const { value: id, bind: bindId, reset: resetId } = useInput(formUser["id"]);
  const { bind: bindName, reset: resetName } = useInput(formUser["fullName"]);
  const { bind: bindEmailId, reset: resetEmailId } = useInput(
    formUser["emailId"]
  );
  const { bind: bindAadharNumber, reset: resetAadharNumber } = useInput(
    formUser["aadharNumber"]
  );
  const { bind: bindPanNumber, reset: resetPanNumber } = useInput(
    formUser["panNumber"]
  );
  const {
    value: employeeType,
    bind: bindEmployeeType,
    reset: resetEmployeeType,
  } = useInput(formUser["employeeType"]);
  const { bind: bindJoiningDate, reset: resetJoiningDate } = useInput(
    formUser["joiningDate"]
  );

  const resetLocalState = () => {
    resetId();
    resetName();
    resetEmailId();
    resetAadharNumber();
    resetPanNumber();
    resetEmployeeType();
    resetJoiningDate();
  };

  // Update the users in the table after form validation
  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    try {
      e.preventDefault();
      const { fullName, email, aadharNo, panNo, employeeType, joiningDate } =
        e.currentTarget;

      const _users = [...users];

      const updateUser: user | undefined = _users.find(
        (item) => +item.id === +id
      );
      const updateUserIndex: number = _users.findIndex(
        (item) => +item.id === +id
      );

      /* Update the user if any*/
      if (!!updateUser) {
        // Form Validation
        /* Check for Empty Fields */
        if (
          !fullName.value.trim() ||
          !email.value.trim() ||
          !aadharNo.value.trim() ||
          !panNo.value.trim() ||
          !employeeType.value.trim() ||
          !joiningDate.value.trim()
        ) {
          dispatch({
            type: "SET_ERROR",
            payload: { message: "All Fields Required", errStatus: true },
          });
          return;
        } else {
          dispatch({
            type: "SET_ERROR",
            payload: { message: "", errStatus: false },
          });
        }

        /* Name Validation */
        if (!NAME_PATTERN.test(fullName.value.trim())) {
          dispatch({
            type: "SET_ERROR",
            payload: {
              message: "Name must be at least 3 and at most 10 characters long",
              errStatus: true,
            },
          });
          return;
        } else {
          updateUser.fullName = fullName.value;
          dispatch({
            type: "SET_ERROR",
            payload: { message: "", errStatus: false },
          });
        }

        /* Email Validation */
        if (!EMAIL_PATTERN.test(email.value.trim())) {
          dispatch({
            type: "SET_ERROR",
            payload: {
              message: "Invalid E-mail",
              errStatus: true,
            },
          });
          return;
        } else {
          updateUser.emailId = email.value;
          dispatch({
            type: "SET_ERROR",
            payload: { message: "", errStatus: false },
          });
        }

        /* Aadhar Validation */
        if (aadharNo.value.length !== 10) {
          dispatch({
            type: "SET_ERROR",
            payload: {
              message: "Invalid Aadhar Nunber",
              errStatus: true,
            },
          });
          return;
        } else {
          updateUser.aadharNumber = aadharNo.value;
          dispatch({
            type: "SET_ERROR",
            payload: { message: "", errStatus: false },
          });
        }

        /* PAN Card Validation */
        if (!PANNO_PATTERN.test(panNo.value.trim())) {
          dispatch({
            type: "SET_ERROR",
            payload: {
              message: "Invalid PAN Number",
              errStatus: true,
            },
          });
          return;
        } else {
          updateUser.panNumber = panNo.value;
          dispatch({
            type: "SET_ERROR",
            payload: { message: "", errStatus: false },
          });
        }

        /* Joining Date Validation */
        if (!JOININGDATE_PATTERN.test(joiningDate.value)) {
          dispatch({
            type: "SET_ERROR",
            payload: {
              message: "Invalid Date Format",
              errStatus: true,
            },
          });
          return;
        } else {
          updateUser.joiningDate = joiningDate.value;
          dispatch({
            type: "SET_ERROR",
            payload: { message: "", errStatus: false },
          });
        }

        // Replace the old value by new if updated
        _users.splice(updateUserIndex, 1, updateUser);
        dispatch({
          type: "SET_USERS",
          payload: _users,
        });
        dispatch({
          type: "GET_USER",
          payload: Object.create({}),
        });
        dispatch({
          type: "SET_MODAL",
          payload: false,
        });
        resetLocalState();
      }
    } catch (err) {
      handleError(err);
    }
  };

  return formUser &&
    Object.keys(formUser).length === 0 &&
    formUser.constructor === Object &&
    !modalState ? (
    <></>
  ) : (
    <div className="form-wrapper">
      <form onSubmit={handleSubmit} className="form flex flex-col items-center">
        {error.errStatus ? <p className="form-error">{error.message}</p> : ""}
        <div className="form-control">
          <label htmlFor="id">ID</label>
          <input name="id" id="id" type="text" {...bindId} disabled />
        </div>

        <div className="form-control">
          <label htmlFor="FullName">FullName</label>
          <input
            name="fullName"
            type="text"
            id="FullName"
            {...bindName}
            placeholder="Enter your FullName"
          />
        </div>

        <div className="form-control">
          <label htmlFor="Email">Email</label>
          <input
            name="email"
            type="email"
            id="Email"
            {...bindEmailId}
            placeholder="Enter your E-mail"
          />
        </div>

        <div className="form-control">
          <label htmlFor="AadharNo">AadharNo</label>
          <input
            name="aadharNo"
            type="text"
            id="AadharNo"
            {...bindAadharNumber}
            placeholder="Enter your Aadhar Number"
          />
        </div>

        <div className="form-control">
          <label htmlFor="PanNo">PanNo</label>
          <input
            name="panNo"
            type="text"
            id="PanNo"
            {...bindPanNumber}
            placeholder="Enter your Pan Number"
          />
        </div>

        <div className="radio flex justify-between items-center">
          <div className="form-control">
            <input
              id="EmployeeType"
              type="radio"
              name="employeeType"
              checked={employeeType === "Full-Time"}
              {...bindEmployeeType}
            />
            <span>Full-time</span>
          </div>
          <div className="form-control">
            <input
              id="EmployeeType"
              type="radio"
              name="employeeType"
              checked={employeeType === "Part-Time"}
              {...bindEmployeeType}
            />
            <span>Part-time</span>
          </div>
        </div>

        <div className="form-control">
          <label htmlFor="JoiningDate">JoiningDate</label>
          <input
            name="joiningDate"
            type="text"
            id="JoiningDate"
            placeholder="Enter your Joining Date"
            {...bindJoiningDate}
          />
        </div>

        <div className="confirmation flex justify-betweem items-center">
          <button onClick={() => {}} type="submit" className="btn btn-primary">
            Save
          </button>
          <button
            onClick={() => {
              resetLocalState();
              dispatch({
                type: "SET_ERROR",
                payload: { message: "", errStatus: false },
              });
              dispatch({
                type: "GET_USER",
                payload: Object.create({}),
              });
              dispatch({
                type: "SET_MODAL",
                payload: false,
              });
            }}
            className="btn btn-secondary"
          >
            Cancel
          </button>
        </div>
      </form>
    </div>
  );
};

export default Form;
