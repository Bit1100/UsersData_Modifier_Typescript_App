import { useUsers } from "../context";
import { createPortal } from "react-dom";
import { Children } from "../types";

const Modal = ({ children }: Children) => {
  const {
    state: { modalState },
    dispatch,
  } = useUsers();

  return !modalState
    ? createPortal(<></>, document.getElementById("modal-root")!)
    : createPortal(
        <>
          {/* OverLay */}
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
          {/* Modal */}
          <div className={modalState ? "modal modal-active" : "model"}>
            <header className="modal-header">
              <h2 className="heading">Update Details</h2>
            </header>
            <div className="modal-body">{children}</div>
          </div>
        </>,
        document.getElementById("modal-root")!
      );
};

export default Modal;
