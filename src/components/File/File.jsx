import { useDispatch, useSelector } from 'react-redux'

import { deleteFile, downloadFile } from '../../actions/file'
import { pushToStack, setCurrentDir, setFiles } from '../../reducers/fileReducer'
import sizeFormat from '../../utils/sizeFormat'
import textShortener from '../../utils/textShortener'
import Dropdown from '../Dropdown/Dropdown'
import '../File/File.scss'

const File = ({ file }) => {
  const dispatch = useDispatch()
  const currentDir = useSelector((state) => state.files.currentDir)
  const { currentUser } = useSelector((state) => state.user)

  const openDirHandler = () => {
    if (file.type === 'dir') {
      dispatch(setFiles([]))
      dispatch(pushToStack(currentDir))
      dispatch(setCurrentDir(file._id))
      window.scrollTo(0, 0)
    }
  }
  const downloadHandler = (e) => {
    e.stopPropagation()
    downloadFile(file)
  }
  const deleteHandler = (e) => {
    e.stopPropagation()
    dispatch(deleteFile(file, currentUser))
  }
  return (
    <div className={'file'} onClick={() => openDirHandler(file)}>
      <div className='file__icons'>
        {file.type === 'dir' ? (
          <svg
            className='file__icon'
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
        ) : (
          <svg id='Layer_1' className='file__icon' height='512' viewBox='0 0 24 24' width='512' data-name='Layer 1'>
            <path d='m14 7v-6.54a6.977 6.977 0 0 1 2.465 1.59l3.484 3.486a6.954 6.954 0 0 1 1.591 2.464h-6.54a1 1 0 0 1 -1-1zm8 3.485v8.515a5.006 5.006 0 0 1 -5 5h-10a5.006 5.006 0 0 1 -5-5v-14a5.006 5.006 0 0 1 5-5h4.515c.163 0 .324.013.485.024v6.976a3 3 0 0 0 3 3h6.976c.011.161.024.322.024.485zm-8 8.515a1 1 0 0 0 -1-1h-5a1 1 0 0 0 0 2h5a1 1 0 0 0 1-1zm3-4a1 1 0 0 0 -1-1h-8a1 1 0 0 0 0 2h8a1 1 0 0 0 1-1z' />
          </svg>
        )}
        <div className='file__dropdown'>
          <div className='file__dropdown-btn'>
            <svg
              className='file__dots'
              version='1.1'
              id='Capa_1'
              x='0px'
              y='0px'
              viewBox='0 0 512 512'
              width='512'
              height='512'
            >
              <g>
                <circle cx='256' cy='53.333' r='53.333' />
                <circle cx='256' cy='256' r='53.333' />
                <circle cx='256' cy='458.667' r='53.333' />
              </g>
            </svg>
            <Dropdown type={file.type} deleteHandler={deleteHandler} downloadHandler={downloadHandler} file={file} />
          </div>
        </div>
      </div>
      <div className='file__info'>
        <div className={'file__name'}>{textShortener(file.name, 15)}</div>
        {file.type === 'dir' ? (
          <div className={'file__date'}>{file.childs.length + ' files'}</div>
        ) : (
          <>
            <div className={'file__date'}>{file.date.slice(0, 10)}</div>
            <div className={'file__size'}>{sizeFormat(file.size)}</div>
          </>
        )}
      </div>
    </div>
  )
}

export default File
