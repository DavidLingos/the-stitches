import { Firestore } from 'bgio-firebase';
import { PlayerID, Server } from 'boardgame.io';
import { Gameover } from '../../interfaces';

export class CustomFirestore extends Firestore {
  saveGameStatistics = async (
    matchId: string,
    players: {
      [id: number]: Server.PlayerMetadata;
    },
    gameover: Gameover,
  ) => {
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
              matchDate: gameover.matchDate,
              matchPoints: gameover.playerPoints[key],
              matchResult: gameover.playerResults.indexOf(key) + 1,
              numPlayers: Object.keys(players).length,
            });
          }
        }
      }
    }
  };
  async setMetadata(matchID: string, metadata: Server.MatchData): Promise<void> {
    await super.setMetadata(matchID, metadata);
    if (metadata.gameover) {
      await this.saveGameStatistics(matchID, metadata.players, metadata.gameover);
    }
  }
}
