import React from 'react';

function Modal({ onClose, currentPhoto }) {
    const { photoText, photoPlace, photoLink } = currentPhoto;

    return (
        <div className="modalBackdrop">
            <div className="modalContainer">
                <h3 className="modalTitle">{photoPlace}</h3>
                <img src={photoLink} />
                <p className='text-light'>{photoText}</p>
                <button onClick={onClose} type="button" className='btn'>
                    Close this modal
                </button>
            </div>
        </div>
    );
}

export default Modal;
