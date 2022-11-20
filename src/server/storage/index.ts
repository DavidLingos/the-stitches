import { Firestore } from 'bgio-firebase';
import { Server } from 'boardgame.io';

export class CustomFirestore extends Firestore {
  saveGameStatistics = async (
    matchId: string,
    players: {
      [id: number]: Server.PlayerMetadata;
    },
  ) => {
    const matchState = await this.db.doc(`bgio_state/${matchId}`).get();
    if (matchState.exists) {
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
              });
            }
          }
        }
      }
    }
  };
  async setMetadata(matchID: string, metadata: Server.MatchData): Promise<void> {
    await super.setMetadata(matchID, metadata);
    if (metadata.gameover) {
      await this.saveGameStatistics(matchID, metadata.players);
    }
  }
}
