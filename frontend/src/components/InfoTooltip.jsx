import React from 'react';
import successRegistrationImg from '../images/successRegistration.svg';
import notSuccessImg from '../images/notSuccess.svg';

function InfoTooltip({ isOpen, onClose, isSuccess }) {
  return (
    <div className={`popup popup_type_infoTooltip ${isOpen && "popup_opened"}`}>
      <div className="popup__container">
      <button
        className="popup-close-button"
        type="button"
        aria-label="закрыть окно"
        onClick={onClose}
      >
      </button>
      {isSuccess ?
        <>
          <img
            className="popup__reg-image"
            src={successRegistrationImg}
            alt="Вы успешно зарегистрировались"
          
          />
          <p className="popup__reg-text">Вы успешно зарегистрировались!</p>
        </> :
        <>
          <img
            className="popup__reg-image"
            src={notSuccessImg}
            alt="Что-то пошло не так"
          />
          <p className="popup__reg-text">Что-то пошло не так! Попробуйте ещё раз.</p>
        </>
      }
      </div>
    </div>
  );
}

export default InfoTooltip;