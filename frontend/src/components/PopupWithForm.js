import React from 'react';

function PopupWithForm(props) {

//     const handleOverlayClose = (event) => {
//         if (event.target === event.currentTarget && props.isOpen) {
//             props.onClose()
//         }
//     }

    return (
        <section className={`popup ${props.isOpen ? 'popup_is-opened' : ''}`} id={props.name} 
        // onMouseDown={props.onOverlayClose}
        >
            <form className={`popup__container ${props.name}-container`} onSubmit={props.onSubmit}>
                <button className="popup__close-btn" type="reset" onClick={props.onClose}></button>
                <h2 className="popup__title popup__question-title">{props.title}</h2>
                {props.children}
                <button className="popup__button popup__question-button" type="submit">{props.button}</button>
            </form>
        </section>
    );
}
export default PopupWithForm;

