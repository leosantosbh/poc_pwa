import {
  BrowserRouter,
  Routes,
  Route
} from "react-router-dom";
import App from './App';
import Online from './online';
import Offline from './offline';
// import your route components too

export const AppRouter = () => (
  <BrowserRouter>
    <Routes>
      <Route path="/" element={<App />} />
      <Route path="online" element={<Online />} />
      <Route path="offline" element={<Offline />} />
    </Routes>
  </BrowserRouter>
)