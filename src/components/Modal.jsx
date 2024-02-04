
const Modal = ({setIsOpen, children}) => {

    return (
        <>
        <div className="modal"  onClick={() => setIsOpen(false)} />
        <div className="modal-body">
            <button
                className="btn-modal"
                onClick={() => setIsOpen(false)}
            >X</button>
            <div>{children}</div>
        </div>
        </>
    )
}

export default Modal;