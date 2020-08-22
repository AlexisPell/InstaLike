import React, { useState, useEffect } from 'react'
import { connect } from 'react-redux'
import { setAlert } from './../../actions/alert'
import { Link } from 'react-router-dom'
import { createProfile, getProfile } from './../../actions/profile'
import {
	Grid,
	TextField,
	makeStyles,
	Button,
	Typography,
	Box,
} from '@material-ui/core'
import FacebookIcon from '@material-ui/icons/Facebook'
import TwitterIcon from '@material-ui/icons/Twitter'
import InstagramIcon from '@material-ui/icons/Instagram'
import ProfileRouting from './../routing/ProfileRouting'

const useStyles = makeStyles((theme) => ({
	root: {
		width: '100%',
	},
	input: {
		width: '66%',
		marginTop: theme.spacing(1),
		marginBottom: theme.spacing(1),
	},
	firstInput: {
		width: '66%',
		marginTop: theme.spacing(4),
		marginBottom: theme.spacing(1),
	},
	socialBlock: { width: '66%' },
	icon: { height: '55px', marginRight: '10px' },
	vkIcon: {
		height: '55px',
		margin: '18px 12px 0 3px',
		display: 'inline-block',
	},
	socialInput: { width: '90%' },
}))

const CreateProfile = ({ setAlert, createProfile, profile: { profile } }) => {
	useEffect(() => {
		getProfile()

		const updateProfile = {}
		if (profile !== null && profile !== undefined && profile.nickname)
			updateProfile.nickname = profile.nickname
		if (profile !== null && profile !== undefined && profile.status)
			updateProfile.status = profile.status
		if (profile !== null && profile !== undefined && profile.age)
			updateProfile.age = profile.age
		if (profile !== null && profile !== undefined && profile.city)
			updateProfile.city = profile.city
		if (profile !== null && profile !== undefined && profile.bio)
			updateProfile.bio = profile.bio
		if (profile !== null && profile !== undefined && profile.social.twitter)
			updateProfile.twitter = profile.social.twitter
		if (profile !== null && profile !== undefined && profile.social.facebook)
			updateProfile.facebook = profile.social.facebook
		if (profile !== null && profile !== undefined && profile.social.instagram)
			updateProfile.instagram = profile.social.instagram
		if (profile !== null && profile !== undefined && profile.social.vk)
			updateProfile.vk = profile.social.vk

		if (profile) setForm(updateProfile)
	}, [])

	const classes = useStyles()
	const {
		root,
		input,
		firstInput,
		socialBlock,
		icon,
		socialInput,
		vkIcon,
	} = classes

	const [toggleLinks, setToggleLinks] = useState(false)
	const [form, setForm] = useState({
		nickname: '',
		status: '',
		age: '',
		city: '',
		bio: '',
		twitter: '',
		facebook: '',
		instagram: '',
		vk: '',
	})
	const {
		nickname,
		status,
		age,
		city,
		bio,
		twitter,
		facebook,
		instagram,
		vk,
	} = form

	const onChange = (e) => {
		setForm({
			...form,
			[e.target.name]: e.target.value,
			social: { [e.target.name]: e.target.value },
		})
	}

	const onToggleLinks = () => setToggleLinks(!toggleLinks)

	const onSubmit = (e) => {
		e.preventDefault()

		if (nickname.length < 6) {
			setAlert('Nickname must contain 6 or more signs', 'warning')
		} else if (status.length === 0) {
			setAlert('We are greeting some short statuses:)', 'info')
		} else if (!age) {
			setAlert('age is required', 'warning')
		} else if (city.length < 2) {
			setAlert('We want to communicate people using geography :)', 'warning')
		} else {
			createProfile(form)
			setAlert('Profile succed', 'success')
		}
	}

	return (
		<>
			<ProfileRouting />
			<form className={root} noValidate autoComplete='off' onSubmit={onSubmit}>
				<Grid container direction='column' alignItems='center'>
					{profile === null ? (
						<Typography color='primary' variant='h6'>
							Create your profile here
						</Typography>
					) : (
						<Typography color='primary' variant='h6'>
							Update your profile
						</Typography>
					)}
					<TextField
						className={firstInput}
						variant='outlined'
						label='Nickname'
						required
						name='nickname'
						value={nickname}
						onChange={onChange}
					/>
					<TextField
						className={input}
						variant='outlined'
						label='Status'
						required
						name='status'
						value={status}
						onChange={onChange}
					/>
					<TextField
						className={input}
						variant='outlined'
						label='Age'
						type='number'
						required
						name='age'
						value={age}
						onChange={onChange}
					/>
					<TextField
						className={input}
						variant='outlined'
						label='City'
						required
						name='city'
						value={city}
						onChange={onChange}
					/>
					<TextField
						className={input}
						name='bio'
						value={bio}
						onChange={onChange}
						label='Some short bio about yourself'
						variant='outlined'
						multiline
						rows={3}
					/>

					<Box mt={2}>
						<Button onClick={onToggleLinks} variant='outlined'>
							Social networks
						</Button>
					</Box>

					{toggleLinks ? (
						<div className={socialBlock}>
							<Box mt={2}>
								<TwitterIcon className={icon} />
								<TextField
									className={socialInput}
									name='twitter'
									value={twitter}
									onChange={onChange}
									label='Twitter'
									variant='outlined'
								/>
							</Box>
							<Box my={1}>
								<FacebookIcon className={icon} />
								<TextField
									className={socialInput}
									name='facebook'
									value={facebook}
									onChange={onChange}
									label='Facebook'
									variant='outlined'
								/>
							</Box>
							<Box my={1}>
								<InstagramIcon className={icon} />
								<TextField
									className={socialInput}
									name='instagram'
									value={instagram}
									onChange={onChange}
									label='Instagram'
									variant='outlined'
								/>
							</Box>
							<Box my={1}>
								<div className={vkIcon}>
									<i className='fab fa-vk'></i>
								</div>
								<TextField
									className={socialInput}
									name='vk'
									value={vk}
									onChange={onChange}
									label='Vk'
									variant='outlined'
								/>
							</Box>
						</div>
					) : null}

					<Box my={5}>
						<Box m={2} component='span'>
							<Button type='submit' variant='contained' color='primary'>
								Accept changes
							</Button>
						</Box>
						<Box m={2} component='span'>
							<Link to='my-profile'>
								<Button variant='contained' color='secondary'>
									Cancel
								</Button>
							</Link>
						</Box>
					</Box>
				</Grid>
			</form>
		</>
	)
}

const mapStateToProps = (state) => ({
	profile: state.profile,
})

export default connect(mapStateToProps, {
	setAlert,
	createProfile,
	getProfile,
})(CreateProfile)
