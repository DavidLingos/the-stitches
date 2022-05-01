import { useState } from 'react';

export const WaitingForAllPlayersToConnectPanel = () => {
  const [isCoppiedToClipboardLabelVisible, setIsCoppiedToClipboardLabelVisible] = useState<boolean>(false);

  return (
    <div className="centerize-container">
      <p>Čekám na připojení všech hráčů.</p>
      Pro připojení hráče mu zašlete tento odkaz (kliknutím jej zkopírujete do schránky):
      <button
        className="btn btn-link"
        onClick={() => {
          navigator.clipboard.writeText(window.location.href);
          setIsCoppiedToClipboardLabelVisible(true);
          setTimeout(() => setIsCoppiedToClipboardLabelVisible(false), 3000);
        }}>
        {window.location.href}
      </button>
      {isCoppiedToClipboardLabelVisible && <>Odkaz zkopírován do schránky</>}
    </div>
  );
};
