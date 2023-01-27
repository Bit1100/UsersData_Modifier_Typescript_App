import Form from "./Form";
import { useUsers } from "../context";

const Modal = () => {
  const {
    state: { formUser, error, modalState },
    dispatch,
  } = useUsers();

  return !modalState ? (
    <></>
  ) : (
    <>
      <div
        onClick={() => {
          dispatch({
            type: "GET_USER",
            payload: Object.create({}),
          });
          dispatch({
            type: "SET_ERROR",
            payload: { message: "", errStatus: false },
          });
          dispatch({
            type: "SET_MODAL",
            payload: false,
          });
        }}
        className={modalState ? "overlay overlay-active" : "overlay"}
      ></div>
      <div className={modalState ? "modal modal-active" : "model"}>
        <header className="modal-header">
          <h2 className="heading">Update Details</h2>
        </header>
        <div className="flex justify-center items-center modal-body">
          <Form />
        </div>
      </div>
    </>
  );
};

export default Modal;
