import React from 'react';
import { CurrentUserContext } from '../contexts/CurrentUserContext'

function Card(props) {

    const currentUser = React.useContext(CurrentUserContext);

    function handleClick() {
        props.onCardClick(props);
    }

    function handleLikeClick() {
        props.onCardLike(props);

    }

    function handleDeleteClick() {
        props.onCardDelete(props);
    }

    // Определяем, являемся ли мы владельцем текущей карточки
    const isOwn = props.ownerId === currentUser._id;

    // console.dir(props.ownerId);
    // console.dir(currentUser);

    // Создаём переменную, которую после зададим в `className` для кнопки удаления
    const cardDeleteButtonClassName = (
        `card__button-delete ${isOwn ? '' : 'card__button-delete_disabled'}`
    );

    // Определяем, есть ли у карточки лайк, поставленный текущим пользователем
    const isLiked = props.likes.some(likeAutor => likeAutor._id === currentUser._id);

    // Создаём переменную, которую после зададим в `className` для кнопки лайка
    const cardLikeButtonClassName = `card__button ${isLiked ? 'card__button_active' : ''}`;

    return (
        <li className="card">
            <button className="card__button-image" type="button" onClick={handleClick}>
                <img className="card__illustration" src={props.link} alt={props.name} />
            </button>
            <button className={cardDeleteButtonClassName} type="button" onClick={handleDeleteClick}></button>
            <div className="card__container">

                <p className="card__title">{props.name}</p>
                <div className="card__likescontainer">
                    <button type="button" className={cardLikeButtonClassName} onClick={handleLikeClick}></button>
                    <p className='card__likes'>{props.likesNumber}</p>
                </div>
            </div>
        </li>
    )

}

export default Card;
