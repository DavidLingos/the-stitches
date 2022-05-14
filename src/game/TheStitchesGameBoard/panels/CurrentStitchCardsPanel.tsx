import { Ctx } from 'boardgame.io';
import { useMemo } from 'react';
import { GameState } from '../../../interfaces';
import { PlayingCard } from '../components/PlayingCard';

interface CurrentStitchCardsPanelProps {
  G: GameState;
  ctx: Ctx;
}

export const CurrentStitchCardsPanel: React.FC<CurrentStitchCardsPanelProps> = ({ G, ctx }) => {
  const cards = useMemo(() => {
    const result = [];
    const startIndex = ctx.playOrder.indexOf(G.stitchStartPlayer ?? '');
    for (let i = startIndex; i < startIndex + ctx.numPlayers; i++) {
      const card = G.currentStitchCards[ctx.playOrder[i % ctx.numPlayers]];
      if (card) {
        result.push(<PlayingCard card={card} />);
      }
    }
    return result;
  }, [ctx.playOrder, G.currentStitchCards, ctx.numPlayers, G.stitchStartPlayer]);
  return <>{cards}</>;
};
