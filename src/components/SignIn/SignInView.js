import React, { Component } from 'react';

import styles from './SignIn.css';
import FormField from 'components/FormField';

import { firebase } from 'firebaseConfig/firebase';

const EMAIL_REGEX_PATTERN = /^\w+@[a-zA-Z_]+?\.[a-zA-Z]{2,3}$/;

class SignIn extends Component {
	state = {
		registerError: null,
		loading: false,
		formData: {
			email: {
				element: 'input',
				value: '',
				config: {
					name: 'email_input',
					type: 'email',
					placeholder: 'Enter your email'
				},
				validation: {
					required: true,
					email: true
				},
				valid: false,
				touched: false,
				validationMessage: ''
			},
			password: {
				element: 'input',
				value: '',
				config: {
					name: 'passowrd_input',
					type: 'passowrd',
					placeholder: 'Enter your passowrd'
				},
				validation: {
					required: true,
					passowrd: true
				},
				valid: false,
				touched: false,
				validationMessage: ''
			}
		}
	};

	updateForm(element) {
		const newFormData = {
			...this.state.formData
		};
		const newElement = {
			...newFormData[element.id]
		};

		newElement.value = element.event.target.value;

		if (element.blur) {
			let validData = this.validate(newElement);
			newElement.valid = validData[0];
			newElement.validationMessage = validData[1];
		}

		newElement.touched = element.blur;
		newFormData[element.id] = newElement;

		this.setState({
			formData: newFormData
		});
	}

	validate = element => {
		let err = [true, ''];

		if (element.validation.email) {
			const valid = EMAIL_REGEX_PATTERN.test(element.value);
			const message = `${!valid ? 'Enter the valid email' : ''}`;
			err = !valid ? [valid, message] : err;
		}

		if (element.validation.passowrd) {
			const valid = element.value.length >= 5;
			const message = `${!valid ? 'This field must be greater than 5' : ''}`;
			err = !valid ? [valid, message] : err;
		}

		if (element.validation.required) {
			const valid = element.value.trim() !== '';
			const message = `${!valid ? 'This field is required' : ''}`;
			err = !valid ? [valid, message] : err;
		}

		return err;
	};

	submitForm = (event, type) => {
		let dataToSubmit = {};
		let formIsValid = true;

		for (let key in this.state.formData) {
			dataToSubmit[key] = this.state.formData[key].value;
		}

		for (let key in this.state.formData) {
			formIsValid = this.state.formData[key].valid && formIsValid;
		}

		if (formIsValid) {
			this.setState({
				loading: true,
				registerError: ''
			});

			if (type) {
				firebase
					.auth()
					.signInWithEmailAndPassword(dataToSubmit.email, dataToSubmit.password)
					.then(() => {
						this.props.history.push('/');
					})
					.catch(error => {
						this.setState({
							loading: false,
							registerError: error.message
						});
					});
			} else {
				firebase
					.auth()
					.createUserWithEmailAndPassword(
						dataToSubmit.email,
						dataToSubmit.password
					)
					.then(() => {
						this.props.history.push('/');
					})
					.catch(error => {
						this.setState({
							loading: false,
							registerError: error.message
						});
					});
			}
		}
	};

	submitButtons = () =>
		this.state.loading ? (
			'loading ...'
		) : (
			<div>
				<button type="button" onClick={e => this.submitForm(e, false)}>
					Register now
				</button>
				<button type="button" onClick={e => this.submitForm(e, true)}>
					Log in
				</button>
			</div>
		);

	render() {
		return (
			<div className={styles.logContainer}>
				<form onSubmit={e => e.preventDefault()}>
					<h2>Register / Log in</h2>
					<FormField
						id={'email'}
						formData={this.state.formData.email}
						change={element => this.updateForm(element)}
					/>
					<FormField
						id={'password'}
						formData={this.state.formData.password}
						change={element => this.updateForm(element)}
					/>

					{this.submitButtons()}
				</form>
			</div>
		);
	}
}

export default SignIn;
