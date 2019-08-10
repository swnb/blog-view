import React from 'react';
import { authorization } from 'services';
import { MaskedTextField } from 'office-ui-fabric-react';
import { styles } from 'common';

const maskFormat: { [key: string]: RegExp } = {
	'*': /[0-9]/
};

interface AuthState {
	showCodeInput: boolean;
}
export class Auth extends React.PureComponent<{}, AuthState> {
	public state = {
		showCodeInput: false
	};

	private onInputChange = async (
		ev: React.FormEvent<HTMLInputElement | HTMLTextAreaElement>,
		newV?: string
	) => {
		if (newV && !newV.endsWith('-')) {
			await authorization(newV);
		}
	};

	public componentDidMount = async () => {
		try {
			const response = await authorization();
			console.log(response);
			const currentDom = this.googleAuthRef.current;
			if (currentDom) {
				currentDom.innerHTML = response;
			}
		} catch (error) {
			this.setState({ showCodeInput: true });
		}
	};

	private googleAuthRef: React.RefObject<HTMLDivElement> = React.createRef();

	public render = () => {
		return (
			<article
				style={{
					...styles.body
				}}
			>
				{this.state.showCodeInput ? (
					<MaskedTextField
						label="google auth code"
						mask="******"
						maskFormat={maskFormat}
						onChange={this.onInputChange}
						maskChar="-"
					/>
				) : (
					<div ref={this.googleAuthRef} />
				)}
			</article>
		);
	};
}
