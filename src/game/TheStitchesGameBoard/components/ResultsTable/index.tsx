import { FilteredMetadata } from 'boardgame.io';
import { useTheStitchesGame } from '../..';
import { GameState } from '../../../../interfaces';

import './index.css';

export interface ResultsTableProps {
  G: GameState;
  matchData?: FilteredMetadata;
}

export const ResultsTable: React.FC<ResultsTableProps> = ({ G, matchData }) => {
  return (
    <div className="result-list">
      <h2>Skóre</h2>
      <div className="table-responzive text-center">
        <table className="table table-bordered">
          <thead>
            <tr>
              <th scope="col">#</th>
              {matchData?.map((i) => (
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
                {matchData?.map((i) => (
                  <td key={i.id}>{G.points.length > idx && G.points[idx][i.id]}</td>
                ))}
              </tr>
            ))}
          </tbody>
          <tfoot>
            <tr>
              <td>Součet</td>
              {matchData?.map((i) => (
                <td>{G.points.reduce((n, item) => n + item[i.id], 0)}</td>
              ))}
            </tr>
          </tfoot>
        </table>
      </div>
    </div>
  );
};
