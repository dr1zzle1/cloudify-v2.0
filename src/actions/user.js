import axios from 'axios'

import { setIsLoading, setUser } from '../reducers/userReducer'

export const registration = (email, password) => {
  return async (dispatch) => {
    try {
      await axios.post(`https://frolicking-biscuit-063b16.netlify.app/api/auth/registration`, {
        email,
        password,
      })
      dispatch(login(email, password))
    } catch (e) {
      alert(e.response.data.message)
    }
  }
}

export const login = (email, password) => {
  return async (dispatch) => {
    dispatch(setIsLoading())
    try {
      const response = await axios.post(`https://frolicking-biscuit-063b16.netlify.app/api/auth/login`, {
        email,
        password,
      })
      dispatch(setUser(response.data.user))
      localStorage.setItem('token', response.data.token)
    } catch (e) {
      alert(e.response.data.message)
    }
    dispatch(setIsLoading())
  }
}

export const auth = () => {
  return async (dispatch) => {
    dispatch(setIsLoading())
    try {
      const response = await axios.get(`https://frolicking-biscuit-063b16.netlify.app/api/auth/auth`, {
        headers: { Authorization: `Bearer ${localStorage.getItem('token')}` },
      })
      dispatch(setUser(response.data.user))
      localStorage.setItem('token', response.data.token)
    } catch (e) {
      localStorage.removeItem('token')
    }
    dispatch(setIsLoading())
  }
}
