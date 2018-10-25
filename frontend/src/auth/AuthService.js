import { authHeader } from './Header';

function login(username, password){
    const requestOptions = {
        method: 'post',
        headers: {
            'Content-Type': 'application/json'
          },
        body: JSON.stringify({username, password})
    };
    return fetch(`http://localhost:8000/api/login`, requestOptions, )
        .then(handleResponse)
        .then(token => {
            if (token){
                localStorage.setItem('user', JSON.stringify(token))
            }
            return token;
        });
}

function logout(){
    localStorage.removeItem('user');
}

function get_nickname(){
    const requestOptions = {
        method: 'GET',
        headers: authHeader()
    }
    return fetch('http://localhost:8000/api/user', requestOptions).then(handleResponse)
}

function handleResponse(response) {
    return response.text().then(text =>{
        const data = JSON.parse(text);
        if (!response.ok){
            if (response.status === 401 || response.status === 400) {
                // auto logout if 401 response returned from api
                console.error(data)
                if (response.status === 401) { 
                    logout();
                    window.location.reload(true);
                }
            }
            const error = data.text || response.statusText;
            return Promise.reject(error)
        }
        return data;
    });
}

// todo
function handleSignup(response){}


export const authService = {
    login,
    logout, 
    get_nickname
};