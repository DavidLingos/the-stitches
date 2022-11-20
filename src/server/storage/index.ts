import { Firestore } from 'bgio-firebase';
import { PlayerID, Server } from 'boardgame.io';

export class CustomFirestore extends Firestore {
  saveGameStatistics = async (
    matchId: string,
    players: {
      [id: number]: Server.PlayerMetadata;
    },
  ) => {
    const matchState = await this.db.doc(`bgio_state/${matchId}`).get();
    const matchPoints = matchState.get('G.points') as {
      [playerKey: PlayerID]: number;
    }[];
    const playerPoints = Object.fromEntries(Object.keys(players).map((i) => [i, matchPoints.reduce((n, item) => n + item[i], 0)]));
    const playerResults = Object.keys(playerPoints).sort((a, b) => (playerPoints[a] < playerPoints[b] ? -1 : 1));

    if (matchState.exists) {
      const matchDate = new Date();
      for (const key in players) {
        const player = players[key];
        if (player.data?.userUid) {
          const user = await this.db.collection('users').where('uid', '==', player.data.userUid).get();
          if (user.size) {
            const userStatistics = this.db.collection(`users/${user.docs[0].id}/statistics`);
            const matchUserStatistics = await userStatistics.where('matchId', '==', matchId).get();
            if (matchUserStatistics.empty) {
              await userStatistics.add({
                matchId: matchId,
                matchDate: matchDate,
                matchPoints: playerPoints[key],
                matchResult: playerResults.indexOf(key) + 1,
              });
            }
          }
        }
      }
    }
  };
  async setMetadata(matchID: string, metadata: Server.MatchData): Promise<void> {
    await super.setMetadata(matchID, metadata);
    await this.saveGameStatistics(matchID, metadata.players);
    if (metadata.gameover) {
      await this.saveGameStatistics(matchID, metadata.players);
    }
  }
}
