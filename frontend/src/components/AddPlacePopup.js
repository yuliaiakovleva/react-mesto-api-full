import React from 'react';
import PopupWithForm from './PopupWithForm';

function AddPlacePopup(props) {

    const [name, setName] = React.useState('')
    const [link, setLink] = React.useState('')

    React.useEffect(() => {
        setName('');
        setLink('');
    }, [props.isOpen]);

    function handleChangeName(e) {
        setName(e.target.value)
    }

    function handleChangeLink (e) {
        setLink(e.target.value)
    }


    function handleSubmit (e) {
        e.preventDefault();
        props.onAddPlace({name, link});
        // setName('');
        // setLink('');
    }

    return (
        <PopupWithForm
            name="popup-card"
            title="Новое место"
            isOpen={props.isOpen}
            onClose={props.onClose}
            onSubmit={handleSubmit}
            // onOverlayClose={props.onOverlayClose}
            children={
                <fieldset className="popup__fieldset">
                    <label className="popup__row">
                        <input className="popup__input popup__input_type_name" type="text" name="name" placeholder="Название"
                            required minLength='2' maxLength='30' id="name-mesto-input" value={name} onChange={handleChangeName}/>
                        <span className="name-mesto-input-error popup__input-error"></span>
                    </label>
                    <label className="popup__row">
                        <input className="popup__input popup__input_type_info" type="url" name="link"
                            placeholder="Ссылка на картинку" required id="url-input" value={link} onChange={handleChangeLink}/>
                        <span className="url-input-error popup__input-error"></span>
                    </label>
                </fieldset>
            }
            button="Создать"
        >
        </PopupWithForm>
    )
}

export default AddPlacePopup;