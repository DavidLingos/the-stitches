import { SidebarMenu } from '../SidebarMenu';

import './index.css';

export const Layout = ({ children }: React.PropsWithChildren<{}>) => {
  return (
    <div className="base-layout">
      <div className="base-sidebar">
        <SidebarMenu />
      </div>
      <div className="base-container ps-4 pe-4 pt-2">{children}</div>
    </div>
  );
};
