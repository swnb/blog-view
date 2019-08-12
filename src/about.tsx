import React from 'react';
import { Text, Link, Stack } from 'office-ui-fabric-react';
import { styles } from 'common';
import { dataStore as navigationDataStore } from 'navigation';

const tokens = {
	childrenGap: 20
};

const About = () => {
	navigationDataStore.set({
		type: 'About',
		value: 'Swnb'
	});

	return (
		<Stack
			styles={{ root: { ...styles.body, marginTop: '50px' } }}
			tokens={tokens}
		>
			<Stack.Item align="center">
				<Text variant="xxLarge">Swnb</Text>
			</Stack.Item>
			<Stack.Item align="center">
				<Text variant="large">
					略懂 <Link href="https://reactjs.org/"> React </Link> , 小懂{' '}
					<Link href="https://golang.org/"> Golang </Link> , 大爱{' '}
					<Link href="https://www.rust-lang.org/"> Rust </Link>
				</Text>
			</Stack.Item>
			<Stack.Item align="center">
				<Text variant="large">专注 Web 一百年</Text>
			</Stack.Item>
			<Stack.Item align="center">
				<Text variant="large">
					看看<Link href="https://en.wikipedia.org/wiki/SQL"> Sql </Link> , 瞅瞅
					<Link href="https://github.com/torvalds/linux"> Linux </Link> , 拨拨
					<Link href="https://en.wikipedia.org/wiki/Guitar"> Guitar </Link>
				</Text>
			</Stack.Item>
			<Stack.Item align="center">
				<Text variant="large">人生把酒须尽欢</Text>
			</Stack.Item>
			<Stack.Item align="center">
				<Text variant="large">
					玩过<Link href="https://www.nginx.com/"> Nginx </Link>, 弄过
					<Link href="https://nodejs.org/en/"> Node </Link>, 搞过
					<Link href="https://www.postgresql.org/"> Pg </Link>
				</Text>
			</Stack.Item>
			<Stack.Item align="center">
				<Text variant="large">
					一把<Link href="https://www.hhkeyboard.com/"> HHKB </Link>走天涯
				</Text>
			</Stack.Item>
		</Stack>
	);
};

export default About;
