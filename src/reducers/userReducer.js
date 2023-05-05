const SET_USER = 'SET_USER'
const LOGOUT = 'LOGOUT'
const SET_ISLOADING = 'SET_ISLOADING'

const defaultState = {
  currentUser: {},
  isAuth: false,
  isLoading: false,
}

export default function userReducer(state = defaultState, action) {
  switch (action.type) {
    case SET_USER:
      return {
        ...state,
        currentUser: action.payload,
        isAuth: true,
      }
    case LOGOUT:
      localStorage.removeItem('token')
      return {
        ...state,
        currentUser: {},
        isAuth: false,
      }
    case SET_ISLOADING:
      return {
        ...state,
        isLoading: !state.isLoading,
      }
    default:
      return state
  }
}

export const setUser = (user) => ({ type: SET_USER, payload: user })
export const logout = () => ({ type: LOGOUT })
export const setIsLoading = () => ({ type: SET_ISLOADING })
