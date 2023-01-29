import { ArrowBackIos } from '@mui/icons-material'
import './style.scss'

const Nav = ({ title, goHome, setPage }: { title: string, goHome: boolean, setPage: React.Dispatch<React.SetStateAction<string>> }) => {
  return (
    <div className='navigation'>
      { goHome && <ArrowBackIos sx={{ cursor: 'pointer' }} onClick={() => setPage('Home')}/> }
      <h2 style={{ fontWeight: 500 }}>{ title }</h2>
    </div>
  )
}

export default Nav
