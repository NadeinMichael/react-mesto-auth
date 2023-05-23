function ImagePopup({ isOpen, selectedCard, onClose }) {
  return (
    <div
      className={`popup popup_fullscreen-photo ${isOpen && 'popup_opened'}`}
      onClick={onClose}
    >
      <div
        className="popup__container-fullscreen-photo popup__overlay"
        onClick={(e) => e.stopPropagation()}
      >
        <button
          className="popup__btn-close"
          type="button"
          aria-label="закрыть"
          onClick={onClose}
        ></button>
        {selectedCard && <img className="popup__img" src={selectedCard} />}
        <p className="popup__caption-img"></p>
      </div>
    </div>
  );
}

export default ImagePopup;
