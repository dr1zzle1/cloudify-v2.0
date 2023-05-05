import { useDispatch, useSelector } from 'react-redux'

import { hideUploader } from '../../reducers/uploadReducer'
import UploadFile from './UploadFile'
import './Uploader.scss'

const Uploader = () => {
  const files = useSelector((state) => state.upload.files)
  const isVisible = useSelector((state) => state.upload.isVisible)
  const dispath = useDispatch()
  return (
    files.length !== 0 && (
      <div className={isVisible && files.length !== 0 ? 'uploader uploader-visible' : 'uploader uploader-unvisible'}>
        <div className={'uploader__header'}>
          <div className={'uploader__title'}>Downloads</div>
          <button className={'uploader__close'} onClick={() => dispath(hideUploader())}>
            X
          </button>
        </div>
        {files.map((file) => (
          <UploadFile key={file.id} file={file} />
        ))}
      </div>
    )
  )
}

export default Uploader
