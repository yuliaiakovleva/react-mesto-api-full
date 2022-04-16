import React from 'react';
import { Link } from 'react-router-dom'

function SectionForm(props) {
    return (
        <section className="section">
        <p className="section__title">{props.title}</p>
        <form className="section__form" onSubmit={props.handleSubmit}>
            <fieldset className="section__fieldset">
                <input className="section__input" id="email" type="email" name="email" value={props.values.email} onChange={props.handleChange} required placeholder="Email"></input>
                <input className="section__input" id="password" type="password" name="password" value={props.values.password} onChange={props.handleChange} required placeholder="Пароль"></input>
            </fieldset>
            <button className="section__button" type="submit" onClick={props.onInfoToolTip}>{props.button}</button>
        </form>
        <div className="section__container">
            <p className="section__text">{props.text}</p>
            <Link className="section__link" to="/sign-in">{props.link}</Link>
        </div>
    </section>

    )
}

export default SectionForm;