import React from 'react'
import { Route, Switch } from 'react-router-dom'
import { Grid, Container, Paper, makeStyles, useTheme } from '@material-ui/core'

import Alert from './components/layouts/Alert'
import Navbar from './components/layouts/Navbar'
import Landing from './components/pages/Landing'
import Tape from './components/pages/Tape'
import MyProfile from './components/profiles/MyProfile'
import Login from './components/auth/Login'
import Register from './components/auth/Register'

const useStyles = makeStyles((theme) => ({
	root: {
		height: '100vh',
	},
}))

const App = () => {
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
						<Route
							exact
							path='/myprofile'
							render={(props) => <MyProfile {...props} />}
						/>
					</Switch>
				</Grid>
			</Container>
		</Paper>
	)
}

export default App
