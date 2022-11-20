import { useQuery } from '@tanstack/react-query';
import { collection, getDocs, query, where } from 'firebase/firestore';
import { Link } from 'react-router-dom';
import { useFirebase } from '../../context/firebase';

interface StatisticsDocument {
  matchId: string;
}

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
      {matches.data?.map((i) => (
        <Link to={`/game/${i.matchId}`} className="d-block">
          {i.matchId}
        </Link>
      ))}
      ;
    </>
  );
};
