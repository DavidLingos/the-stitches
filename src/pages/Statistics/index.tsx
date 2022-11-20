import { useQuery } from '@tanstack/react-query';
import { collection, getDocs, query, where } from 'firebase/firestore';
import { Link } from 'react-router-dom';
import { useFirebase } from '../../context/firebase';
import { StatisticsDocument } from '../../interfaces';

export const Statistics = () => {
  const { db, auth } = useFirebase();
  const matches = useQuery<StatisticsDocument[], Error>(
    ['userStatistics'],
    async () => {
      const result: StatisticsDocument[] = [];
      const user = await getDocs(query(collection(db, 'users'), where('uid', '==', auth.user?.uid)));
      if (user.size) {
        const userStatistics = await getDocs(query(collection(db, 'users', user.docs[0].id, 'statistics')));
        for (const doc of userStatistics.docs) {
          result.push(doc.data() as StatisticsDocument);
        }
        return result;
      }
      return result;
    },
    {
      enabled: auth.user?.uid !== undefined,
    },
  );

  return (
    <>
      <h1>Statistiky</h1>
      {matches.data
        ?.sort((a, b) => (a.matchDate.seconds < b.matchDate.seconds ? 1 : -1))
        .map((i) => (
          <p>
            Datum: ({i.matchDate.toDate().toLocaleDateString()}), Umístění: {i.matchResult}., Počet hráču: {i.numPlayers}, Počet bodů:{' '}
            {i.matchPoints}
            <Link to={`/game/${i.matchId}`} className="ms-2">
              Zobrazit detail
            </Link>
          </p>
        ))}
    </>
  );
};
