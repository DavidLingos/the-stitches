import { FilteredMetadata } from 'boardgame.io';

interface WaitingForAllPlayersToConnectPanelProps {
  matchData?: FilteredMetadata;
}
export const WaitingForAllPlayersToConnectPanel: React.FC<WaitingForAllPlayersToConnectPanelProps> = ({ matchData }) => {
  return (
    <>
      Waiting for all players to join..
      {matchData && matchData.filter((i) => i.isConnected).map((i) => <p key={i.id}>{i.name}</p>)}
    </>
  );
};
