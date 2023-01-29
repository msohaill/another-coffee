import { Card, Paper } from '@mui/material'
import Nav from '../Nav'

const Insights = ({ setPage }: { setPage: React.Dispatch<React.SetStateAction<string>> }) => {
  return (
    <>
    <Nav title='Insights' goHome setPage={setPage}/>
    <Paper className='tab' sx={{ boxShadow: 'none' }}>
      <div id='landing-container'>
        {/* <img src={finance} id='landing-pic' alt='personal-finances' /> */}
        <Card sx={{ boxShadow: 'none'}}>
          <p style={{ fontWeight: 900 }}>Welcome back!</p>
          <p style={{ fontSize: 12 }}>Yikes! Do you even know how to budget?</p>
        </Card>
      </div>
    </Paper>
  </>
  )
}

export default Insights
