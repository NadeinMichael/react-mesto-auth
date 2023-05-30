import { useState, useEffect } from 'react';
import { Routes, Route, useNavigate, useLocation } from 'react-router-dom';

import errorLoginImg from '../images/error-login.svg';
import successfulLoginImg from '../images/successful-login.svg';

import CurrentUserContext from '../contexts/CurrentUserContext';
import AppContext from '../contexts/AppContext';

import Main from './Main';
import Footer from './Footer';
import ImagePopup from './popups/ImagePopup';
import api from '../utils/Api';
import EditProfilePopup from './popups/EditProfilePopup';
import EditAvatarPopup from './popups/EditAvatarPopup';
import AddPlacePopup from './popups/AddPlacePopup';
import ConfirmPopup from './popups/ConfirmPopup';
import Login from './enter/Login';
import Register from './enter/Register';
import ProtectedRoute from './ProtectedRoute';
import * as mestoAuth from '../utils/mestoAuth.js';
import InfoTooltip from './popups/InfoTooltip';

function App() {
  const [isValidRegister, setIsValidRegister] = useState(null);
  const [showInfoTooltip, setShowInfoTooltip] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const [loggedIn, setLoggedIn] = useState(null);
  const [userData, setUserData] = useState('');

  const [isEditProfilePopupOpen, setIsEditProfilePopupOpen] = useState(false);
  const [isAddPlacePopupOpen, setIsAddPlacePopupOpen] = useState(false);
  const [isEditAvatarPopupOpen, setIsEditAvatarPopupOpen] = useState(false);
  const [isConfirmPopupOpen, setIsConfirmPopupOpen] = useState(false);
  const [currentDeleteCard, setCurrentDeleteCard] = useState(null);

  const [selectedCard, setSelectedCard] = useState(null);

  const [cards, setCards] = useState([]);

  const [currentUser, setCurrentUser] = useState({
    about: '',
    avatar: '',
    cohort: '',
    name: '',
    _id: '',
  });

  const closeAllPopups = () => {
    setIsEditProfilePopupOpen(false);
    setIsAddPlacePopupOpen(false);
    setIsEditAvatarPopupOpen(false);
    setSelectedCard(null);
    setIsConfirmPopupOpen(false);
    setShowInfoTooltip(false);
  };

  const navigate = useNavigate();
  const location = useLocation();

  const handleLogin = (password, email) => {
    mestoAuth
      .authorize(password, email)
      .then((data) => {
        localStorage.setItem('token', data.token);
        setUserData(email);
        setLoggedIn(true);
        navigate('/');
      })
      .catch(console.error);
  };

  const handleRegister = (password, email) => {
    mestoAuth
      .register(password, email)
      .then(() => {
        setShowInfoTooltip(true);
        setIsValidRegister(true);
        navigate('/login');
      })
      .catch((error) => {
        setIsValidRegister(false);
        setShowInfoTooltip(true);
        console.log(error);
      });
  };

  const checkToken = () => {
    const token = localStorage.getItem('token');
    mestoAuth
      .checkJwt(token)
      .then((data) => {
        if (data) {
          setUserData(data.data.email);
          setLoggedIn(true);
          navigate(location.pathname);
        } else {
          setLoggedIn(false);
        }
      })
      .catch(console.error);
  };

  useEffect(() => {
    checkToken();
  }, []);

  function handleCloseTooltip() {
    setShowInfoTooltip(false);
  }

  function handleSubmit(request) {
    setIsLoading(true);
    request()
      .then(closeAllPopups)
      .catch(console.error)
      .finally(() => setIsLoading(false));
  }

  function handleCardLike(card) {
    const isLiked = card.likes.some((i) => i._id === currentUser._id);

    async function makeRequest() {
      const newCard = await api.changeLikeCardStatus(card._id, !isLiked);
      setCards((state) => state.map((c) => (c._id === card._id ? newCard : c)));
    }
    handleSubmit(makeRequest);
  }

  function handleCardDelete(id) {
    async function makeRequest() {
      await api.deleteCard(id);
      setCards((state) => state.filter((c) => c._id !== id));
    }
    handleSubmit(makeRequest);
  }

  function handleUpdateUser({ name, about }) {
    async function makeRequest() {
      const res = await api.editProfile({ name, about });
      setCurrentUser(res);
    }
    handleSubmit(makeRequest);
  }

  function handleUpdateAvatar({ link }) {
    async function makeRequest() {
      await api.editAvatarProfile({ link }).then(setCurrentUser);
    }
    handleSubmit(makeRequest);
  }

  function handleAddPlace({ name, link }) {
    async function makeRequest() {
      const newCard = await api.addNewCard({ name, link });
      setCards([newCard, ...cards]);
    }
    handleSubmit(makeRequest);
  }

  useEffect(() => {
    Promise.all([api.getInitialCards(), api.getUserInfo()])
      .then(([resCards, resUser]) => {
        setCurrentUser(resUser);
        const cardList = resCards.map((card) => card);
        setCards(cardList);
      })
      .catch(console.error);
  }, []);

  return (
    <AppContext.Provider value={{ isLoading, closeAllPopups }}>
      <CurrentUserContext.Provider value={currentUser}>
        <div className="body">
          <div className="page">
            {showInfoTooltip ? (
              isValidRegister ? (
                <InfoTooltip
                  title="Вы успешно зарегистрировались!"
                  img={successfulLoginImg}
                  handleClose={handleCloseTooltip}
                />
              ) : (
                <InfoTooltip
                  title="Что-то пошло не так!
Попробуйте ещё раз."
                  img={errorLoginImg}
                  handleClose={handleCloseTooltip}
                />
              )
            ) : (
              ''
            )}
            <Routes>
              <Route
                path="/"
                element={
                  <ProtectedRoute
                    component={
                      <Main
                        userData={userData}
                        cards={cards}
                        onEditAvatar={() => {
                          setIsEditAvatarPopupOpen(!isEditAvatarPopupOpen);
                        }}
                        onEditProfile={() => {
                          setIsEditProfilePopupOpen(!isEditProfilePopupOpen);
                        }}
                        onAddPlace={() => {
                          setIsAddPlacePopupOpen(!isAddPlacePopupOpen);
                        }}
                        onConfirm={() => {
                          setIsConfirmPopupOpen(!isConfirmPopupOpen);
                        }}
                        onCardClick={(card) => {
                          setSelectedCard(card);
                        }}
                        onCardLike={(card) => {
                          handleCardLike(card);
                        }}
                        setCardDelete={(id) => {
                          setCurrentDeleteCard(id);
                        }}
                      />
                    }
                    loggedIn={loggedIn}
                  />
                }
              />
              <Route
                path="/register"
                element={<Register handleRegister={handleRegister} />}
              />
              <Route
                path="/login"
                element={
                  <Login
                    handleLogin={handleLogin}
                    isValidLogin={isValidRegister}
                    showInfoTooltip={showInfoTooltip}
                    handleCloseTooltip={handleCloseTooltip}
                  />
                }
              />
              <Route path="*" element={<h2>Not Found</h2>} />
            </Routes>

            <Footer />
          </div>
          <EditProfilePopup
            isOpen={isEditProfilePopupOpen}
            onUpdateUser={handleUpdateUser}
          />
          <AddPlacePopup
            isOpen={isAddPlacePopupOpen}
            onAddPlace={handleAddPlace}
          />
          <ConfirmPopup
            isOpen={isConfirmPopupOpen}
            onDeleteCard={() => {
              handleCardDelete(currentDeleteCard);
            }}
          />
          <EditAvatarPopup
            isOpen={isEditAvatarPopupOpen}
            onUpdateAvatar={handleUpdateAvatar}
          />
          <ImagePopup isOpen={selectedCard} selectedCard={selectedCard} />
        </div>
      </CurrentUserContext.Provider>
    </AppContext.Provider>
  );
}

export default App;
