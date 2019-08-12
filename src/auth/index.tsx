import React from 'react';
import { authorization, checkAuthInit } from 'services';
import { MaskedTextField } from 'office-ui-fabric-react';
import { styles, redirect } from 'common';

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
		_: React.FormEvent<HTMLInputElement | HTMLTextAreaElement>,
		newV?: string
	) => {
		if (newV && !newV.endsWith('-')) {
			try {
				await authorization(newV);
				redirect('/home');
			} catch (error) {
				redirect('/not-found');
			}
		}
	};

	public componentDidMount = async () => {
		try {
			if (await checkAuthInit()) {
				this.setState({ showCodeInput: true });
			} else {
				const { code, data } = await authorization();
				if (code === 0) {
					const currentDom = this.googleAuthRef.current;
					if (currentDom) {
						currentDom.innerHTML = data;
					}
				}
			}
		} catch (error) {
			redirect('/not-found');
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
