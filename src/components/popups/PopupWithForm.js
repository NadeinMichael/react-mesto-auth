import { useContext } from 'react';

import AppContext from '../../contexts/AppContext';
import usePopupClose from '../../hooks/usePopupClose';

function PopupWithForm({
  title,
  name,
  buttonText,
  isOpen,
  onSubmit,
  isValid,
  children,
}) {
  const { isLoading, closeAllPopups } = useContext(AppContext);
  usePopupClose(isOpen, closeAllPopups);

  return (
    <div className={`popup ${isOpen && 'popup_opened'}`}>
      <div className="popup__container popup__overlay">
        <button
          className="popup__btn-close"
          type="button"
          aria-label="закрыть"
          onClick={closeAllPopups}
        />
        <h2 className="popup__title">{title}</h2>
        <form
          className="popup__form"
          name={name}
          onSubmit={onSubmit}
          noValidate
        >
          {children}
          <button className="popup__submit" type="submit" disabled={!isValid}>
            {isLoading ? 'Сохранение...' : buttonText || 'Сохранить'}
          </button>
        </form>
      </div>
    </div>
  );
}

export default PopupWithForm;
