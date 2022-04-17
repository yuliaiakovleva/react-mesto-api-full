

export const BASE_URL = 'http://api.mesto.yuliayakovleva.nomoredomains.work';

function checkResponse(res){
  if (res.ok) {
      return res.json();
  }
    // если ошибка, отклоняем промиc
   return Promise.reject(`Ошибка: ${res.status}`); 
}

export const register = (password, email) => {
    return fetch(`${BASE_URL}/signup`, {
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({password, email})
    })
    // .then((response) => {
    //   return response.json();
    // })
    .then((response) => {
      return checkResponse(response);
    })
    .then((res) => {
      return res;
    })
  };




export const authorize = (password, email) => {
    return fetch(`${BASE_URL}/signin`, {
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({password, email})
    })
    .then((response) => {
      return checkResponse(response);
    })
    // .then((data) => {
    //   if (data.user){
    //       // data.user или data.jwt ??
    //     localStorage.setItem('jwt', data.jwt);
    //     // возвращаем объект с данными пользователя 
    //     return data;
    //   } 
    // })
  };

// метод проверяет, имеет ли пользователь права на данные 
  export const checkToken = (token) => {
    return fetch(`${BASE_URL}/users/me`, {
      method: 'GET',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`,
      }
    })
    // .then(res => res.json())
    .then((response) => {
      return checkResponse(response);
    })
    .then(data => data)
  }
  






 