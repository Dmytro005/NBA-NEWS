import React, { Component } from 'react';

import { firebase } from 'firebaseConfig/firebase';
import FileUploader from 'react-firebase-file-uploader';

class Uploader extends Component {
	state = {
		username: '',
		image: '',
		isUploading: false,
		progress: 0,
		imageURL: ''
	};

	handleUploadStart = () => this.setState({ isUploading: true, progress: 0 });

	handleProgress = progress => this.setState({ progress });

	handleUploadError = error => {
		this.setState({ isUploading: false });
		console.error(error);
	};

	handleUploadSuccess = filename => {
		this.setState({ image: filename, progress: 100, isUploading: false });
		firebase
			.storage()
			.ref('images')
			.child(filename)
			.getDownloadURL()
			.then(url => this.setState({ imageURL: url }));

		this.props.filename(filename);
	};

	render() {
		return (
			<div>
				{this.state.isUploading ? <p>Progress {this.state.progress}%</p> : null}

				{this.state.imageURL ? (
					<img src={this.state.imageURL} alt="team_photo" width="300px" />
				) : null}

				<FileUploader
					accept="image/*"
					name="image"
					randomizeFilename
					storageRef={firebase.storage().ref('images')}
					onUploadStart={this.handleUploadStart}
					onUploadError={this.handleUploadError}
					onUploadSuccess={this.handleUploadSuccess}
					onProgress={this.handleProgress}
				/>
			</div>
		);
	}
}

export default Uploader;
