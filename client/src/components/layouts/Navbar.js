import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import { connect } from 'react-redux'
import { logout } from './../../actions/auth'
import ExitToAppIcon from '@material-ui/icons/ExitToApp'
import HowToRegIcon from '@material-ui/icons/HowToReg'
import AccountCircle from '@material-ui/icons/AccountCircle'
import {
	AppBar,
	Toolbar,
	Typography,
	IconButton,
	Button,
	Menu,
	MenuItem,
	makeStyles,
} from '@material-ui/core'

const useStyles = makeStyles((theme) => ({
	root: {
		flexGrow: 1,
	},
	title: {
		flexGrow: 1,
	},
	link: {
		textDecoration: 'none',
		color: theme.palette.primary.main,
	},
	logoLink: {
		textDecoration: 'none',
		color: '#990c48',
	},
	button: {
		border: '1px solid rgba(0, 0, 0, 0.54)',
		color: theme.palette.secondary.main,
		marginRight: theme.spacing(1),
	},
}))

const Navbar = ({ logout, auth: { isAuthenticated, loading } }) => {
	const classes = useStyles()
	const [toggleMenu, setToggleMenu] = useState(null)
	const open = Boolean(toggleMenu)

	const handleMenu = (e) => {
		setToggleMenu(e.currentTarget)
	}

	const onToggle = () => {
		setToggleMenu(null)
	}

	const guestLinks = (
		<>
			<Link to='/tape' className={classes.link}>
				<Button variant='outlined' className={classes.button}>
					Posts
				</Button>
			</Link>

			<Link to='/login' className={classes.link}>
				<Button
					variant='outlined'
					className={classes.button}
					startIcon={<ExitToAppIcon />}
				>
					Log In
				</Button>
			</Link>
			<Link to='/register' className={classes.link}>
				<Button
					variant='outlined'
					className={classes.button}
					startIcon={<HowToRegIcon />}
				>
					Sign In
				</Button>
			</Link>
		</>
	)

	const authorisedLinks = (
		<>
			<IconButton
				aria-label='account of current user'
				aria-controls='menu-appbar'
				aria-haspopup='true'
				onClick={handleMenu}
				color='secondary'
			>
				<AccountCircle />
			</IconButton>
			<Menu
				id='menu-appbar'
				anchorEl={toggleMenu}
				anchorOrigin={{
					vertical: 'top',
					horizontal: 'right',
				}}
				keepMounted
				transformOrigin={{
					vertical: 'top',
					horizontal: 'right',
				}}
				open={open}
				onClose={onToggle}
			>
				<MenuItem onClick={onToggle}>
					<Link to='/my-profile' className={classes.link}>
						My profile
					</Link>
				</MenuItem>
				<MenuItem onClick={onToggle}>
					<Link to='/tape' className={classes.link}>
						Posts Tape
					</Link>
				</MenuItem>
				<MenuItem
					onClick={() => {
						onToggle()
						logout()
					}}
				>
					<Link to='/' className={classes.link}>
						Log out
					</Link>
				</MenuItem>
			</Menu>
		</>
	)

	return (
		<div className={classes.root}>
			<AppBar position='static'>
				<Toolbar>
					<Typography variant='h4' className={classes.title} color='secondary'>
						<Link to='/' className={classes.logoLink}>
							InstaLike
						</Link>
					</Typography>

					{!loading && <>{isAuthenticated ? authorisedLinks : guestLinks}</>}
				</Toolbar>
			</AppBar>
		</div>
	)
}

const mapStateToProps = (state) => ({
	auth: state.auth,
})

export default connect(mapStateToProps, { logout })(Navbar)
