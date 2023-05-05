import sizeFormat from '../../utils/sizeFormat'
import './Header.scss'

const Header = ({ showPopupHandler, fileUploadHandler, currentUser }) => {
  return (
    <div className='disk__header header'>
      <div className='header__btns'>
        <button className='header__add-folder' onClick={showPopupHandler}>
          <svg
            id='Layer_1'
            height='512'
            viewBox='0 0 24 24'
            width='512'
            xmlns='http://www.w3.org/2000/svg'
            data-name='Layer 1'
          >
            <path d='m0 7v-3a3 3 0 0 1 3-3h5.236l4 2h8.764a3 3 0 0 1 3 3v1zm24 2v14h-24v-14zm-8 6h-3v-3h-2v3h-3v2h3v3h2v-3h3z' />
          </svg>
        </button>
        <input multiple onChange={(event) => fileUploadHandler(event)} type='file' id='diskUploadInput' />
        <label htmlFor='diskUploadInput' className='header__btn'>
          <svg id='Layer_1' height='512' viewBox='0 0 24 24' width='512' data-name='Layer 1' fill={'#583da1'}>
            <path d='m12 0a12 12 0 1 0 12 12 12.013 12.013 0 0 0 -12-12zm4 13h-3v3a1 1 0 0 1 -2 0v-3h-3a1 1 0 0 1 0-2h3v-3a1 1 0 0 1 2 0v3h3a1 1 0 0 1 0 2z' />
          </svg>
          Add File
        </label>
      </div>
      <div className='header__info'>
        <div className='header__info-memory'>
          <span>
            {sizeFormat(currentUser.usedSpace)} / {sizeFormat(currentUser.diskSpace)}
          </span>
          Storage Used
        </div>
      </div>
    </div>
  )
}

export default Header
