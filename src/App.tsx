import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';

let deferredPrompt: any;

function App() {

  const [installable, setInstallable] = useState(false);

  useEffect(() => {
    window.addEventListener('beforeinstallprompt', (e) => {
      e.preventDefault();
      deferredPrompt = e;
      setInstallable(true);
    })

    window.addEventListener('appinstalled', () => {
      alert('app installed');
    })
  }, []);

  const handleInstall = () => {
    setInstallable(false);
    if (deferredPrompt && deferredPrompt.prompt) {
      deferredPrompt.prompt();
      deferredPrompt.userChoice.then();
    }
  }

  return (
    <div className="select-method">
      {installable && (
        <button className="install-button" onClick={handleInstall}>
          Add to Home Screen
        </button>
      )}
      <Link to="/online">
        <div className="select-method-on">Online</div>
      </Link>
      <Link to="/offline">
        <div className="select-method-off">Offline</div>
      </Link>
    </div>
  );
}

export default App;
