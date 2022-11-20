import React from 'react';

import { useQuery } from '@tanstack/react-query';
import { FilteredMetadata } from 'boardgame.io';
import { doc, getDoc } from 'firebase/firestore';
import { useParams } from 'react-router';
import { useFirebase } from '../../../context/firebase';
import { ResultsTable } from '../../../game/TheStitchesGameBoard/components/ResultsTable';
import { GameState } from '../../../interfaces';

export const GameResult = () => {
  const { db } = useFirebase();
  const params = useParams();
  const matchId = params.matchId ?? '';
  const data = useQuery<{ gameState: GameState; matchData: FilteredMetadata }, Error>(['gameState', matchId], async () => {
    const state = await getDoc(doc(db, 'bgio_state', matchId));
    const metadata = await getDoc(doc(db, 'bgio_metadata', matchId));
    const players = metadata.get('players');
    return {
      gameState: state.get('G'),
      matchData: Object.keys(players).map((i) => ({
        id: players[i].id,
        name: players[i].name,
      })),
    };
  });

  return data.data?.gameState && data.data?.matchData ? <ResultsTable G={data.data.gameState} matchData={data.data.matchData} /> : null;
};
