import React, { useEffect } from 'react'
import { Route, Switch } from 'react-router-dom'
import { Grid, Container, Paper, makeStyles, useTheme } from '@material-ui/core'

// User session
import { loadUser } from './actions/auth'
import store from './store'

import PrivateRoute from './components/routing/PrivateRoute'
import Alert from './components/layouts/Alert'
import Navbar from './components/layouts/Navbar'
import Landing from './components/pages/Landing'
import Login from './components/auth/Login'
import Register from './components/auth/Register'
import Tape from './components/pages/Tape'
import MyProfile from './components/profiles/MyProfile'

const useStyles = makeStyles((theme) => ({
	root: {
		height: '100vh',
	},
}))

const App = () => {
	useEffect(() => {
		store.dispatch(loadUser())
	}, [])

	const classes = useStyles()
	//eslint-disable-next-line
	const theme = useTheme()

	return (
		<Paper className={classes.root}>
			<Navbar />
			<Container maxWidth='md'>
				<Alert />
				<Grid container item xs={12}>
					<Route exact path='/' render={(props) => <Landing {...props} />} />
					<Switch>
						<Route
							exact
							path='/login'
							render={(props) => <Login {...props} />}
						/>
						<Route
							exact
							path='/register'
							render={(props) => <Register {...props} />}
						/>
						<Route exact path='/tape' render={(props) => <Tape {...props} />} />
						<PrivateRoute exact path='/myprofile' component={MyProfile} />
					</Switch>
				</Grid>
			</Container>
		</Paper>
	)
}

export default App
