import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';

import * as mestoAuth from '../../utils/mestoAuth.js';

const Register = () => {
  const navigate = useNavigate();
  const [formValue, setFormValue] = useState({
    email: '',
    password: '',
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormValue({
      ...formValue,
      [name]: value,
    });
  };

  const handleSubmit = (e) => {
    const { email, password } = formValue;
    e.preventDefault();
    mestoAuth
      .register(password, email)
      .then(() => {
        navigate('/');
      })
      .catch((error) => console.log(error));
  };

  return (
    <>
      <div className="enter">
        <div className="enter__wrapper">
          <h2 className="enter__title">Регистрация</h2>
          <form className="form" onSubmit={handleSubmit}>
            <input
              className="form__text"
              name="email"
              type="email"
              placeholder="Email"
              onChange={handleChange}
              value={formValue.email}
            />
            <span className="form__text-error"></span>
            <input
              className="form__text"
              name="password"
              type="password"
              placeholder="Password"
              onChange={handleChange}
              value={formValue.password}
            />
            <span className="form__text-error"></span>
            <button className="form__submit">Зарегистрироваться</button>
          </form>
          <p className="enter__switch-text">
            Уже зарегистрированы?
            <Link to="/login" className="enter__switch-btn">
              {' '}
              Войти
            </Link>
          </p>
        </div>
      </div>
    </>
  );
};

export default Register;
