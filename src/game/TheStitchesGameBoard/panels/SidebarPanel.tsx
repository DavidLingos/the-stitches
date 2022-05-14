import { Ctx, FilteredMetadata } from 'boardgame.io';
import { ProSidebar, SidebarFooter } from 'react-pro-sidebar';
import { GameState } from '../../../interfaces';
import { GameStatusPanel } from './GameStatusPanel';

import 'react-pro-sidebar/dist/css/styles.css';
import { useState } from 'react';

interface SidebarPanelProps {
  matchData: FilteredMetadata;
  G: GameState;
  ctx: Ctx;
}

export const SidebarPanel: React.FC<SidebarPanelProps> = ({ matchData, G, ctx }) => {
  const [isCollapsed, setIsCollapsed] = useState<boolean>(false);
  return (
    <ProSidebar width={500} collapsed={isCollapsed}>
      <GameStatusPanel matchData={matchData} G={G} ctx={ctx} />
      <SidebarFooter>
        <span onClick={() => setIsCollapsed(!isCollapsed)}>{isCollapsed ? '>>' : '<<'}</span>
      </SidebarFooter>
    </ProSidebar>
  );
};
