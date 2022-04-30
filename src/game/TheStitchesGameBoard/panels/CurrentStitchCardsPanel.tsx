import { Ctx, PlayerID } from 'boardgame.io';
import { useEffect, useMemo, useState } from 'react';
import { GameState, PlayerCard } from '../../../interfaces';
import { getCardUrl } from '../../../utils/cards';

interface CurrentStitchCardsPanelProps {
  G: GameState;
  ctx: Ctx;
}

export const CurrentStitchCardsPanel: React.FC<CurrentStitchCardsPanelProps> = ({ G, ctx }) => {
  const [cardsToShow, setCardsToShow] = useState<{
    [key: PlayerID]: PlayerCard | null;
  }>({});

  useEffect(() => {
    if (Object.keys(G.currentStitchCards).filter((i) => G.currentStitchCards[i]).length === 0) {
      setTimeout(() => setCardsToShow(G.currentStitchCards), 5000);
    } else {
      setCardsToShow(G.currentStitchCards);
    }
  }, [G.currentStitchCards]);

  const cards = useMemo(() => {
    const result = [];
    const startIndex = ctx.playOrder.indexOf(G.stitchStartPlayer ?? '');
    for (let i = startIndex; i < startIndex + ctx.numPlayers; i++) {
      const card = cardsToShow[ctx.playOrder[i % ctx.numPlayers]];
      if (card) {
        result.push(<img width={100} src={getCardUrl(card)} />);
      }
    }
    return result;
  }, [ctx.playOrder, G.stitchStartPlayer, cardsToShow, ctx.numPlayers]);
  return <>{cards}</>;
};
