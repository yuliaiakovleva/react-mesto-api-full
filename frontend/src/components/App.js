import React, { useEffect, useState } from 'react';
import Header from './Header';
import Footer from './Footer';
import Main from './Main';
import EditProfilePopup from './EditProfilePopup';
import ImagePopup from './ImagePopup';
import api from '../utils/api';
import { CurrentUserContext } from '../contexts/CurrentUserContext';
import EditAvatarPopup from './EditAvatarPopup';
import AddPlacePopup from './AddPlacePopup';
import Login from './Login';
import Register from './Register';
import { Route, Switch, Redirect, useLocation, useHistory } from 'react-router-dom';
import ProtectedRoute from "./ProtectedRoute";
import * as auth from '../utils/Auth';
import InfoToolTip from './InfoToolTip';
import react from 'react';



function App() {

    const location = useLocation();
    const history = useHistory();
    // Авторизация и Регистрация
    const [loggedIn, setLoggedIn] = useState(false);
    const [token, setToken] = useState(null);
    const [info, setEmail] = useState('');

    // для InfoToolTip
    const [ifLogin, setIfLogin] = react.useState('');

    const [isEditProfilePopupOpen, setIsEditProfilePopupOpen] = React.useState(false)
    const [isAddPlacePopupOpen, setAddPlacePopupOpen] = React.useState(false)
    const [isEditAvatarPopupOpen, setEditAvatarPopupOpen] = React.useState(false)
    const [isInfoToolTipOpen, setInfoToolTipOpen] = React.useState(false)
    const [selectedCard, setSelectedCard] = React.useState({
         name: '',
         link: ''
     });
    
    const [cards, setCards] = useState([]);
    const [currentUser, setCurrentUser] = React.useState({
         name: '',
         about: '',
         avatar: ''
     });




    function handleLogin(data) {
         console.log(data)
         auth.authorize(data.password, data.email)
         .then((res) => {
             console.log(res);
             console.log(localStorage);
             // при авторизации мы записываем в локал сторрадж токен. потом в app в функции handleTokenCheck будем его все время проверять
             localStorage.setItem('jwt', res.token);
             setLoggedIn(true);
             // благодаря этому вызову я меняю мейл сразу же
             handleTokenCheck('/')
             console.log(localStorage);
            //  api.getUserInfo()
            //  .then(data => {
            //      setCurrentUser(data);
            //  });
             // history.push('/')
         })
         .catch(err => {
 
             console.log(err);
           });
     }
 
     function handleRegister(data) {
         auth.register(data.password, data.email)
 
         .then((res) => {
           console.log(res);
           if (res.statusCode !== 400) {
             handleIfLogin(true);
             setTimeout(() => {
                 handleLogin({password: data.password, email: data.email});
             }, 300);
             // console.log({password: data.password, email: data.email});
             // history.push('/sign-in');    
           }
         })
         .catch(err => {
           handleIfLogin(false);
           console.log(err);
         });
     }
 
     useEffect(() => {
         handleTokenCheck(location.pathname);
     }, [])
 
     function handleTokenCheck(path) {
         // если у нас в хранилище хранятся данные, то отправляем запрос на сервер
         if (localStorage.getItem('jwt')) {
             const jwt = localStorage.getItem('jwt');
             auth.checkToken(jwt)
                 .then((res) => {
                     if (res) {
                        console.log(res.data);
                        const email = res.email;
                        console.log(email);
                        setEmail(email);
                        setLoggedIn(true);
                        console.log(jwt);
                        setToken(jwt);
                        history.push(path);
                     }
                 })
                 .catch(err => console.log(err));
         }
     }
 
    function handleLogout(e) {
         e.preventDefault();
         console.log(localStorage, 'Хей');
         localStorage.removeItem('jwt');
         console.dir(localStorage);
         setLoggedIn(false);
         setCurrentUser({});
         history.push('/sign-in');
    }
    
//  загружаем всю инфу на страницу после авторизации
    useEffect(() => {
        console.log(token)
        if(token) {
            api.getUserInfo()
            .then(data => {
                setCurrentUser(data);
                console.log(data);
            })
            .catch((err) => {
                console.log('Ошибка.', err)
            })
        }
    }, [token])

    useEffect(() => {
        if(token) {
            api.getInitialCards()
            .then(data => {
                // console.log(data);
                setCards(data);
            })
            .catch((err) => {
                console.log('Ошибка.', err)
            })
        }
    }, [token])
    

    function handleUpdateUser(data) {
        api.setUserInfo(data)
            .then(data => {
                // console.log(data);
                setCurrentUser(data);
                closeAllPopups();
            })
            .catch((err) => {
                console.log('Ошибка.', err)
            })
    }

    function handleUpdateAvatar(data) {
        // console.log(data);
        api.changeAvatar(data)
            .then(response => {
                console.log(response);
                setCurrentUser(response);
                closeAllPopups();
            })
            .catch((err) => {
                console.log('Ошибка.', err)
            })
    }

    // про карточки 

  

    function handleCardLike(card) {
        // console.log(card);
        // Снова проверяем, есть ли уже лайк на этой карточке
        const isLiked = card.likes.some(likeAutor => likeAutor._id === currentUser._id);

        // Отправляем запрос в API и получаем обновлённые данные карточки
        api.changeLikeCardStatus(card.id, isLiked)
            .then((newCard) => {
                // console.log(newCard);
                setCards((state) => state.map((c) => {
                    // console.log(c);
                    return c._id === card.id ? newCard : c
                }));
            })
            .catch((err) => {
                console.log('Ошибка.', err)
            })
    }

    function handleCardDlete(card) {
        api.deleteCard(card.id)
            .then(() => {
                setCards((state) => state.filter((element) => element._id !== card.id))
            })
            .catch((err) => {
                console.log('Ошибка.', err)
            })

    }

    function handleAddPlaceSubmit(data) {
        // console.log(data);
        api.addNewCard(data)
            .then(newCard => {
                setCards([newCard, ...cards]);

                closeAllPopups();
            })
            .catch((err) => {
                console.log('Ошибка.', err)
            })
    }

    

   function handleIfLogin(answer) {
        setIfLogin(answer);
   }

   // Открываем и закрываем
   function handleEditProfileClick() {setIsEditProfilePopupOpen(true);}
   function handleEditAvatarClick() {setEditAvatarPopupOpen(true);}
   function handleAddPlaceClick() {setAddPlacePopupOpen(true);}
   function handleInfoToolTipClick() {setInfoToolTipOpen(true);}
   function handleCardClick(card) {setSelectedCard(card);}
   function closeAllPopups() {
       setIsEditProfilePopupOpen(false);
       setEditAvatarPopupOpen(false);
       setAddPlacePopupOpen(false);
       setInfoToolTipOpen(false);
       setSelectedCard({
           name: '',
           link: ''
       });
   }

   return (
    <>
        {/* распространяем контекст по всему dom-дереву */}
        <CurrentUserContext.Provider value={currentUser}>
            <Header 
            location={location.pathname} loggedIn={loggedIn} email={info} onLogout={handleLogout}
            ></Header>
            <main className="content">
                <Switch>
                    <ProtectedRoute
                        path="/" exact
                        loggedIn={loggedIn}
                        component={Main}
                        handleCardClick={handleCardClick}
                        onEditAvatar={handleEditAvatarClick}
                        onEditProfile={handleEditProfileClick}
                        onAddPlace={handleAddPlaceClick}
                        cards={cards}
                        onCardLike={handleCardLike}
                        onCardDelete={handleCardDlete}
                    >
                    </ProtectedRoute>

                    <Route path="/sign-in">
                        <Login 
                        handleLogin={handleLogin}
                        >
                            
                        </Login>

                    </Route>

                    <Route path="/sign-up">

                        <Register 
                        handleRegister={handleRegister} onInfoToolTip={handleInfoToolTipClick}
                        ></Register>
                    </Route>

                   
                    <Route>{loggedIn ? <Redirect to="/" /> : <Redirect to="/sign-in" />}</Route>
                </Switch>
                <Footer location={location.pathname} />
            </main>


            {/* <!-- попап с редактированием профиля --> */}
            <EditProfilePopup
                isOpen={isEditProfilePopupOpen}
                onClose={closeAllPopups}
                onUpdateUser={handleUpdateUser}
            >
            </EditProfilePopup>

            {/* <!-- попап с обновлением аватара --> */}
            <EditAvatarPopup
                isOpen={isEditAvatarPopupOpen}
                onClose={closeAllPopups}
                onUpdateAvatar={handleUpdateAvatar}
            >
            </EditAvatarPopup>

            {/* <!-- попап с добавлением карточек --> */}
            <AddPlacePopup
                isOpen={isAddPlacePopupOpen}
                onClose={closeAllPopups}
                onAddPlace={handleAddPlaceSubmit}
            >
            </AddPlacePopup>

            <InfoToolTip
            isOpen={isInfoToolTipOpen}
            onClose={closeAllPopups}
            ifLogin={ifLogin}
            > 

            </InfoToolTip>

        </CurrentUserContext.Provider>

        {/* попап с картинкой на всю страницу */}
        <ImagePopup
            card={selectedCard}
            onClose={closeAllPopups}

        /> 
    </>
);
}

export default App;
