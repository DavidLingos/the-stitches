import { useAuthState } from 'react-firebase-hooks/auth';
import { useFirebase } from '../../context/firebase';
import { SidebarMenu } from '../SidebarMenu';

import './index.css';

export const Layout = ({ children }: React.PropsWithChildren<{}>) => {
  const { auth } = useFirebase();
  const [user, loading] = useAuthState(auth.auth);
  return (
    <div className="base-layout">
      <div className="base-sidebar">
        <SidebarMenu />
      </div>
      <div className="base-container">{children}</div>
    </div>
  );
};
