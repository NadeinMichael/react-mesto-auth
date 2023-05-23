import PopupWithForm from './PopupWithForm';
import { useState, useEffect } from 'react';

function ConfirmPopup({ isOpen, onClose, onDeleteCard }) {
  const [isLoading, setIsLoading] = useState(false);

  function handleSubmit(event) {
    event.preventDefault();
    setIsLoading(true);
    onDeleteCard();
  }

  useEffect(() => {
    setIsLoading(false);
  }, [isOpen]);
  return (
    <PopupWithForm
      title="Вы уверены?"
      name="delete-card"
      buttonText="Да"
      isOpen={isOpen}
      onClose={onClose}
      onSubmit={handleSubmit}
      isValid={true}
      isLoading={isLoading}
    ></PopupWithForm>
  );
}

export default ConfirmPopup;
