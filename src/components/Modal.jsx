import { useContext } from "react";
import Form from "./Form";
import { context } from "../context";

const Modal = () => {
  const { setFormData, setError, modalActive, setModalActive } = useContext(
    context
  );
  return !modalActive ? (
    ""
  ) : (
    <>
      <div
        onClick={() => {
          setFormData({});
          setError({ msg: "", errStatus: false });
          setModalActive(false);
        }}
        className={modalActive ? "overlay overlay-active" : "overlay"}
      ></div>
      <div className={modalActive ? "modal modal-active" : "model"}>
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
