import React, { useRef } from 'react';
import PopupWithForm from './PopupWithForm';

function EditAvatarPopup({ isOpen, onClose, onUpdateAvatar }) {
  const link = useRef('');

  function handleSubmit(e) {
    e.preventDefault();
  
    onUpdateAvatar({
      avatar: link.current.value
    });
  }

  return (
    <PopupWithForm
      popupTitle="Обновить аватар"
      buttonSubmitText="Сохранить"
      name="change-avatar"
      isOpen={isOpen}
      onClose={onClose}
      onSubmit={handleSubmit}
    >
      <input
        className="popup__input"
        ref={link}
        id="avatarLink"
        type="url"
        name="avatarLink"
        placeholder="Ссылка на картинку аватара"
        required
      />
      <span className="error-message avatarLink-error"></span>
    </PopupWithForm>
  );
}

export default EditAvatarPopup;