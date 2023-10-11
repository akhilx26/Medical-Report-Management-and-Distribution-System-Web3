import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import { ChainId, ThirdwebProvider } from "@thirdweb-dev/react";

const root = ReactDOM.createRoot(document.getElementById('root'));
const activeChainId = ChainId.Goerli;

root.render(
  <ThirdwebProvider desiredChainId = {activeChainId}>
    <App />
  </ThirdwebProvider>
);
