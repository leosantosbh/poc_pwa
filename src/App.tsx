import React from 'react';
import { Link } from 'react-router-dom';

function App() {
  return (
    <div className="select-method">
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
