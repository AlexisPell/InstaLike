import React, { useState } from 'react'
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

const Register = () => {
	const classes = useStyles()
	const { root, input, firstInput } = classes
	const [form, setForm] = useState({
		email: '',
		password: '',
	})
	const { email, password } = form

	const onChange = (e) => {
		setForm({ ...form, [e.target.name]: e.target.value })
	}

	const onSubmit = (e) => {
		e.preventDefault()
		// Do it lil later with error Handling
	}

	return (
		<form className={root} noValidate autoComplete='off' onSubmit={onSubmit}>
			<Grid container direction='column' alignItems='center'>
				<TextField
					className={firstInput}
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
				<Button type='submit' className={input}>
					Log In
				</Button>
			</Grid>
		</form>
	)
}

export default Register
