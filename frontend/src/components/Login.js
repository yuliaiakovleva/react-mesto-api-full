import React, { useState } from 'react';
import SectionForm from './SectionForm';

function Login(props) {

    const [values, setValues] = useState({
        email: "",
        password: ""
    })

    // метод, который будет срабатывать при каждом вводе в инпут
    function handleChange(e) {
        const { name, value } = e.target;
        setValues(prevState => ({
            ...prevState,
            [name]: value
        }));
    }

    function handleSubmit(e) {
        e.preventDefault();
        if (!values.email || !values.password) {
            return;
        }
        // сюда передаю данные 
        props.handleLogin({password: values.password, email: values.email});
        setValues({
            email: "",
            password: ""
        })
        // console.log(values.email)
    }

    return (
        <SectionForm
            title="Вход"
            button="Войти"
            text=""
            link=""
            values={values}
            handleChange={handleChange}
            handleSubmit={handleSubmit}
            
        />
    )

}
export default Login;