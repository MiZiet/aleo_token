import ReactDOM from 'react-dom/client';
import App from './App.js';
import './index.css';
import {configureConnection} from '@puzzlehq/sdk';

(async () => {
  configureConnection({
    dAppName:'Build-A-Token-MiZiet-edit',
    dAppDescription:'Create and manage your own custom token.',
    dAppUrl:'http://localhost:5173/',
    dAppIconURL:'https://link.to/assets/your_logo.png'
  });
  return ReactDOM.createRoot(document.getElementById('root')!).render(
    <div className='h-screen w-screen'>
      <App />
    </div>
  );
})();
