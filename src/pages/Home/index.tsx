import { Link } from 'react-router-dom';

export const Home = () => {
  return (
    <div className="centerize-container">
      <h1>Štychy</h1>
      <br />
      <Link className="btn btn-success" to="new-game">
        Vytvoř novou hru
      </Link>
    </div>
  );
};
