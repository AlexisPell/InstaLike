import React, { useEffect } from 'react'
import { connect } from 'react-redux'
import { Link } from 'react-router-dom'
import { getProfile } from './../../actions/profile'
import { loadUser } from './../../actions/auth'
import { makeStyles, Typography, Box, Button } from '@material-ui/core'
import Loader from './../layouts/Loader'
import ProfileRouting from './../routing/ProfileRouting'
import ProfileInfo from './ProfileInfo'

const useStyles = makeStyles((theme) => ({
	root: {
		flexGrow: 1,
	},
	link: {
		textDecoration: 'none',
		color: theme.palette.secondary.main,
	},
	text: {
		lineHeight: '40px',
	},
}))

const MyProfile = ({
	getProfile,
	auth: { user },
	profile: { profile, loading },
}) => {
	const classes = useStyles()

	useEffect(() => {
		loadUser()
		getProfile()
		// eslint-disable-next-line
	}, [])

	return loading && profile && user === null ? (
		<Loader />
	) : (
		<div className={classes.root}>
			<ProfileRouting />
			{profile !== null ? (
				<ProfileInfo profile={profile} />
			) : (
				<Box my={3}>
					<Typography variant='h6' color='primary'>
						Welcome, {user && user.name}, create profile and become a part of
						our society
					</Typography>
					<Link to='/create-profile' className={classes.link}>
						<Button color='primary' variant='outlined'>
							Create profile
						</Button>
					</Link>
				</Box>
			)}
		</div>
	)
}

const mapStateToProps = (state) => ({
	auth: state.auth,
	profile: state.profile,
})

export default connect(mapStateToProps, { getProfile })(MyProfile)
