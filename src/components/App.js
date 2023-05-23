import { useState, useEffect } from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';

import Header from './Header';
import Main from './Main';
import Footer from './Footer';
import ImagePopup from './ImagePopup';
import api from '../utils/Api';
import CurrentUserContext from '../contexts/CurrentUserContext';
import EditProfilePopup from './popups/EditProfilePopup';
import EditAvatarPopup from './popups/EditAvatarPopup';
import AddPlacePopup from './popups/AddPlacePopup';
import ConfirmPopup from './popups/ConfirmPopup';
import Login from './enter/Login';
import Register from './enter/Register';
import ProtectedRoute from './ProtectedRoute';

function App() {
  const [loggedIn, setLoggedIn] = useState(false);

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

  const IsAnyPopupOpen =
    isEditProfilePopupOpen ||
    isAddPlacePopupOpen ||
    isEditAvatarPopupOpen ||
    selectedCard ||
    isConfirmPopupOpen;

  const closeAllPopups = () => {
    setIsEditProfilePopupOpen(false);
    setIsAddPlacePopupOpen(false);
    setIsEditAvatarPopupOpen(false);
    setSelectedCard(null);
    setIsConfirmPopupOpen(false);
  };

  function handleCardLike(card) {
    const isLiked = card.likes.some((i) => i._id === currentUser._id);

    api
      .changeLikeCardStatus(card._id, !isLiked)
      .then((newCard) => {
        setCards((state) =>
          state.map((c) => (c._id === card._id ? newCard : c))
        );
      })
      .catch((err) => console.log(err));
  }

  function handleCardDelete(id) {
    api
      .deleteCard(id)
      .then(() => {
        setCards((state) => state.filter((c) => c._id !== id));
        closeAllPopups();
      })
      .catch((err) => console.log(err));
  }

  function handleUpdateUser({ name, about }) {
    api
      .editProfile({ name, about })
      .then((user) => {
        setCurrentUser(user);
        closeAllPopups();
      })
      .catch((err) => console.log(err));
  }

  function handleUpdateAvatar({ link }) {
    api
      .editAvatarProfile({ link })
      .then((user) => {
        setCurrentUser(user);
        closeAllPopups();
      })
      .catch((err) => console.log(err));
  }

  function handleAddPlace({ name, link }) {
    console.log(1);
    api
      .addNewCard({ name, link })
      .then((newCard) => {
        setCards([newCard, ...cards]);
        closeAllPopups();
      })
      .catch((err) => console.log(err));
  }

  useEffect(() => {
    function handleEscClose(event) {
      if (event.key === 'Escape') {
        closeAllPopups();
      }
    }
    if (IsAnyPopupOpen) {
      document.addEventListener('keyup', handleEscClose);
    }

    return () => {
      document.removeEventListener('keyup', handleEscClose);
    };
  }, [IsAnyPopupOpen]);

  useEffect(() => {
    Promise.all([api.getInitialCards(), api.getUserInfo()])
      .then(([resCards, resUser]) => {
        setCurrentUser(resUser);
        const cardList = resCards.map((card) => card);
        setCards(cardList);
      })
      .catch((err) => console.error(err));
  }, []);

  return (
    <CurrentUserContext.Provider value={currentUser}>
      <div className="body">
        <div className="page">
          <Header />

          <Routes>
            <Route
              path="/"
              element={
                <ProtectedRoute
                  component={
                    <Main
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
                      onCardClick={(link) => {
                        setSelectedCard(link);
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
            <Route path="/register" element={<Register />} />
            <Route path="/login" element={<Login />} />
            <Route path="*" element={<h2>Not Found</h2>} />
            {/* <Route
              path="/"
              element={
                !loggedIn ? (
                  <Navigate to="/login" replace />
                ) : (
                  <Main
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
                    onCardClick={(link) => {
                      setSelectedCard(link);
                    }}
                    onCardLike={(card) => {
                      handleCardLike(card);
                    }}
                    setCardDelete={(id) => {
                      setCurrentDeleteCard(id);
                    }}
                  />
                )
              }
            /> */}
          </Routes>

          <Footer />
        </div>
        <EditProfilePopup
          isOpen={isEditProfilePopupOpen}
          onClose={closeAllPopups}
          onUpdateUser={handleUpdateUser}
        />
        <AddPlacePopup
          isOpen={isAddPlacePopupOpen}
          onClose={closeAllPopups}
          onAddPlace={handleAddPlace}
        />
        <ConfirmPopup
          isOpen={isConfirmPopupOpen}
          onClose={closeAllPopups}
          onDeleteCard={() => {
            handleCardDelete(currentDeleteCard);
          }}
        />
        <EditAvatarPopup
          isOpen={isEditAvatarPopupOpen}
          onClose={closeAllPopups}
          onUpdateAvatar={handleUpdateAvatar}
        />
        <ImagePopup
          isOpen={selectedCard}
          selectedCard={selectedCard}
          onClose={closeAllPopups}
        />
      </div>
    </CurrentUserContext.Provider>
  );
}

export default App;
