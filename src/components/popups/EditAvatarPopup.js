import PopupWithForm from './PopupWithForm';
import { useEffect } from 'react';
import { useForm } from 'react-hook-form';

function EditAvatarPopup({ isOpen, onUpdateAvatar }) {
  const {
    register,
    formState: { errors, isValid },
    handleSubmit,
    reset,
  } = useForm({
    mode: 'onChange',
  });

  function onSubmit({ link }) {
    onUpdateAvatar({
      link,
    });
  }

  useEffect(() => {
    reset();
  }, [isOpen, reset]);
  return (
    <PopupWithForm
      title="Обновить аватар"
      name="edit-avatar"
      isOpen={isOpen}
      onSubmit={handleSubmit(onSubmit)}
      isValid={isValid}
    >
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
      <span className="popup__text-error link-error">
        {errors?.link && (errors?.link?.message || 'error')}
      </span>
    </PopupWithForm>
  );
}

export default EditAvatarPopup;
