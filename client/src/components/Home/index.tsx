
import { Card, Paper } from '@mui/material';
import finance from '../../assets/finances.png';
import Nav from '../Nav';
import './style.scss';
import Progress from '../Progress';
import axios from 'axios';
import { useEffect, useState } from 'react';
import { Budget } from '../../types/Budget';

const Home = ({ change }: { change: File }) => {
  const [budgets, setBudgets] = useState<[Budget, number][]>([]);

  useEffect(() => {
    axios.get('http://localhost:8000/budgets').then(d => setBudgets(d.data.budgets)).catch(e => console.log(e));
  }, [change]);

  return (
    <>
      <Nav title='Home' goHome={false} setPage={() => null} />
      <Paper className='tab' sx={{ boxShadow: 'none' }}>
        <div id='landing-container'>
          <img src={finance} id='landing-pic' alt='personal-finances' />
          <Card sx={{ boxShadow: 'none'}}>
            <p style={{ fontWeight: 900 }}>Welcome back!</p>
            <p style={{ fontSize: 12 }}>Yikes! Do you even know how to budget?</p>
          </Card>
        </div>
        {budgets.map(b => <Progress key={b[0].category} budget={b[0]} total={b[1]}  />)}
      </Paper>
    </>
  )
}

export default Home
