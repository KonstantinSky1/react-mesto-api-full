import React, { useState, useContext, useEffect } from 'react';
import { CurrentUserContext } from '../contexts/CurrentUserContext';
import PopupWithForm from './PopupWithForm';

function EditProfilePopup({ isOpen, onClose, onUpdateUser }) {
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');

  const currentUser = useContext(CurrentUserContext);

  useEffect(() => {
    setName(currentUser.name);
    setDescription(currentUser.about);
  }, [currentUser, isOpen]);

  function handleChangeName(e) {
    setName(e.target.value);
  }

  function handleChangeDescription(e) {
    setDescription(e.target.value);
  }

  function handleSubmit(e) {
    e.preventDefault();

    onUpdateUser({
      name: name,
      about: description,
    });
  }

  return (
    <PopupWithForm
      popupTitle="Редактировать профиль"
      buttonSubmitText="Сохранить"
      name="profile-edit"
      isOpen={isOpen}
      onClose={onClose}
      onSubmit={handleSubmit}
    >
      <input
        className="popup__input popup__input_info_name"
        value={name}
        onChange={handleChangeName}
        id="username"
        type="text"
        name="firstname"
        placeholder="Введите имя"
        required
        minLength="2"
        maxLength="40"
        autoComplete="off"
      />
      <span className="error-message username-error"></span>
      <input
        className="popup__input popup__input_info_profession"
        value={description}
        onChange={handleChangeDescription}
        id="profession"
        type="text"
        name="profession"
        placeholder="Напишите о себе"
        required
        minLength="2"
        maxLength="200"
        autoComplete="off"
      />
      <span className="error-message profession-error"></span>
    </PopupWithForm>
  );
}

export default EditProfilePopup;