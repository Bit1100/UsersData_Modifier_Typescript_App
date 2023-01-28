import { useUsers } from "../context";

const TabularData = () => {
  const {
    state: { users },
    dispatch,
  } = useUsers();
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
          </tr>
        </thead>
        <tbody>
          {users?.map((user) => {
            const {
              id,
              fullName,
              emailId,
              aadharNumber,
              panNumber,
              employeeType,
              joiningDate,
            } = user;
            return (
              <tr key={id}>
                <td>{id}</td>
                <td>{fullName}</td>
                <td>{emailId}</td>
                <td>{aadharNumber}</td>
                <td>{panNumber}</td>
                <td>{employeeType}</td>
                <td>{joiningDate}</td>
                <td>
                  <button
                    onClick={() => {
                      dispatch({
                        type: "SET_ERROR",
                        payload: { message: "", errStatus: false },
                      });
                      dispatch({
                        type: "SET_MODAL",
                        payload: true,
                      });
                      dispatch({
                        type: "GET_USER",
                        payload: user,
                      });
                    }}
                    className="btn btn-primary"
                  >
                    Edit
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
