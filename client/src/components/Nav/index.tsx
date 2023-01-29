import { ArrowBackIos } from '@mui/icons-material'
import './style.scss'

const Nav = ({ title, goHome }: { title: string, goHome: boolean }) => {
  return (
    <div className='navigation'>
      { goHome && <ArrowBackIos /> }
      <h2 style={{ fontWeight: 500 }}>{ title }</h2>
    </div>
  )
}

export default Nav
