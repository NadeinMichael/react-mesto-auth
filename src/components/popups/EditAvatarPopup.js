import PopupWithForm from './PopupWithForm';
import { useState, useRef, useEffect } from 'react';
import { useForm } from 'react-hook-form';

function EditAvatarPopup({ isOpen, onClose, onUpdateAvatar }) {
  const [isLoading, setIsLoading] = useState(false);

  const AvatarRef = useRef(null);
  const {
    register,
    formState: { errors, isValid },
    handleSubmit,
    reset,
  } = useForm({
    mode: 'onChange',
  });

  const { ref, ...rest } = register('link', {
    required: 'Обязательное поле',
    pattern: {
      value:
        /(?:https?):\/\/(\w+:?\w*)?(\S+)(:\d+)?(\/|\/([\w#!:.?+=&%!\-\/]))?/,
      message: 'Введите URL',
    },
  });

  function onSubmit() {
    setIsLoading(true);
    onUpdateAvatar({
      link: AvatarRef.current.value,
    });
  }

  useEffect(() => {
    setIsLoading(false);
    reset();
  }, [isOpen, reset]);
  return (
    <PopupWithForm
      title="Обновить аватар"
      name="edit-avatar"
      isOpen={isOpen}
      onClose={onClose}
      onSubmit={handleSubmit(onSubmit)}
      isValid={isValid}
      isLoading={isLoading}
    >
      <input
        {...rest}
        ref={(e) => {
          ref(e);
          AvatarRef.current = e;
        }}
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
