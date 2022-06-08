import React, { useState } from 'react';
import PopupWithForm from './PopupWithForm';

function AddPlacePopup({ isOpen, onClose, onAddPlace }) {
  const [name, setName] = useState('');
  const [link, setLink] = useState('');

  function handleChangeName(e) {
    setName(e.target.value);
  }

  function handleChangeLink(e) {
    setLink(e.target.value);
  }

  function handleSubmit(e) {
    e.preventDefault();

    onAddPlace({ name, link });
  }

  return (
    <PopupWithForm
      popupTitle="Новое место"
      buttonSubmitText="Создать"
      name="new-card"
      isOpen={isOpen}
      onClose={onClose}
      onSubmit={handleSubmit}
    >
      <input
        className="popup__input popup__input_name_card"
        onChange={handleChangeName}
        value={name}
        id="cardname"
        type="text"
        name="cardName"
        placeholder="Название"
        required
        minLength="2"
        maxLength="30"
        autoComplete="off"
      />
      <span className="error-message cardname-error"></span>
      <input
        className="popup__input popup__input_name_link"
        onChange={handleChangeLink}
        value={link}
        id="cardlink"
        type="url"
        name="cardLink"
        placeholder="Ссылка на картинку"
        required
      />
      <span className="error-message cardlink-error"></span>
    </PopupWithForm>
  );
}

export default AddPlacePopup;