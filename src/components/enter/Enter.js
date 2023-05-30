import { useForm } from 'react-hook-form';

const Enter = ({ title, buttonText, children }) => {
  // const {
  //   register,
  //   formState: { errors, isValid},
  //   handleSubmit,
  //   reset
  // } = useForm({ mode: 'onChange' });

  return (
    <div className="enter">
      <div className="enter__wrapper">
        <h2 className="enter__title">{title}</h2>
        <form className="form">
          <input
            className="form__text"
            name="email"
            type="email"
            placeholder="Email"
          />
          <span className="form__text-error"></span>
          <input
            className="form__text"
            name="password"
            type="password"
            placeholder="Password"
          />
          <span className="form__text-error"></span>
          <button className="form__submit" type="submit">
            {buttonText}
          </button>
        </form>
        {children}
      </div>
    </div>
  );
};

export default Enter;
