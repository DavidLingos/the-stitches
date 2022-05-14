import { Ctx, FilteredMetadata } from 'boardgame.io';
import { ProSidebar, SidebarFooter } from 'react-pro-sidebar';
import { GameState } from '../../../../interfaces';
import { GameStatusPanel } from '../GameStatusPanel';

import 'react-pro-sidebar/dist/css/styles.css';
import { useState } from 'react';

export const SidebarPanel = () => {
  const [isCollapsed, setIsCollapsed] = useState<boolean>(false);
  return (
    <ProSidebar width={500} collapsed={isCollapsed}>
      <GameStatusPanel />
      <SidebarFooter>
        <span onClick={() => setIsCollapsed(!isCollapsed)}>{isCollapsed ? '>>' : '<<'}</span>
      </SidebarFooter>
    </ProSidebar>
  );
};
