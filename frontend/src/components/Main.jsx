import React, { useContext } from 'react';
import Card from './Card';
import { CurrentUserContext } from '../contexts/CurrentUserContext';

function Main({ onAddPlace, onCardClick, onEditAvatar, onEditProfile, cards, onCardLike, onCardDelete }) {
  const currentUser = useContext(CurrentUserContext);

  return (
    <main className="content container">

      <section className="profile">
        <button
          className="profile__image"
          type="button"
          aria-label="открыть окно редактирования аватара профиля"
          onClick={onEditAvatar}
          style={{ backgroundImage: `url(${currentUser.avatar})` }}
        >
        </button>
        <div className="profile__content">
          <div className="profile__content-element-flex">
            <h1 className="profile__title">
              {currentUser.name}
            </h1>
            <button
              className="profile__edit-popup"
              type="button"
              aria-label="открыть окно редактирования данных профиля"
              onClick={onEditProfile}
            >
            </button>
          </div>
          <p className="profile__subtitle">
            {currentUser.about}
          </p>
        </div>
        <button
          className="profile__button-plus"
          type="button"
          aria-label="кнопка добавления новой карточки"
          onClick={onAddPlace}
        >
        </button>
      </section>

      <section className="photo-grid">
        <ul className="photo-grid__list">
          {cards.map(item =>
            <Card
              card={item}
              onCardClick={onCardClick}
              key={item._id}
              onCardLike={onCardLike}
              onCardDelete={onCardDelete}
            />
          )}
        </ul>
      </section>

    </main>
  );
}

export default Main;