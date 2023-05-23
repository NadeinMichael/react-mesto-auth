import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import * as mestoAuth from '../../utils/mestoAuth.js';

const Login = () => {
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
      .authorize(password, email)
      .then((data) => {
        console.log(data);
      })
      .catch((error) => console.log(error));
  };

  return (
    <div className="enter">
      <div className="enter__wrapper">
        <h2 className="enter__title">Вход</h2>
        <form className="form" onSubmit={handleSubmit}>
          <input
            className="form__text"
            name="email"
            type="email"
            placeholder="Email"
            onChange={handleChange}
          />
          <span className="form__text-error"></span>
          <input
            className="form__text"
            name="password"
            type="password"
            placeholder="Password"
            onChange={handleChange}
          />
          <span className="form__text-error"></span>
          <button className="form__submit">Войти</button>
        </form>
      </div>
    </div>
  );
};

export default Login;
