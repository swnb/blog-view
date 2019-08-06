import React from 'react';
import {
	Shimmer,
	ShimmerElementType,
	Fabric,
	mergeStyles
} from 'office-ui-fabric-react';

const wrapperClass = mergeStyles({
	padding: 2,
	selectors: {
		'& > .ms-Shimmer-container': {
			margin: '10px 0'
		}
	}
});

export const Loading: React.FC = () => {
	return (
		<Fabric className={wrapperClass}>
			<Shimmer width="50%" />
			<Shimmer width="75%" />
			<Shimmer />
			<Shimmer
				width={'70%'}
				shimmerElements={[
					{ type: ShimmerElementType.circle, height: 24 },
					{ type: ShimmerElementType.gap, width: '2%' },
					{ type: ShimmerElementType.line, height: 16, width: '20%' },
					{ type: ShimmerElementType.gap, width: '5%' },
					{ type: ShimmerElementType.line, height: 16, width: '20%' },
					{ type: ShimmerElementType.gap, width: '10%' },
					{ type: ShimmerElementType.line, height: 16, width: '15%' },
					{ type: ShimmerElementType.gap, width: '10%' },
					{ type: ShimmerElementType.line, height: 16 }
				]}
			/>
			<Shimmer
				shimmerElements={[
					{ type: ShimmerElementType.circle },
					{ type: ShimmerElementType.gap, width: '2%' },
					{ type: ShimmerElementType.line }
				]}
			/>
			<Shimmer
				shimmerElements={[
					{ type: ShimmerElementType.circle, height: 24 },
					{ type: ShimmerElementType.gap, width: '2%' },
					{ type: ShimmerElementType.line, height: 16, width: '20%' },
					{ type: ShimmerElementType.gap, width: '5%' },
					{ type: ShimmerElementType.line, height: 16, width: '20%' },
					{ type: ShimmerElementType.gap, width: '10%' },
					{ type: ShimmerElementType.line, height: 16, width: '15%' },
					{ type: ShimmerElementType.gap, width: '10%' },
					{ type: ShimmerElementType.line, height: 16 }
				]}
			/>
			<Shimmer
				width={'70%'}
				shimmerElements={[
					{ type: ShimmerElementType.circle, height: 24 },
					{ type: ShimmerElementType.gap, width: '2%' },
					{ type: ShimmerElementType.line, height: 16, width: '20%' },
					{ type: ShimmerElementType.gap, width: '5%' },
					{ type: ShimmerElementType.line, height: 16, width: '20%' },
					{ type: ShimmerElementType.gap, width: '10%' },
					{ type: ShimmerElementType.line, height: 16, width: '15%' },
					{ type: ShimmerElementType.gap, width: '10%' },
					{ type: ShimmerElementType.line, height: 16 }
				]}
			/>
			<Shimmer
				shimmerElements={[
					{ type: ShimmerElementType.circle },
					{ type: ShimmerElementType.gap, width: '2%' },
					{ type: ShimmerElementType.line }
				]}
			/>
			<Shimmer
				shimmerElements={[
					{ type: ShimmerElementType.circle, height: 24 },
					{ type: ShimmerElementType.gap, width: '2%' },
					{ type: ShimmerElementType.line, height: 16, width: '20%' },
					{ type: ShimmerElementType.gap, width: '5%' },
					{ type: ShimmerElementType.line, height: 16, width: '20%' },
					{ type: ShimmerElementType.gap, width: '10%' },
					{ type: ShimmerElementType.line, height: 16, width: '15%' },
					{ type: ShimmerElementType.gap, width: '10%' },
					{ type: ShimmerElementType.line, height: 16 }
				]}
			/>
		</Fabric>
	);
};
