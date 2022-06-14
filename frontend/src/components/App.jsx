import React, { useState, useEffect } from 'react';
import { Route, Switch, useHistory } from 'react-router-dom';
import Header from './Header';
import Main from './Main';
import Footer from './Footer';
import ImagePopup from './ImagePopup';
import EditProfilePopup from './EditProfilePopup';
import EditAvatarPopup from './EditAvatarPopup';
import AddPlacePopup from './AddPlacePopup';
import api from '../utils/Api';
import { CurrentUserContext } from '../contexts/CurrentUserContext';
import Login from './Login.jsx';
import Register from './Register.jsx';
import ProtectedRoute from './ProtectedRoute';
import InfoTooltip from './InfoTooltip';
import * as auth from '../utils/Auth';

function App() {
  const [loggedIn, setLoggedIn] = useState(false);
  const [email, setEmail] = useState('');
  const [isEditProfilePopupOpen, setIsEditProfilePopupOpen] = useState(false);
  const [isAddPlacePopupOpen, setIsAddPlacePopupOpen] = useState(false);
  const [isEditAvatarPopupOpen, setIsEditAvatarPopupOpen] = useState(false);
  const [isInfoTooltipPopupOpen, setIsInfoTooltipPopupOpen] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [selectedCard, setSelectedCard] = useState(
    {
      name: "",
      link: ""
    }
  );
  const [currentUser, setCurrentUser] = useState(
    {
      about: "",
      avatar: "",
      name: "",
      _id: ""
    }
  );
  const [cards, setCards] = useState([]);

  const history = useHistory();

  useEffect(() => {
    checkToken();
  }, []);

  useEffect(() => {
    if (!loggedIn) {
      history.push('/sign-in');
      return;
    }
  }, [loggedIn]);

  useEffect(() => {
    if (loggedIn) {
      Promise.all([api.getProfile(), api.getInitialCards()])
        .then(([userData, cardsData]) => {
          setCurrentUser(userData);
          setCards(cardsData.reverse());
        })
        .catch(err => console.log(err));
      }
  }, [loggedIn]);

  function handleCardLike(card) {
    const isLiked = card.likes.some(i => i === currentUser._id);

    api.changeLikeCardStatus(card._id, isLiked)
      .then(newCard => setCards(state => state.map(c => c._id === card._id ? newCard : c)))
      .catch(err => console.log(err));
  }

  function handleCardDelete(card) {
    api.deleteCard(card._id)
      .then(() => setCards(state => state.filter(c => c._id !== card._id)))
      .catch(err => console.log(err));
  }

  function handleUpdateUser({ name, about }) {
    api.editProfile(name, about)
      .then((res) => {
        setCurrentUser(res);
        closeAllPopups();
        })
      .catch(err => console.log(err));
  }

  function handleUpdateAvatar({ avatar }) {
    api.editAvatar(avatar)
      .then(res => {
        setCurrentUser(res);
        closeAllPopups();
      })
      .catch(err => console.log(err));
  }

  function handleAddPlaceSubmit({ name, link }) {
    api.postNewCard(name, link)
      .then(newCard => {
        setCards([newCard, ...cards]);
        closeAllPopups();
      })
      .catch(err => console.log(err));
  }

  function handleEditProfileClick() {
    setIsEditProfilePopupOpen(true);
  }

  function handleAddPlaceClick() {
    setIsAddPlacePopupOpen(true);
  }

  function handleEditAvatarClick() {
    setIsEditAvatarPopupOpen(true);
  }

  function handleCardClick(card) {
    setSelectedCard(card);
  }

  function handleRegister(email, password) {
    return auth.register(email, password)
      .then(() => {
        setIsInfoTooltipPopupOpen(true);
        setIsSuccess(true);

        history.push('/sign-in');
      })
      .catch(err => {
        if (err.status === 400) {
          console.log('некорректно заполнено одно из полей');
        }

        setIsInfoTooltipPopupOpen(true);
        setIsSuccess(false);
      });
  }

  function handleLogin(email, password) {
    return auth.authorize(email, password)
      .then(res => {
        if (!res.token) {
          return;
        }

        localStorage.setItem('jwt', res.token);

        setLoggedIn(true);
        setEmail(email);

        history.push('/');
      })
      .catch(err => {
        if (err.status === 400) {
          console.log('не передано одно из полей');
        } else if (err.status === 401) {
          console.log('пользователь с email не найден');
        }
      });
  }

  function checkToken() {
    const jwt = localStorage.getItem('jwt');

    if (jwt) {
      auth.getToken(jwt)
        .then(res => {
          if (res) {
            setLoggedIn(true);
            setEmail(res.email);
            history.push('/');
          }
        })
        .catch(err => {
          if (err.status === 400) {
            console.log('Токен не передан или передан не в том формате');
          } else if (err.status === 401) {
            console.log('Переданный токен некорректен');
          }
        });
    }
  }

  function handleSignOut() {
    localStorage.removeItem('jwt');
    setLoggedIn(false);
    history.push('/sign-in');
  }

  function closeAllPopups() {
    setIsEditProfilePopupOpen(false);
    setIsAddPlacePopupOpen(false);
    setIsEditAvatarPopupOpen(false);
    setIsInfoTooltipPopupOpen(false);
    setSelectedCard(
      {
      name: "",
      link: ""
      }
    );
  }

  return (
    <CurrentUserContext.Provider value={currentUser}>
      <div className="root__page-wrapper">

        <Header
          handleSignOut={handleSignOut}
          email={email}
        />

        <Switch>
          <ProtectedRoute
            loggedIn={loggedIn}
            exact path="/"
          >
            <Main 
              onEditProfile={handleEditProfileClick}
              onAddPlace={handleAddPlaceClick}
              onEditAvatar={handleEditAvatarClick}
              onCardClick={handleCardClick}
              cards={cards}
              onCardLike={handleCardLike}
              onCardDelete={handleCardDelete}
            />
          </ProtectedRoute>

          <Route path="/sign-up">
            <Register handleRegister={handleRegister} />
          </Route>

          <Route path="/sign-in">
            <Login
              handleLogin={handleLogin}
            />
          </Route>
        </Switch>

        {loggedIn && <Footer />}

        <EditProfilePopup 
          isOpen={isEditProfilePopupOpen}
          onClose={closeAllPopups}
          onUpdateUser={handleUpdateUser}
        />

        <EditAvatarPopup
          isOpen={isEditAvatarPopupOpen}
          onClose={closeAllPopups}
          onUpdateAvatar={handleUpdateAvatar}
        />

        <AddPlacePopup
          isOpen={isAddPlacePopupOpen}
          onClose={closeAllPopups}
          onAddPlace={handleAddPlaceSubmit}
        />

        <ImagePopup
          card={selectedCard}
          onClose={closeAllPopups}
        />

        <InfoTooltip
          isOpen={isInfoTooltipPopupOpen}
          onClose={closeAllPopups}
          isSuccess={isSuccess}
        />

      </div>
    </CurrentUserContext.Provider>
  );
}

export default App;