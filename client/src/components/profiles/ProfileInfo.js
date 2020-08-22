import React from 'react'
import { Link } from 'react-router-dom'
import {
	makeStyles,
	Table,
	TableBody,
	TableCell,
	TableContainer,
	TableHead,
	TableRow,
	Paper,
	Typography,
	Button,
} from '@material-ui/core'

const useStyles = makeStyles((theme) => ({
	table: {
		maxWidth: 700,
		margin: '0 auto',
		marginTop: '25px',
	},
	textHeader: { fontSize: '24px' },
	link: {
		textDecoration: 'none',
		color: theme.palette.secondary.main,
	},
}))

const ProfileInfo = ({
	profile: {
		nickname,
		avatar,
		status,
		city,
		age,
		bio,
		social: { twitter, facebook, instagram, vk },
	},
}) => {
	const classes = useStyles()
	const { table, textHeader, link } = classes

	return (
		<TableContainer component={Paper}>
			<Table className={table} aria-label='spanning table'>
				<TableHead>
					<TableRow>
						<TableCell align='center' colSpan={3}>
							<span className={textHeader}>
								Welcome,{' '}
								<Typography variant='h6' color='primary'>
									{nickname}
								</Typography>
							</span>
						</TableCell>
						<TableCell align='right' colSpan={3}>
							<Link to='create-profile' className={link}>
								<Button color='primary' variant='outlined'>
									Update profile
								</Button>
							</Link>
						</TableCell>
					</TableRow>
					<TableRow>
						<TableCell>
							<Typography variant='h6' color='primary'>
								My profile information:
							</Typography>
						</TableCell>
					</TableRow>
				</TableHead>
				<TableBody>
					<TableRow>
						<TableCell>Status:</TableCell>
						<TableCell align='left'>{status}</TableCell>
					</TableRow>
					<TableRow>
						<TableCell>City:</TableCell>
						<TableCell align='left'>{city}</TableCell>
					</TableRow>
					<TableRow>
						<TableCell>Age:</TableCell>
						<TableCell align='left'>{age}</TableCell>
					</TableRow>
					<TableRow>
						<TableCell>Bio:</TableCell>
						<TableCell align='left'>{bio}</TableCell>
					</TableRow>
					<TableRow>
						<TableCell align='center'>
							<Typography variant='h6' color='primary'>
								My Social Networks:
							</Typography>
						</TableCell>
					</TableRow>
					<TableRow>
						<TableCell>Twitter:</TableCell>
						<TableCell align='left'>{twitter}</TableCell>
					</TableRow>
					<TableRow>
						<TableCell>Facebook:</TableCell>
						<TableCell align='left'>{facebook}</TableCell>
					</TableRow>
					<TableRow>
						<TableCell>Instagram:</TableCell>
						<TableCell align='left'>{instagram}</TableCell>
					</TableRow>
					<TableRow>
						<TableCell>Vk:</TableCell>
						<TableCell align='left'>{vk}</TableCell>
					</TableRow>
				</TableBody>
			</Table>
		</TableContainer>
	)
}

export default ProfileInfo
