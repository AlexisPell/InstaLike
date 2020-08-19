import React, { useState } from 'react'
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
import { Link } from 'react-router-dom'

const useStyles = makeStyles((theme) => ({
	root: {
		flexGrow: 1,
	},
	title: {
		flexGrow: 1,
	},
	link: {
		textDecoration: 'none',
		color: theme.palette.secondary.main,
	},
	button: {
		border: '1px solid rgba(0, 0, 0, 0.54)',
		color: theme.palette.secondary.main,
		marginRight: theme.spacing(2),
	},
}))

const Navbar = () => {
	const classes = useStyles()
	const [toggleMenu, setToggleMenu] = useState(null)
	const open = Boolean(toggleMenu)

	const handleMenu = (e) => {
		setToggleMenu(e.currentTarget)
	}

	const onToggle = () => {
		setToggleMenu(null)
	}

	return (
		<div className={classes.root}>
			<AppBar position='static'>
				<Toolbar>
					<Typography variant='h4' className={classes.title} color='secondary'>
						<Link to='/' className={classes.link}>
							InstaLike
						</Link>
					</Typography>

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
							<Link to='/myprofile' className={classes.link}>
								My profile
							</Link>
						</MenuItem>
						<MenuItem onClick={onToggle}>
							<Link to='/tape' className={classes.link}>
								Posts Tape
							</Link>
						</MenuItem>
					</Menu>
				</Toolbar>
			</AppBar>
		</div>
	)
}

export default Navbar
