import React from 'react';

function PopupWithForm({ buttonSubmitText, children, isOpen, name, onClose, popupTitle, onSubmit }) {
  return (
    <div className={`popup popup_type_${name} ${isOpen ? "popup_opened" : ""}`}>
    <div className="popup__container">
      <button
        className="popup-close-button"
        type="button"
        aria-label="закрыть окно"
        onClick={onClose}
      >
      </button>
      <h4 className="popup__title">
        {popupTitle}
      </h4>
      <form
        className="popup__form"
        onSubmit={onSubmit}
        name={name}
        noValidate
      >

        {children}

        <button
          className="popup__button-save"
          type="submit"
        >
          {buttonSubmitText}
        </button>
      </form>
    </div>
  </div>
  );
}

export default PopupWithForm;