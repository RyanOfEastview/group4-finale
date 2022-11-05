import React from 'react';

function Modal({ onClose, currentPhoto }) {
    console.log(currentPhoto);
    const { photoText } = currentPhoto;
    // const { photoText, place , picLink } = currentPhoto;

    return (
        <div className="modalBackdrop">
            <div className="modalContainer">
                {/* <h3 className="modalTitle">{place}</h3>*/}
                <h3 className="modalTitle">Vancouver</h3>
                <img src="https://upload.wikimedia.org/wikipedia/commons/5/57/Concord_Pacific_Master_Plan_Area.jpg"
                    alt="current photo" />
                {/*<img src={require(`../../assets/large/${category}/${index}.jpg`)} alt="current photo" />*/}
                <p className='text-light'>{photoText}</p>
                <button onClick={onClose} type="button" className='btn'>
                    Close this modal
                </button>
            </div>
        </div>
    );
}

export default Modal;
