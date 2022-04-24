import { Link } from 'react-router-dom';

export const Home = () => {
  
  return <div>
    Toto jsou štychy!!!<br />
    <Link className='btn btn-success' to="new-game">Vytvoř novou hru</Link>
  </div>
}