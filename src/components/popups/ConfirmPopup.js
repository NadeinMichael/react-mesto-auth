import PopupWithForm from './PopupWithForm';
import { useEffect } from 'react';

function ConfirmPopup({ isOpen, onDeleteCard }) {
  function handleSubmit(event) {
    event.preventDefault();
    onDeleteCard();
  }

  useEffect(() => {}, [isOpen]);
  return (
    <PopupWithForm
      title="Вы уверены?"
      name="delete-card"
      buttonText="Да"
      isOpen={isOpen}
      onSubmit={handleSubmit}
      isValid={true}
    ></PopupWithForm>
  );
}

export default ConfirmPopup;
