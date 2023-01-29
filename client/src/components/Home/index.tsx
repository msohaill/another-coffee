
import { Card, Paper } from '@mui/material';
import finance from '../../assets/finances.png';
import Nav from '../Nav';
import './style.scss';
import Progress from '../Progress';

const Home = () => {

  return (
    <>
      <Nav title='Home' goHome={false} />
      <Paper className='tab' sx={{ boxShadow: 'none' }}>
        <div id='landing-container'>
          <img src={finance} id='landing-pic' alt='personal-finances' />
          <Card sx={{ boxShadow: 'none'}}>
            <p style={{ fontWeight: 900 }}>Welcome back!</p>
            <p style={{ fontSize: 12 }}>Yikes! Do you even know how to budget?</p>
          </Card>
        </div>
        {['Total Budget', 'Grocery', 'Home', 'Dining', 'Entertainment', 'Transportation', 'Clothing', 'Health', 'Personal', 'Education', 'Gifts', 'Other'].map(n => <Progress key={n} category={n} />)}
      </Paper>
    </>
  )
}

export default Home
