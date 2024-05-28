import LogoUB from '../assets/logoUB.png'
import LogoAremanest from '../assets/logoAremanest.webp'
import '../pages/Style.css'

export default function Logos() {
  return (
    <>
        <img src={LogoUB} width={70} height={70} className='mb-4 logo'/>
        <img src={LogoAremanest} width={70} height={70} className='mb-4 logo'/>
    </>
  )
}
