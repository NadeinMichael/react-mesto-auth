import { useContext } from 'react';

import AppContext from '../../contexts/AppContext';
import usePopupClose from '../../hooks/usePopupClose';

function ImagePopup({ isOpen, selectedCard, onClose }) {
  const { closeAllPopups } = useContext(AppContext);
  usePopupClose(isOpen, closeAllPopups);
  return (
    <div className={`popup popup_fullscreen-photo ${isOpen && 'popup_opened'}`}>
      <div className="popup__container-fullscreen-photo popup__overlay">
        <button
          className="popup__btn-close"
          type="button"
          aria-label="закрыть"
          onClick={closeAllPopups}
        />
        {selectedCard && (
          <img
            className="popup__img"
            src={selectedCard.link}
            alt={selectedCard.name}
          />
        )}
        <p className="popup__caption-img">
          {selectedCard ? selectedCard.name : ''}
        </p>
      </div>
    </div>
  );
}

export default ImagePopup;
