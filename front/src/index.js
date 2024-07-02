import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App.jsx';
import './styles/index.css';
import { WalletProvider } from './contexts/WalletContext';

ReactDOM.createRoot(document.getElementById('root')).render(
	<React.StrictMode>
		<WalletProvider>
			<App />
		</WalletProvider>
	</React.StrictMode>,
);
