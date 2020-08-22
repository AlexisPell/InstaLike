import React from 'react'
import { Link } from 'react-router-dom'
import { Button, makeStyles, Grid } from '@material-ui/core'

const useStyles = makeStyles((theme) => ({
	root: {
		flexGrow: 1,
		backgroundColor: theme.palette.secondary.main,
		borderRadius: '5px',
		padding: '10px',
		marginBottom: '25px',
	},
	link: {
		textDecoration: 'none',
		color: theme.palette.primary.main,
	},
	button: {
		color: theme.palette.primary.main,
		marginRight: theme.spacing(1),
	},
}))

const ProfileRouting = () => {
	const classes = useStyles()

	return (
		<Grid
			container
			item
			justify='space-around'
			className={classes.root}
			xs={12}
		>
			<Link to='/my-profile' className={classes.link}>
				<Button variant='outlined' className={classes.button} size='small'>
					My profile
				</Button>
			</Link>
			<Link to='/my-posts' className={classes.link}>
				<Button variant='outlined' className={classes.button} size='small'>
					My posts
				</Button>
			</Link>
			<Link to='/tape' className={classes.link}>
				<Button variant='outlined' className={classes.button} size='small'>
					Check all posts
				</Button>
			</Link>
		</Grid>
	)
}

export default ProfileRouting
