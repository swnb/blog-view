import React from 'react';
import hljs from 'highlight.js';
import 'highlight.js/styles/atom-one-dark.css';
import { ElementCommonProps, renderElements } from './index';

interface CodeBlockRenderProps {
	lanType: string;
	text: any;
}

class CodeBlockRender extends React.PureComponent<CodeBlockRenderProps, {}> {
	private codeBlockRef: React.RefObject<HTMLElement> = React.createRef();

	private retryTime = 0;
	private renderCodeBlock = () => {
		const codeBlock = this.codeBlockRef.current;
		if (!codeBlock) {
			this.retryTime++;
			if (this.retryTime > 4) return; // retry 4 time before exist
			setTimeout(this.renderCodeBlock, 500);
		} else {
			hljs.highlightBlock(codeBlock);
		}
	};

	public componentDidMount() {
		this.renderCodeBlock();
	}

	public render() {
		const className = this.props.lanType;
		const text = this.props.text;
		return (
			<code
				style={{ borderRadius: '5px' }}
				ref={this.codeBlockRef}
				className={className}
			>
				{renderElements(text)}
			</code>
		);
	}
}

export const Pre = ({ children }: ElementCommonProps) => (
	<pre style={{ padding: 0 }}>{renderElements(children)}</pre>
);

interface CodeProps extends ElementCommonProps {
	lanType?: string;
}

export const Code = ({ children, lanType }: CodeProps) => {
	if (lanType) {
		return <CodeBlockRender lanType={lanType.slice(9)} text={children} />;
	} else {
		return <code>{renderElements(children)}</code>;
	}
};
