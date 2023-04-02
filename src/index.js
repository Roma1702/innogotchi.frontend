import React, { createContext } from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import UserStore from './store/UserStore';
import FarmStore from './store/FarmStore';
import InnogotchiStore from './store/InnogotchiStore';

export const Context = createContext(null);

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <Context.Provider value={{
      user: new UserStore(),
      farm: new FarmStore(),
      innogotchi: new InnogotchiStore()
    }}>
      <App />
    </Context.Provider>
  </React.StrictMode>
);