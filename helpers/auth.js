import cookie from 'js-cookie';
import Router from 'next/router';

// set in cookie
// key = name of cookie
// value = is the token
export const setCookie = (key,value) => {
    if (typeof window !== 'undefined') {
        cookie.set(key, value, {
            expires:1
        })
    }
}
// remove from cookie
export const removeCookie = (key) => {
    if (typeof window !== 'undefined') {
        cookie.remove(key)
    }
}
// get from cookie
// will be useful when we need to make request to server with auth token
export const getCookie = (key, req) => {
    console.log("type of window ;", typeof window)
    if (typeof window === 'object') {
        return getCookieFromBrowser(key);
    } else {
        console.log("EROOOOOORZ")
        return getCookieFromServer(key, req);
    }
};

export const getCookieFromBrowser = (key) => {
    console.log("The cookie from the browser key:",key)
    return cookie.get(key)
};

export const getCookieFromServer = (key, req) => {
    console.log("The cookie from the Server, req:",req.headers.cookie)
    if (!req.headers.cookie) {
        return undefined;
    } else {
        let token = req.headers.cookie.split(';').find(c=>c.trim().startsWith(`${key}=`))
        if (!token) {
            return undefined;
        } else {
            let tokenValue = token.split('=')[1];
            console.log('Getting cookie from server tokenValue:',tokenValue)
            return tokenValue;
        }
    }

}

// set in local storage
export const setLocalStorage = (key,value) => {
    if (typeof window !== 'undefined') {
        //value need to be saved in json format hence stringify 
       localStorage.setItem(key, JSON.stringify(value))
    }
}
// remove from local storage
export const removeLocalStorage = (key,value) => {
    if (typeof window !== 'undefined') {
        localStorage.removeItem(key)
    }
}
// authenticate user by passing data to cookie and local storage during sign-in
// callback function will be used if i want to redirect the user after saving data in cookie and local storage
export const authenticate = (data, next) => {
    setCookie('token', data.token);
    setLocalStorage("user", data.user);
    next();
}

// access user info in LocalStorage and cookie
export const isAuth = () => {
    console.log("isAuth() running ...")
    if (typeof window !== 'undefined') {
        const cookieChecked = getCookie('token');
        if (cookieChecked) {
            if (localStorage.getItem('user')) {
                return  JSON.parse(localStorage.getItem('user'))
            } else {
                return false;
            }
        }
    }
}

export const logout = () => {
    if (typeof window !== 'undefined') {
        removeCookie('token');
        removeLocalStorage('user');
        Router.push('/login');
    }
}
