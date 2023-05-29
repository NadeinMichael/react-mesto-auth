import { useState } from 'react';
import Header from '../Header.js';

const Login = ({ handleLogin }) => {
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
    const { password, email } = formValue;
    e.preventDefault();
    handleLogin(password, email);
  };

  return (
    <>
      <Header />
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
    </>
  );
};

export default Login;
