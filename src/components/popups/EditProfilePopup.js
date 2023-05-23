import PopupWithForm from './PopupWithForm';
import { useState, useEffect, useContext } from 'react';
import CurrentUserContext from '../../contexts/CurrentUserContext';
import { useForm } from 'react-hook-form';

function EditProfilePopup({ isOpen, onClose, onUpdateUser }) {
  const currentUser = useContext(CurrentUserContext);
  const [isLoading, setIsLoading] = useState(false);

  function onSubmit({ name, description }) {
    setIsLoading(true);
    onUpdateUser({
      name,
      about: description,
    });
  }
  const {
    register,
    formState: { errors, isValid },
    handleSubmit,
    reset,
  } = useForm({
    mode: 'onChange',
    defaultValues: {
      name: currentUser.name,
      description: currentUser.about,
    },
  });

  useEffect(() => {
    setIsLoading(false);
    reset({
      name: currentUser.name,
      description: currentUser.about,
    });
  }, [currentUser, isOpen, reset]);

  return (
    <PopupWithForm
      title="Редактировать профиль"
      name="edit-profile"
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
            value: 40,
            message: 'Поле превышает максимальное кол-во символов',
          },
        })}
        className="popup__text"
      />
      <span className="popup__text-error popup-name-error">
        {errors?.name && (errors?.name?.message || 'error')}
      </span>

      <input
        {...register('description', {
          required: 'Обязательное поле',
          minLength: {
            value: 2,
            message: 'Поле должно содержать минимум 2 символа',
          },
          maxLength: {
            value: 200,
            message: 'Поле превышает максимальное кол-во символов',
          },
        })}
        className="popup__text"
      />
      <span className="popup__text-error popup-profession-error">
        {errors?.description && (errors?.description?.message || 'error')}
      </span>
    </PopupWithForm>
  );
}

export default EditProfilePopup;
