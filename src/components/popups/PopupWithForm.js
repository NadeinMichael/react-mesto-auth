function PopupWithForm({
  title,
  name,
  buttonText,
  isOpen,
  onClose,
  onSubmit,
  isValid,
  isLoading,
  children,
}) {
  return (
    <div className={`popup ${isOpen && 'popup_opened'}`} onClick={onClose}>
      <div
        className="popup__container popup__overlay"
        onClick={(e) => e.stopPropagation()}
      >
        <button
          className="popup__btn-close"
          type="button"
          aria-label="закрыть"
          onClick={onClose}
        ></button>
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
