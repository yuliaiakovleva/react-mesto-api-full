class Api {
    constructor({url, headers}) {
        this._url = url;
        this._headers = headers;
    };

    _checkResponse(res){
        if (res.ok) {
            return res.json();
        }
          // если ошибка, отклоняем промиc
         return Promise.reject(`Ошибка: ${res.status}`); 
    }

    getInitialCards() {
        return fetch(`${this._url}/cards`, {
            headers:  {
               'Authorization': `Bearer ${localStorage.getItem('jwt')}`,
            },
        })
        .then(this._checkResponse)
    };

    getUserInfo() {
        return fetch(`${this._url}/users/me`, {
            headers:  {
               'Authorization': `Bearer ${localStorage.getItem('jwt')}`,
            },
        })
        .then(this._checkResponse)
 
    };

    setUserInfo(inputValue) {
        return fetch(`${this._url}/users/me`, {
            method: 'PATCH',
            headers:  {
               'Authorization': `Bearer ${localStorage.getItem('jwt')}`,
               ...this._headers,
            },
            body: JSON.stringify({
                name: inputValue.name,
                about: inputValue.about,
                avatar: inputValue.avatar
            })
          })
        .then(this._checkResponse)
 
    };

    addNewCard({name, link}) {
        return fetch(`${this._url}/cards`, {
            method: 'POST',
            headers:  {
               'Authorization': `Bearer ${localStorage.getItem('jwt')}`,
               ...this._headers,
            },
            body: JSON.stringify({
                name,
                link
            })
          })
        .then(this._checkResponse)
 
    }

    changeLikeCardStatus(cardId, isLiked) {
        return fetch(`${this._url}/cards/likes/${cardId}`, {
            method: `${isLiked ? 'DELETE' : 'PUT'}`,
            headers:  {
               'Authorization': `Bearer ${localStorage.getItem('jwt')}`,
               ...this._headers
            },
          })
        .then(this._checkResponse) 
    }
    
    deleteCard(cardId){
        return fetch(`${this._url}/cards/${cardId}`, {
            method: 'DELETE',
            headers:  {
               'Authorization': `Bearer ${localStorage.getItem('jwt')}`,
               ...this._headers,
            },
          })
        .then(this._checkResponse)
 
    }

    changeAvatar(link){
        return fetch(`${this._url}/users/me/avatar`, {
            method: 'PATCH',
            headers:  {
               'Authorization': `Bearer ${localStorage.getItem('jwt')}`,
               ...this._headers
            },
            body: JSON.stringify({avatar: link})
          })
        .then(this._checkResponse)
 
    }

}

const api = new Api({
    url: 'https://api.mesto.yuliayakovleva.nomoredomains.work',
    headers: {
    //   authorization: `Bearer ${localStorage.jwt}`,
      'Content-Type': 'application/json'
    }
  });
 
  export default api;