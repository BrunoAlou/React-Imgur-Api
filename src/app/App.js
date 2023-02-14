import React, { Suspense } from 'react';
import { BrowserRouter } from 'react-router-dom';

import LinearProgress from '@material-ui/core/LinearProgress';
import { MuiThemeProvider } from '@material-ui/core';
import { createTheme } from '@material-ui/core/styles'

import './App.scss';
import AppRouter from './AppRouter';

const theme = createTheme({
	palette: {
		primary: {
			main: '#38805b',
			contrastText: '#ffffff'
		},
		secondary: {
			main: '#e01840',
			contrastText: '#ffffff'
		},
		error: {
			main: '#e74c3c'
		}
	}
});

const appStyles = {
	linearProgress: {
		backgroundColor: 'var(--c1)'
	}
};

const App = () => {
	return (
		<section className="ig-app-root">
			<MuiThemeProvider theme={theme}>
				<Suspense fallback={(<LinearProgress style={appStyles.linearProgress} />)}>
					<BrowserRouter>
						<AppRouter />
					</BrowserRouter>
				</Suspense>
			</MuiThemeProvider>
		</section>
	);
};
export default App;
