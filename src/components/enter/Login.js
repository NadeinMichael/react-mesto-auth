import useControlInputs from '../../hooks/useControlInputs.js';
import Header from '../Header.js';

const Login = ({ handleLogin }) => {
  const { values, handleChange } = useControlInputs({
    email: '',
    password: '',
  });

  const handleSubmit = (e) => {
    const { password, email } = values;
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
            <button className="form__submit">Войти</button>
          </form>
        </div>
      </div>
    </>
  );
};

export default Login;
