import LogoUB from '../assets/logoUB.png'
import LogoAremanest from '../assets/logoAremanest.webp'
import '../pages/Style.css'
import { useNavigate } from 'react-router-dom'

export default function Logos() {
  const navigate = useNavigate()

  return (
    <>
        <img src={LogoUB} width={70} height={70} className='mb-4 logo' onClick={() => navigate('/')}/>
        <img src={LogoAremanest} width={70} height={70} className='mb-4 logo' onClick={() => navigate('/')}/>
    </>
  )
}
