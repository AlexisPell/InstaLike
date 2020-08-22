import React, { useState } from 'react'
import { Redirect } from 'react-router-dom'
import { connect } from 'react-redux'
import { setAlert } from './../../actions/alert'
import { register } from './../../actions/auth'
import { Grid, TextField, makeStyles, Button } from '@material-ui/core'

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
}))

const Register = ({ setAlert, register, isAuthenticated }) => {
	const classes = useStyles()
	const { root, input, firstInput } = classes
	const [form, setForm] = useState({
		name: '',
		email: '',
		password: '',
		password2: '',
	})
	const { name, email, password, password2 } = form

	const onChange = (e) => {
		setForm({ ...form, [e.target.name]: e.target.value })
	}

	const onSubmit = (e) => {
		e.preventDefault()

		if (password !== password2 && password.length) {
			setAlert('Passwords do not match', 'warning')
		} else if (password.length < 6) {
			setAlert('Password should contain 6 or more chars', 'warning')
		} else if (name.length < 2) {
			setAlert('Single letter is not a name :p', 'warning')
		} else if (email.length < 5 && !email.includes('@')) {
			setAlert('email is invalid', 'error')
		} else {
			register({ name, email, password })
			setForm({ name: '', email: '', password: '', password2: '' })
		}
	}

	if (isAuthenticated === true) {
		setAlert('You have successfully registered!', 'success')
		return <Redirect to='/my-profile' />
	}

	return (
		<form className={root} noValidate autoComplete='off' onSubmit={onSubmit}>
			<Grid container direction='column' alignItems='center'>
				<TextField
					className={firstInput}
					name='name'
					value={name}
					onChange={onChange}
					label='Name'
					variant='outlined'
					helperText='Other users will not see you name. You may create nickname later'
				/>
				<TextField
					className={input}
					name='email'
					value={email}
					onChange={onChange}
					label='Email'
					type='email'
					variant='outlined'
				/>
				<TextField
					className={input}
					name='password'
					value={password}
					onChange={onChange}
					label='Password'
					type='password'
					autoComplete='current-password'
					variant='outlined'
				/>
				<TextField
					className={input}
					name='password2'
					value={password2}
					onChange={onChange}
					label='Password'
					type='password'
					autoComplete='current-password'
					variant='outlined'
				/>
				<Button type='submit' className={input}>
					Register
				</Button>
			</Grid>
		</form>
	)
}

const mapStateToProps = (state) => ({
	isAuthenticated: state.auth.isAuthenticated,
})

export default connect(mapStateToProps, { setAlert, register })(Register)
