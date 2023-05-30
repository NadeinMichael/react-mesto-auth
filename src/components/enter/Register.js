import { Link } from 'react-router-dom';

import Header from '../Header.js';
import useControlInputs from '../../hooks/useControlInputs.js';

const Register = ({ handleRegister }) => {
  const { values, handleChange } = useControlInputs({
    email: '',
    password: '',
  });

  const handleSubmit = (e) => {
    const { password, email } = values;
    e.preventDefault();
    handleRegister(password, email);
  };

  return (
    <>
      <Header />
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
              value={values.email}
            />
            <span className="form__text-error"></span>
            <input
              className="form__text"
              name="password"
              type="password"
              placeholder="Password"
              onChange={handleChange}
              value={values.password}
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
