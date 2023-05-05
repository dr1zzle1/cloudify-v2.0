import { useDispatch, useSelector } from 'react-redux'
import { CSSTransition, TransitionGroup } from 'react-transition-group'

import { setCurrentDir } from '../../reducers/fileReducer'
import { logout } from '../../reducers/userReducer'
import textShortener from '../../utils/textShortener'
import Button from '../Button/Button'
import './Sidebar.scss'

const Sidebar = () => {
  const dispatch = useDispatch()
  const { rootDirs } = useSelector((state) => state.files)
  const openDirHandler = (id) => {
    dispatch(setCurrentDir(id))
  }
  return (
    <div className='sidebar'>
      <span className='sidebar__logo'>Cloudify</span>
      <TransitionGroup className='sidebar__filelist'>
        {rootDirs.map((el) => {
          if (el.type === 'dir') {
            return (
              <CSSTransition key={el._id} timeout={500} classNames={'file'} exit={false}>
                <Button
                  icon={
                    <svg
                      xmlns='http://www.w3.org/2000/svg'
                      version='1.1'
                      id='Capa_1'
                      x='0px'
                      y='0px'
                      viewBox='0 0 512 512'
                      width='512'
                      height='512'
                      fill='#afafaf'
                    >
                      <g>
                        <path d='M0,191.808V384c0.071,58.881,47.786,106.596,106.667,106.667h298.667C464.214,490.596,511.93,442.881,512,384V189.44   L0,191.808z' />
                        <path d='M405.333,64H266.069c-3.299,0.022-6.56-0.708-9.536-2.133l-67.328-33.792c-8.888-4.426-18.679-6.733-28.608-6.741h-53.931   C47.786,21.404,0.071,69.119,0,128v21.141l509.077-2.368C497.961,98.408,454.959,64.099,405.333,64z' />
                      </g>
                    </svg>
                  }
                  onClick={() => openDirHandler(el._id)}
                >
                  {textShortener(el.name, 15)}
                </Button>
              </CSSTransition>
            )
          }
          return null
        })}
      </TransitionGroup>
      <Button
        icon={
          <svg id='Layer_1' data-name='Layer 1' viewBox='0 0 24 24' width='512' height='512' fill='#afafaf'>
            <path d='M11.476,15a1,1,0,0,0-1,1v3a3,3,0,0,1-3,3H5a3,3,0,0,1-3-3V5A3,3,0,0,1,5,2H7.476a3,3,0,0,1,3,3V8a1,1,0,0,0,2,0V5a5.006,5.006,0,0,0-5-5H5A5.006,5.006,0,0,0,0,5V19a5.006,5.006,0,0,0,5,5H7.476a5.006,5.006,0,0,0,5-5V16A1,1,0,0,0,11.476,15Z' />
            <path d='M22.867,9.879,18.281,5.293a1,1,0,1,0-1.414,1.414l4.262,4.263L6,11a1,1,0,0,0,0,2H6l15.188-.031-4.323,4.324a1,1,0,1,0,1.414,1.414l4.586-4.586A3,3,0,0,0,22.867,9.879Z' />
          </svg>
        }
        className='sidebar__logout-link'
        onClick={() => dispatch(logout())}
      >
        Log out
      </Button>
    </div>
  )
}

export default Sidebar
