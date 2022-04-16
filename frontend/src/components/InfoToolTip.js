import done from '../images/Union done.png'
import no from '../images/Union no.png'

function InfoToolTip(props) {
    return (
        <section className={`popup ${props.isOpen ? 'popup_is-opened' : ''}`}>
            <form className="popup__container">
                <button className="popup__close-btn" type="reset" onClick={props.onClose}></button>
                {props.ifLogin
                    ? (<img className="popup__image" src={done} alt="Успех" />)
                    : (<img className="popup__image" src={no} alt="Ошибка" />)
                }
                {props.ifLogin
                    ? ( <h2 className="popup__title popup__question-title">Вы успешно зарегистрировались</h2>)
                    : ( <h2 className="popup__title popup__question-title">Что-то пошло не так! Попробуйте еще раз.</h2>)
                }
            </form>
        </section>
    )
}

export default InfoToolTip;

