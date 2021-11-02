import { useContext } from "react";
import { context } from "../context";
import useInput from "../hooks/userInput";

const Form = () => {
  let {
    formData,
    setFormData,
    updateUserData,
    error,
    setError,
    setModalActive,
  } = useContext(context);

  const { bind: bindId, reset: resetId } = useInput(formData["id"]);
  const { bind: bindName, reset: resetName } = useInput(formData["name"]);
  const { bind: bindEmailId, reset: resetEmailId } = useInput(
    formData["emailId"]
  );
  const { bind: bindAadharNumber, reset: resetAadharNumber } = useInput(
    formData["aadharNumber"]
  );
  const { bind: bindPanNumber, reset: resetPanNumber } = useInput(
    formData["panNumber"]
  );
  const {
    value: employeeType,
    bind: bindEmployeeType,
    reset: resetEmployeeType,
  } = useInput(formData["employeeType"]);
  const { bind: bindJoiningDate, reset: resetJoiningDate } = useInput(
    formData["joiningDate"]
  );

  function resetLocalState() {
    resetId();
    resetName();
    resetEmailId();
    resetAadharNumber();
    resetPanNumber();
    resetEmployeeType();
    resetJoiningDate();
  }

  return formData &&
    Object.keys(formData).length === 0 &&
    formData.constructor === Object ? (
    ""
  ) : (
    <div className="container">
      <form
        onSubmit={updateUserData}
        className="form flex flex-col items-center"
      >
        {error.errStatus ? <p className="form-error">{error.msg}</p> : ""}
        <input name="id" type="text" {...bindId} disabled />
        <input
          name="name"
          type="text"
          {...bindName}
          placeholder="Enter your Name"
        />
        <input
          name="email"
          type="email"
          {...bindEmailId}
          placeholder="Enter your email"
        />
        <input
          name="aadharNo"
          type="text"
          {...bindAadharNumber}
          placeholder="Enter your Aadhar Number"
        />
        <input
          name="panNo"
          type="text"
          {...bindPanNumber}
          placeholder="Enter your Pan Number"
        />
        <div className="radio flex justify-between items-center">
          <div>
            <input
              type="radio"
              name="employeeType"
              checked={employeeType === "Full-Time"}
              {...bindEmployeeType}
            />
            <span>Full-time</span>
          </div>
          <div>
            <input
              type="radio"
              name="employeeType"
              checked={employeeType === "Part-Time"}
              {...bindEmployeeType}
            />
            <span>Part-time</span>
          </div>
        </div>
        <input
          name="joiningDate"
          type="text"
          placeholder="Enter your Joining Date"
          {...bindJoiningDate}
        />
        <div className="confirmation flex justify-betweem items-center">
          <button onClick={() => {}} type="submit" className="btn btn-primary">
            Save
          </button>
          <button
            onClick={() => {
              setFormData({});
              resetLocalState();
              setError({ msg: "", errStatus: false });
              setModalActive(false);
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
