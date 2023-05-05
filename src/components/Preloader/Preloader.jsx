import preloader from '../../assets/spinner.gif'
import './Preloader.scss'

let Preloader = () => {
  return <img className={'preloader'} src={preloader} alt='' />
}

export default Preloader
