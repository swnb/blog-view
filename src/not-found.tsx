import * as React from 'react';
import {
	Dialog,
	DialogType,
	DialogFooter
} from 'office-ui-fabric-react/lib/Dialog';
import { PrimaryButton } from 'office-ui-fabric-react/lib/Button';
import { redirect } from 'common';

interface NotFoundState {
	isHide: boolean;
}
export class NotFound extends React.Component<{}, NotFoundState> {
	public state: NotFoundState = {
		isHide: false
	};

	public render() {
		const {
			state: { isHide },
			close
		} = this;

		return (
			<span>
				<Dialog
					hidden={isHide}
					onDismiss={close}
					dialogContentProps={{
						type: DialogType.largeHeader,
						title: 'Found Nothing',
						subText: '似乎发生了一些错误，准备返回主界面'
					}}
					modalProps={{
						isBlocking: true,
						styles: { main: { maxWidth: 450 } }
					}}
				>
					<DialogFooter>
						<PrimaryButton onClick={close} text="确认" />
					</DialogFooter>
				</Dialog>
			</span>
		);
	}

	private close = () => {
		redirect('/home');
	};
}
