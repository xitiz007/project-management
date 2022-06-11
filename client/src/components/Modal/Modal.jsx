import { FaUser } from "react-icons/fa";

export default function Modal({ children, title, id }) {
  return (
    <>
      <button
        type="button"
        className="btn btn-secondary"
        data-bs-toggle="modal"
        data-bs-target={`#${id}Modal`}
      >
        <div className="d-flex align-items-center">
          <FaUser className="icon" />
          <div>{title}</div>
        </div>
      </button>

      <div
        className="modal fade"
        id={`${id}Modal`}
        aria-labelledby={`${id}ModalLabel`}
        aria-hidden="true"
      >
        <div className="modal-dialog">
          <div className="modal-content">
            <div className="modal-header">
              <h5 className="modal-title" id={`${id}ModalLabel`}>
                {title}
              </h5>
              <button
                type="button"
                className="btn-close"
                data-bs-dismiss="modal"
                aria-label="Close"
              ></button>
            </div>
            <div className="modal-body">
              {children}
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
