import { useContext } from "react";
import { context } from "../context";

const TabularData = () => {
  const { setFormData, usersData, setError, setModalActive } = useContext(
    context
  );
  const { users } = usersData;
  return (
    <div className="table-wrapper">
      <table>
        <caption>Indian Citizens Data</caption>
        <thead>
          <tr>
            <th>ID</th>
            <th>Name</th>
            <th>Email</th>
            <th>Aadhar Number</th>
            <th>Pan Number</th>
            <th>Employee Type</th>
            <th>Joining Date</th>
            <th>EDIT</th>
            <th>Edit MODEL</th>
          </tr>
        </thead>
        <tbody>
          {users &&
            users.length > 0 &&
            users.map((user) => {
              const {
                id,
                name,
                emailId,
                aadharNumber,
                panNumber,
                employeeType,
                joiningDate,
              } = user;
              return (
                <tr key={id}>
                  <td>{id}</td>
                  <td>{name}</td>
                  <td>{emailId}</td>
                  <td>{aadharNumber}</td>
                  <td>{panNumber}</td>
                  <td>{employeeType}</td>
                  <td>{joiningDate}</td>
                  <td>
                    <button
                      onClick={() => {
                        setError({ msg: "", errStatus: false });
                        setFormData(user);
                      }}
                      className="btn btn-primary"
                    >
                      Edit
                    </button>
                  </td>
                  <td>
                    <button
                      onClick={() => {
                        setError({ msg: "", errStatus: false });
                        setFormData(user);
                        setModalActive(true);
                      }}
                      className="btn btn-primary"
                    >
                      MEdit
                    </button>
                  </td>
                </tr>
              );
            })}
        </tbody>
      </table>
    </div>
  );
};

export default TabularData;
