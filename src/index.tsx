import { Suspense } from 'react';
import ReactDOM from 'react-dom/client';

import App from './App';
import Toast from './components/Toast/Toast';

const rootDOM = document.getElementById('root');

if (rootDOM !== null) {
  const root = ReactDOM.createRoot(rootDOM);
  root.render(
    <Suspense fallback={<div style={{ padding: '2rem', textAlign: 'center' }}>Loading…</div>}>
      <App />
      <Toast />
    </Suspense>,
  );
}
