import * as React from 'react';
import NxWelcome from './nx-welcome';
import { Link, Route, Routes } from 'react-router-dom';

const Footer = React.lazy(() => import('footer/Module'));

const Header = React.lazy(() => import('header/Module'));

export function App() {
  return (
    <React.Suspense fallback={null}>
      <ul>
        <li>
          <Link to="/">Home</Link>
        </li>
        <li>
          <Link to="/footer">Footer</Link>
        </li>
        <li>
          <Link to="/header">Header</Link>
        </li>
      </ul>
      <Routes>
        <Route path="/" element={<NxWelcome title="host" />} />
        <Route path="/footer" element={<Footer />} />
        <Route path="/header" element={<Header />} />
      </Routes>
    </React.Suspense>
  );
}

export default App;
