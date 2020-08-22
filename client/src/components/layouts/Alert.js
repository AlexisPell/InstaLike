import React from 'react'
import { connect } from 'react-redux'
import { makeStyles } from '@material-ui/core/styles'
import Alert from '@material-ui/lab/Alert'

const useStyles = makeStyles((theme) => ({
	root: {
		width: '100%',
		marginTop: theme.spacing(3),
		marginBottom: theme.spacing(3),
	},
	alertBlock: {
		marginTop: theme.spacing(2),
	},
}))

const AlertMsg = ({ alerts }) => {
	const classes = useStyles()

	return (
		<div className={classes.root}>
			{alerts !== null &&
				alerts.length > 0 &&
				alerts.map((alert) => (
					<Alert
						severity={alert.alertType}
						key={alert.id}
						className={classes.alertBlock}
					>
						{alert.msg}
					</Alert>
				))}
		</div>
	)
}

const mapStateToProps = (state) => ({
	alerts: state.alert,
})

export default connect(mapStateToProps, {})(AlertMsg)
