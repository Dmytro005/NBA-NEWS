import React, { Component } from 'react';

import styles from './Dashboard.css';

import FormField from 'components/FormField';

class Dashboard extends Component {
	validate = element => {
		let err = [true, ''];

		if (element.validation.required) {
			const valid = element.value.trim() !== '';
			const message = `${!valid ? 'This field is required' : ''}`;
			err = !valid ? [valid, message] : err;
		}

		return err;
	};

	state = {
		postError: null,
		loading: false,
		formData: {
			author: {
				element: 'input',
				value: '',
				config: {
					name: 'author_input',
					type: 'text',
					placeholder: 'Enter author'
				},
				validation: {
					required: true
				},
				valid: false,
				touched: false,
				validationMessage: ''
			},
			title: {
				element: 'input',
				value: '',
				config: {
					name: 'title_input',
					type: 'text',
					placeholder: 'Enter title'
				},
				validation: {
					required: true
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

	submitForm = event => {
		let dataToSubmit = {};
		let formIsValid = true;

		for (let key in this.state.formData) {
			dataToSubmit[key] = this.state.formData[key].value;
		}

		for (let key in this.state.formData) {
			formIsValid = this.state.formData[key].valid && formIsValid;
		}

		if (formIsValid) {
			console.log('post data');
		} else {
			this.setState({
				postError: 'Form isn`t valid, please check the fields'
			});
		}
	};

	submitButtons = () =>
		this.state.loading ? (
			'loading ...'
		) : (
			<div>
				<button type="button" onClick={e => this.submitForm(e, false)}>
					Add post
				</button>
			</div>
		);

	showError = () =>
		this.state.postError ? (
			<div className={styles.error}>{this.state.postError}</div>
		) : (
			''
		);

	render() {
		return (
			<div className={styles.postContainer}>
				<form onSubmit={this.submitForm}>
					<h2>Add Post</h2>
					<FormField
						id={'author'}
						formData={this.state.formData.author}
						change={element => this.updateForm(element)}
					/>
					<FormField
						id={'title'}
						formData={this.state.formData.title}
						change={element => this.updateForm(element)}
					/>
					{this.showError()}
					{this.submitButtons()}
				</form>
			</div>
		);
	}
}

export default Dashboard;
