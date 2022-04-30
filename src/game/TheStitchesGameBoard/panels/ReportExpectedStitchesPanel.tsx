import { Ctx, PlayerID } from 'boardgame.io';
import { useState } from 'react';
import { GameState } from '../../../interfaces';

interface ReportExpectedStitchesPanelProps {
  G: GameState;
  moves: Record<string, (...args: any[]) => void>;
  ctx: Ctx;
}

const getExpectedStitchesSum = (expectedStitchesCount: { [key: PlayerID]: number | null }) => {
  let result = 0;
  Object.keys(expectedStitchesCount).forEach((i) => (result += expectedStitchesCount[i] ?? 0));
  return result;
};

export const ReportExpectedStitchesPanel: React.FC<ReportExpectedStitchesPanelProps> = ({ G, moves, ctx }) => {
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
    if (
      Object.keys(G.expectedStitchesCount).filter((x) => x !== null).length === ctx.numPlayers - 1 &&
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
    <>
      Zadej počet štychů
      <input type="number" onChange={(e) => setExpectedStitches(Number(e.target.value))} />
      <button onClick={onConfirm}>Confirm</button>
    </>
  );
};
