import React, { useState } from 'react';
import SectionForm from './SectionForm'; 

function Register(props) {

  const [values, setValues] = useState({
    password: "",
    email: "",
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
    props.handleRegister({password: values.password, email: values.email})
    // console.log(auth.register);
    // console.log(values.email);
    // console.log(values.password);
  }


  return (
    <SectionForm
      title="Регистрация"
      button="Зарегистрироваться"
      text="Уже зарегистрировались?"
      link="Войти"
      values={values}
      handleChange={handleChange}
      handleSubmit={handleSubmit}
      onInfoToolTip={props.onInfoToolTip}
    />
  )
}

export default Register;