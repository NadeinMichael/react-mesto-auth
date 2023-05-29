import { Link } from 'react-router-dom';
import logo from '../images/logo.svg';
import { useLocation } from 'react-router-dom';

function Header({ userData, signOut }) {
  const location = useLocation();

  return (
    <header className="header">
      <div className="header__wrapper">
        <img src={logo} alt="логотип" className="header__logo" />
        <div className="header__navbar">
          <p className="header__user-info">{userData}</p>
          {location.pathname === '/register' && (
            <Link className="header__link" to="/login">
              Войти
            </Link>
          )}
          {location.pathname === '/login' && (
            <Link className="header__link" to="/register">
              Регистрация
            </Link>
          )}
          {location.pathname === '/' && (
            <Link className="header__link" to="/login" onClick={signOut}>
              Выйти
            </Link>
          )}
        </div>
      </div>
    </header>
  );
}

export default Header;
