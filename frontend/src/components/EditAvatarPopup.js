
import React from 'react';
import PopupWithForm from './PopupWithForm';


function EditAvatarPopup(props) {

    const avatarRef = React.useRef()

    function handleSubmit(e) {
        e.preventDefault();

        props.onUpdateAvatar(
            avatarRef.current.value
        );

    }


    // console.log(avatarRef.current.value);

    return (
        <PopupWithForm
            name="popup__avatar"
            title="Обновить аватар"
            isOpen={props.isOpen}
            onClose={props.onClose}
            onSubmit={handleSubmit}
            // onOverlayClose={props.onOverlayClose}
            children={
                <fieldset className="popup__fieldset">
                    <label className="popup__row">
                        <input className="popup__input popup__avatar-link" type="url" name="link"
                            ref={avatarRef} placeholder="Ссылка на картинку" id="avatar-input" required />
                        <span className="avatar-input-error popup__input-error"></span>
                    </label>
                </fieldset>
            }
            button="Сохранить"
        >
        </PopupWithForm>
    )

}

export default EditAvatarPopup;