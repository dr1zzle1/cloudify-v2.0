import { useDispatch, useSelector } from 'react-redux'
import { CSSTransition, TransitionGroup } from 'react-transition-group'

import { setCurrentDir, setFiles } from '../../reducers/fileReducer'
import File from '../File/File'
import Preloader from '../Preloader/Preloader'
import './FileList.scss'

const FileList = () => {
  const { files, currentDir, rootDirs, dirStack, isLoading } = useSelector((state) => state.files)

  const dispatch = useDispatch()

  const backClickHandler = () => {
    const backDirId = dirStack.pop()
    dispatch(setFiles([]))
    dispatch(setCurrentDir(backDirId))
  }

  return (
    <div className='file-list__wrapper'>
      {isLoading ? (
        <Preloader />
      ) : (
        <>
          <div className='file-list__header'>
            {currentDir && (
              <>
                <span>
                  {rootDirs.filter((dir) => dir._id === currentDir)[0]?.name || files[0]?.path.split('\\')[0]}
                </span>
                <button onClick={backClickHandler}>
                  <svg xmlns='http://www.w3.org/2000/svg' id='Bold' viewBox='0 0 24 24' width='512' height='512'>
                    <path d='M17.921,1.505a1.5,1.5,0,0,1-.44,1.06L9.809,10.237a2.5,2.5,0,0,0,0,3.536l7.662,7.662a1.5,1.5,0,0,1-2.121,2.121L7.688,15.9a5.506,5.506,0,0,1,0-7.779L15.36.444a1.5,1.5,0,0,1,2.561,1.061Z' />
                  </svg>
                </button>
              </>
            )}
          </div>
          <TransitionGroup className={'file-list'}>
            {files.map((file) => (
              <CSSTransition key={file._id} timeout={500} classNames={'file'} exit={false}>
                <File file={file} />
              </CSSTransition>
            ))}
          </TransitionGroup>
        </>
      )}
    </div>
  )
}

export default FileList
