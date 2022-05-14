import { useMemo } from 'react';
import { useTheStitchesGame } from '../..';
import { PlayingCard } from '../../components/PlayingCard';

export const CurrentStitchCardsPanel = () => {
  const {
    board: { G, ctx },
  } = useTheStitchesGame();

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
