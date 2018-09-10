import React from 'react';

import styles from './FormField.css';

const FormField = ({ formData, change, id }) => {
	const renderTemplate = () => {
		let formTemplate = null;

		switch (formData.element) {
			case 'input':
				formTemplate = (
					<input
						{...formData.config}
						value={formData.value}
						onBlur={event => change({ event, id, blur: true })}
						onChange={event => change({ event, id, blur: false })}
					/>
				);
				break;
			default:
				formTemplate = null;
		}
		return formTemplate;
	};

	const showError = () => {
		let errorMessage = null;
		if (formData.validation && !formData.valid) {
			errorMessage = (
				<div className={styles.labelError}>{formData.validationMessage}</div>
			);
		}

		return errorMessage;
	};

	return (
		<div>
			{renderTemplate()}
			{showError()}
		</div>
	);
};

export default FormField;
