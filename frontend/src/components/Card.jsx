import React, { useContext } from 'react';
import { CurrentUserContext } from '../contexts/CurrentUserContext';

function Card({ card, onCardClick, onCardLike, onCardDelete }) {
  const currentUser = useContext(CurrentUserContext);

  const isOwner = card.owner._id === currentUser._id;

  const isLiked = card.likes.some(i => i._id === currentUser._id);

  function handleClick() {
    onCardClick(card);
  }

  function handleLikeClick() {
    onCardLike(card);
  }

  function handleDeleteClick() {
    onCardDelete(card);
  }

  return (
    <li className="photo-card">
      {isOwner && <button
        className="photo-card__button-trash"
        type="button"
        onClick={handleDeleteClick}
      ></button>}
      <img
        className="photo-card__image"
        src={card.link}
        onClick={handleClick}
        alt={card.name}
      />
      <div className="photo-card__description">
        <h2 className="photo-card__title">
          {card.name}
        </h2>
        <div className="photo-card__like-counter-block">
          <button
            className={`photo-card__button ${isLiked && "photo-card__button_like_black"}`}
            type="button"
            aria-label="поставь лайк"
            onClick={handleLikeClick}
          ></button>
          <span className="photo-card__counter">
            {card.likes.length}
          </span>
        </div>
      </div>
    </li>
  );
}

export default Card;