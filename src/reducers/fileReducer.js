const SET_FILES = 'SET_FILES'
const SET_CURRENT_DIR = 'SET_CURRENT_DIR'
const ADD_FILE = 'ADD_FILE'
const SET_POPUP_DISPLAY = 'SET_POPUP_DISPLAY'
const PUSH_TO_STACK = 'PUSH_TO_STACK'
const POP_FROM_STACK = 'POP_FROM_STACK'
const DELETE_FILE = 'DELETE_FILE'
const SET_ROOT_DIRS = 'SET_ROOT_DIRS'
const SET_IS_LOADING = 'SET_IS_LOADING'
const SET_CURRENT_DIR_NAME = 'SET_CURRENT_DIR_NAME'

const defaultState = {
  files: [],
  rootDirs: [],
  currentDir: null,
  currentDirName: null,
  popupDisplay: 'none',
  dirStack: [],
  isLoading: false,
}

export default function fileReducer(state = defaultState, action) {
  switch (action.type) {
    case SET_FILES:
      return {
        ...state,
        files: action.payload,
        rootDirs: [...state.rootDirs, !action.payload.parent && action.payload],
      }
    case SET_CURRENT_DIR:
      return { ...state, currentDir: action.payload }
    case SET_CURRENT_DIR_NAME:
      return { ...state, currentDirName: action.payload }
    case ADD_FILE:
      return {
        ...state,
        files: [...state.files, action.payload],
        rootDirs: [...state.rootDirs, !action.payload.parent && action.payload],
      }
    case SET_POPUP_DISPLAY:
      return { ...state, popupDisplay: action.payload }
    case PUSH_TO_STACK:
      return { ...state, dirStack: [...state.dirStack, action.payload] }
    case POP_FROM_STACK:
      return { ...state, dirStack: action.payload }
    case DELETE_FILE:
      return {
        ...state,
        files: [...state.files.filter((file) => file._id !== action.payload)],
        rootDirs: [...state.rootDirs.filter((file) => file._id !== action.payload)],
      }
    case SET_ROOT_DIRS:
      return { ...state, rootDirs: action.payload }
    case SET_IS_LOADING:
      return { ...state, isLoading: !state.isLoading }
    default:
      return state
  }
}

export const setFiles = (files) => ({ type: SET_FILES, payload: files })
export const setCurrentDir = (dirId) => ({ type: SET_CURRENT_DIR, payload: dirId })
export const setCurrentDirName = (name) => ({ type: SET_CURRENT_DIR_NAME, payload: name })
export const addFile = (file) => ({ type: ADD_FILE, payload: file })
export const setPopupDisplay = (display) => ({
  type: SET_POPUP_DISPLAY,
  payload: display,
})
export const pushToStack = (dir) => ({ type: PUSH_TO_STACK, payload: dir })
export const popFromStack = (dir) => ({ type: POP_FROM_STACK, payload: dir })
export const deleteFileAction = (id) => ({ type: DELETE_FILE, payload: id })
export const setRootDirs = (dirs) => ({ type: SET_ROOT_DIRS, payload: dirs })
export const setIsLoading = () => ({ type: SET_IS_LOADING })
