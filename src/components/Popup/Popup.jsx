import { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'

import { createDir } from '../../actions/file'
import { setPopupDisplay } from '../../reducers/fileReducer'
import './Popup.scss'

const Popup = () => {
  const [dirName, setDirName] = useState('')
  const popupDisplay = useSelector((state) => state.files.popupDisplay)
  const currentDir = useSelector((state) => state.files.currentDir)
  const dispatch = useDispatch()
  const createHandler = () => {
    dispatch(createDir(currentDir, dirName))
    setDirName('')
    dispatch(setPopupDisplay('none'))
  }
  return (
    <div onClick={() => dispatch(setPopupDisplay('none'))} className={'popup'} style={{ display: popupDisplay }}>
      <div className={'popup__content'} onClick={(e) => e.stopPropagation()}>
        <div className={'popup__header'}>
          <div className={'popup__title'}>Crete new folder</div>
          <button onClick={() => dispatch(setPopupDisplay('none'))} className={'popup__close'}>
            X
          </button>
        </div>
        <input
          type='text'
          placeholder='Type the folder name...'
          value={dirName}
          onChange={(e) => setDirName(e.currentTarget.value)}
        />
        <button onClick={createHandler} className={'popup__create'}>
          Create
        </button>
      </div>
    </div>
  )
}

export default Popup
