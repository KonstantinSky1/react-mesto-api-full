import React from 'react';

function ImagePopup({ card, onClose }) {
  return (
  <div className={`popup popup_type_image ${card.link ? "popup_opened" : ""}`}>
    <figure className="image-popup">
      <button 
        className="popup-close-button popup-close-button_image_popup"
        onClick={onClose}
      ></button>
      <img
        className="image-popup__picture"
        src={card.link}
        alt={card.name}
      />
      <figcaption className="image-popup__description">
        {card.name}
      </figcaption>
    </figure>
  </div>
  );
}

export default ImagePopup;