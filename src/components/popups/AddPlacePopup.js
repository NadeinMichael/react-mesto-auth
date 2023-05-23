import PopupWithForm from './PopupWithForm';
import { useState, useEffect } from 'react';
import { useForm } from 'react-hook-form';

function AddPlacePopup({ isOpen, onClose, onAddPlace }) {
  const [isLoading, setIsLoading] = useState(false);

  const {
    register,
    formState: { errors, isValid },
    handleSubmit,
    reset,
  } = useForm({ mode: 'onChange' });

  function onSubmit({ name, link }) {
    setIsLoading(true);

    onAddPlace({
      name,
      link,
    });
  }

  useEffect(() => {
    setIsLoading(false);

    reset();
  }, [isOpen, reset]);

  return (
    <PopupWithForm
      title="Новое место"
      name="add-place"
      buttonText="Создать"
      isOpen={isOpen}
      onClose={onClose}
      onSubmit={handleSubmit(onSubmit)}
      isValid={isValid}
      isLoading={isLoading}
    >
      <input
        {...register('name', {
          required: 'Обязательное поле',
          minLength: {
            value: 2,
            message: 'Поле должно содержать минимум 2 символа',
          },
          maxLength: {
            value: 30,
            message: 'Поле превышает максимальное кол-во символов',
          },
        })}
        className="popup__text"
        placeholder="Название"
      />
      <span className="popup__text-error popup-place-error">
        {errors?.name && (errors?.name?.message || 'error')}
      </span>
      <input
        {...register('link', {
          required: 'Обязательное поле',
          pattern: {
            value:
              /(?:https?):\/\/(\w+:?\w*)?(\S+)(:\d+)?(\/|\/([\w#!:.?+=&%!\-\/]))?/,
            message: 'Введите URL',
          },
        })}
        className="popup__text"
        placeholder="Ссылка на картинку"
      />
      <span className="popup__text-error popup-link-error">
        {errors?.link && (errors?.link?.message || 'error')}
      </span>
    </PopupWithForm>
  );
}

export default AddPlacePopup;
