export interface Gameover {
  playerPoints: {
    [k: string]: number;
  };
  playerResults: string[];
  matchDate: Date;
}
