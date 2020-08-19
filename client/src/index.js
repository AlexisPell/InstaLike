import React from 'react'
import { render } from 'react-dom'
import App from './App'
import { BrowserRouter as Router } from 'react-router-dom'

import { ThemeProvider } from '@material-ui/core'
import theme from './theme'
import { Provider } from 'react-redux'
import store from './store'

render(
	<Provider store={store}>
		<ThemeProvider theme={theme}>
			<Router>
				<App />
			</Router>
		</ThemeProvider>
	</Provider>,
	document.getElementById('root')
)
