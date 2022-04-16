
import React from 'react';
import PopupWithForm from './PopupWithForm';
import { CurrentUserContext } from '../contexts/CurrentUserContext'

function EditProfilePopup(props) {

    const currentUser = React.useContext(CurrentUserContext);

    const [name, setName] = React.useState('');
    const [description, setDescription] = React.useState('')

    function handleChangeName(e) {
        setName(e.target.value)
    }

    function handleChangeDescription(e) {
        setDescription(e.target.value)
    }

    // console.log(currentUser);

    // После загрузки текущего пользователя из API
    // его данные будут использованы в управляемых компонентах.
    React.useEffect(() => {
        setName(currentUser.name);
        setDescription(currentUser.about);
    }, [currentUser, props.isOpen]);

    function handleSubmit(e) {
        // Запрещаем браузеру переходить по адресу формы
        e.preventDefault();

        // Передаём значения управляемых компонентов во внешний обработчик
        props.onUpdateUser({
            name,
            about: description,
        });
    }


    return (
        <PopupWithForm
            name="popup-profile"
            title="Редактировать профиль"
            isOpen={props.isOpen}
            onClose={props.onClose}
            onSubmit={handleSubmit}
            // onOverlayClose={props.onOverlayClose}
            children={
                <fieldset className="popup__fieldset">
                    <label className="popup__row">
                        <input className="popup__input popup__input_type_name" type="text" name="name" placeholder="Имя"
                            minLength='2' maxLength='40' required id="name-input" value={name} onChange={handleChangeName} />
                        <span className="name-input-error popup__input-error" id="name-error-input"></span>
                    </label>
                    <label className="popup__row">
                        <input className="popup__input popup__input_type_info" type="text" name="about" placeholder="О себе"
                            minLength='2' maxLength='200' required id="info-input" value={description} onChange={handleChangeDescription} />
                        <span className="info-input-error popup__input-error"></span>
                    </label>
                </fieldset>}
            button="Сохранить"
        >
        </PopupWithForm>
    )
}


export default EditProfilePopup;