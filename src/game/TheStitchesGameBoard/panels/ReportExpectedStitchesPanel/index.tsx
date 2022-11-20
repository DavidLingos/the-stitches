import { PlayerID } from 'boardgame.io';
import { useState } from 'react';
import { useTheStitchesGame } from '../..';

const getExpectedStitchesSum = (expectedStitchesCount: { [key: PlayerID]: number | null }) => {
  let result = 0;
  Object.keys(expectedStitchesCount).forEach((i) => (result += expectedStitchesCount[i] ?? 0));
  return result;
};

export const ReportExpectedStitchesPanel = () => {
  const {
    board: { G, ctx, moves },
  } = useTheStitchesGame();
  const [expectedStitches, setExpectedStitches] = useState<number>();
  const onConfirm = () => {
    if (expectedStitches === undefined) {
      alert('Zadej počet štychů');
      return;
    }
    if (expectedStitches > G.numberOfRounds - G.currentRound + 1) {
      alert('Nesmíš zadat víc štychů než je karet');
      return;
    }

    if (expectedStitches < 0) {
      alert('Nesmíš zadat záporný počet štychů');
      return;
    }
    if (
      Object.keys(G.expectedStitchesCount).filter((x) => G.expectedStitchesCount[x] !== null).length === ctx.numPlayers - 1 &&
      getExpectedStitchesSum(G.expectedStitchesCount) + expectedStitches === G.numberOfRounds - G.currentRound + 1
    ) {
      alert('Počet štychů se nesmí rovnat počtu karet.');
      return;
    }

    const move = moves['reportExpectedStitchesCount'];
    if (move) {
      move(expectedStitches);
    }
  };
  return (
    <div className="report-expected-stitches">
      Zadej počet štychů
      <input type="number" onChange={(e) => setExpectedStitches(Number(e.target.value))} min="0" defaultValue="0" />
      <button onClick={onConfirm}>Potvrdit</button>
    </div>
  );
};
