import { Timestamp } from 'firebase/firestore';

export interface StatisticsDocument {
  matchId: string;
  matchDate: Timestamp;
  matchPoints: number;
  matchResult: number;
  numPlayers: number;
}
