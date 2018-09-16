import React, { Component } from 'react';
import {
	firebaseTeams,
	firebaseArticles,
	firebase
} from 'firebaseConfig/firebase';

import FormField from 'components/FormField';
import FileUplaoder from 'components/FileUploader/FileUploader';
import styles from './Dashboard.css';

import { Editor } from 'react-draft-wysiwyg';
// import { EditorState, convertFromRaw, converToRaw } from 'draft-js';
import { EditorState } from 'draft-js';
import { stateToHTML } from 'draft-js-export-html';

class Dashboard extends Component {
	state = {
		editorState: EditorState.createEmpty(),
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
			},
			body: {
				element: 'texteditor',
				value: '',
				valid: true
			},
			team: {
				element: 'select',
				value: 1,
				config: {
					name: 'team_input',
					options: []
				},
				validation: {
					required: true
				},
				valid: true,
				touched: false,
				validationMessage: ''
			},
			image: {
				element: 'image',
				value: '',
				valid: true
			}
		}
	};

	componentDidMount() {
		this.loadTeams();
	}

	loadTeams = () => {
		firebaseTeams.once('value').then(snapshot => {
			let team = [];

			snapshot.forEach(childSnapshot => {
				team.push({
					id: childSnapshot.val().teamId,
					name: childSnapshot.val().city
				});
			});

			const newFormdata = { ...this.state.formData };
			const newElement = { ...newFormdata['team'] };

			newElement.config.options = team;
			newFormdata['team'] = newElement;

			this.setState({
				formdata: newFormdata
			});
		});
	};

	validate = element => {
		let err = [true, ''];

		if (element.validation.required) {
			const valid = element.value.trim() !== '';
			const message = `${!valid ? 'This field is required' : ''}`;
			err = !valid ? [valid, message] : err;
		}

		return err;
	};

	updateForm(element, content = '') {
		const newFormData = {
			...this.state.formData
		};
		const newElement = {
			...newFormData[element.id]
		};

		if (content === '') {
			newElement.value = element.event.target.value;
		} else {
			newElement.value = content;
		}

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
			this.setState({
				postError: '',
				loading: true
			});

			firebaseTeams
				.orderByChild('id')
				.limitToLast(1)
				.once('value')
				.then(snapshot => {
					let articleId = null;

					snapshot.forEach(childSnapshot => {
						articleId = snapshot.val().id;
					});

					dataToSubmit['date'] = firebase.database.ServerValue.TIMESTAMP;
					dataToSubmit['id'] = 0;
					dataToSubmit['team'] = parseInt(dataToSubmit['team']);

					console.log(dataToSubmit);

					firebaseArticles
						.push(dataToSubmit)
						.then(article => {
							this.props.history.push(`/articles/${article.key}`);
						})
						.catch(e => {
							this.setState({
								postError: e.message
							});
						});
				});

			console.log();
		} else {
			this.setState({
				postError: 'Form isn`t valid, please check the fields'
			});
		}
	};

	onEditorStateChange = editorState => {
		const contentState = editorState.getCurrentContent();
		const html = stateToHTML(contentState);

		this.updateForm({ id: 'body' }, html);

		this.setState({
			editorState
		});
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

	storeFilename = filename => {
		console.log('sirefilename', filename);

		this.updateForm({ id: 'image' }, filename);
	};

	render() {
		return (
			<div className={styles.postContainer}>
				<form onSubmit={this.submitForm}>
					<h2>Add Post</h2>

					<FileUplaoder
						filename={filename => {
							this.storeFilename(filename);
						}}
					/>

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

					<Editor
						editorState={this.state.editorState}
						wrapperClassName="myEditor-wrapper"
						editorClassName="myEditor-editor"
						onEditorStateChange={this.onEditorStateChange}
					/>

					<FormField
						id={'team'}
						formData={this.state.formData.team}
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
