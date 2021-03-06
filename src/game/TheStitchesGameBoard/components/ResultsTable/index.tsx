import { FilteredMetadata } from 'boardgame.io';
import { GameState } from '../../../../interfaces';

interface ResultsTableProps {
  matchData: FilteredMetadata;
  G: GameState;
}

export const ResultsTable: React.FC<ResultsTableProps> = ({ matchData, G }) => {
  return (
    <>
      <h2>Výsledková listina</h2>
      <div className="table-responzive text-center">
        <table className="table table-bordered">
          <thead>
            <tr>
              <th scope="col">#</th>
              {matchData.map((i) => (
                <th key={i.id} scope="col">
                  {i.name}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {[...Array(G.numberOfRounds)].map((i, idx) => (
              <tr>
                <th scope="row">{G.numberOfRounds - idx}</th>
                {G.points.length > idx
                  ? matchData.map((i) => <td key={i.id}>{G.points[idx][i.id]}</td>)
                  : matchData.map((i) => <td key={i.id}>-</td>)}
              </tr>
            ))}
          </tbody>
          <tfoot>
            <tr>
              <td>Součet</td>
              {matchData.map((i) => (
                <td>{G.points.reduce((n, item) => n + item[i.id], 0)}</td>
              ))}
            </tr>
          </tfoot>
        </table>
      </div>
    </>
  );
};
