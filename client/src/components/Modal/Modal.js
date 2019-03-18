import React from 'react'
import useToggle from '../../hooks/useToggle'
const Modal = props => {
    const [on,toggle] = useToggle(false)
    return (
        <div className="modal">
        <div className="modal-header">
        <h1 className="modal-title"></h1>
        <button className="modal-exit-button">X
        </button>
        <div className="modal-content">
        </div>
        <div className="modal-buttons-container">
        </div>
        </div>
        </div>
    )
}
export default Modal 