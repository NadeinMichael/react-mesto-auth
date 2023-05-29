import { useContext } from 'react';

import Card from './Card';
import CurrentUserContext from '../contexts/CurrentUserContext';
import Header from './Header';

function Main({
  onCardClick,
  onCardLike,
  setCardDelete,
  onEditAvatar,
  onEditProfile,
  onAddPlace,
  onConfirm,
  cards,
  userData,
}) {
  const currentUser = useContext(CurrentUserContext);

  const signOut = () => {
    localStorage.removeItem('token');
  };

  return (
    <>
      <Header userData={userData} signOut={signOut} />
      <main className="main">
        <section className="profile">
          <div onClick={onEditAvatar} className="profile__avatar-wrapper">
            <img
              className="profile__avatar"
              src={currentUser.avatar}
              alt="аватар"
            />
          </div>
          <div className="profile__info">
            <h1 className="profile__name">{currentUser.name}</h1>
            <button
              className="profile__edit-button"
              type="button"
              aria-label="исправить"
              onClick={onEditProfile}
            ></button>
            <p className="profile__profession">{currentUser.about}</p>
          </div>
          <button
            className="profile__add-button"
            type="button"
            aria-label="добавить"
            onClick={onAddPlace}
          ></button>
        </section>
        <section className="gallery">
          {cards.length ? (
            cards.map((card) => (
              <Card
                key={card._id}
                card={card}
                onCardClick={onCardClick}
                onCardLike={onCardLike}
                setCardDelete={setCardDelete}
                onConfirm={onConfirm}
              />
            ))
          ) : (
            <p> Загрузка картинок...</p>
          )}
        </section>
      </main>
    </>
  );
}

export default Main;
