import { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'

import { getFiles, getRootDirs, uploadFile } from '../../actions/file'
import FileList from '../../components/FileList/FileList'
import Header from '../../components/Header/Header'
import Popup from '../../components/Popup/Popup'
import Sidebar from '../../components/Sidebar/Sidebar'
import Uploader from '../../components/Uploader/Uploader'
import { setPopupDisplay } from '../../reducers/fileReducer'
import './Disk.scss'

const Disk = ({ isMobile }) => {
  const dispatch = useDispatch()
  const { currentDir } = useSelector((state) => state.files)
  const { currentUser } = useSelector((state) => state.user)
  const [dragEnter, setDragEnter] = useState(false)
  const [isVisibleSidebar, setIsVisibleSidebar] = useState(true)

  const fileUploadHandler = (event) => {
    const files = [...event.target.files]
    files.forEach((file) => dispatch(uploadFile(file, currentDir, currentUser)))
  }

  const showPopupHandler = () => {
    dispatch(setPopupDisplay('flex'))
  }
  const showSidebar = () => {
    setIsVisibleSidebar(true)
  }

  const dragEnterHandler = (event) => {
    event.preventDefault()
    event.stopPropagation()
    setDragEnter(true)
  }
  const drageLeaveHandler = (event) => {
    event.preventDefault()
    event.stopPropagation()
    setDragEnter(false)
  }

  const dropHandler = (event) => {
    event.preventDefault()
    event.stopPropagation()
    let files = [...event.dataTransfer.files]
    setDragEnter(false)
    files.forEach((file) => dispatch(uploadFile(file, currentDir, currentUser)))
  }

  useEffect(() => {
    dispatch(getFiles(currentDir))
    dispatch(getRootDirs())
    setIsVisibleSidebar(!isMobile)
  }, [currentDir, dispatch, isMobile])

  return (
    <div className='disk__wrapper'>
      <Sidebar isVisible={isVisibleSidebar} setIsVisible={setIsVisibleSidebar} />
      <Popup />
      {!dragEnter ? (
        <div
          className={'disk'}
          onDragEnter={dragEnterHandler}
          onDragLeave={drageLeaveHandler}
          onDragOver={dragEnterHandler}
        >
          <Header
            showSidebar={showSidebar}
            showPopupHandler={showPopupHandler}
            fileUploadHandler={fileUploadHandler}
            currentUser={currentUser}
            isMobile={isMobile}
          />
          <FileList />
          <Uploader />
        </div>
      ) : (
        <div
          className={'drop-area'}
          onDragEnter={dragEnterHandler}
          onDragLeave={drageLeaveHandler}
          onDragOver={dragEnterHandler}
          onDrop={dropHandler}
        >
          Перетащите файлы сюда
        </div>
      )}
    </div>
  )
}

export default Disk
