import * as React from 'react';
import {
	Callout,
	Calendar as FabricCalendar,
	DayOfWeek,
	DirectionalHint,
	CommandBarButton,
	FocusTrapZone
} from 'office-ui-fabric-react';

const DayPickerStrings = {
	months: [
		'1月',
		'2月',
		'3月',
		'4月',
		'5月',
		'6月',
		'7月',
		'8月',
		'9月',
		'10月',
		'11月',
		'12月'
	],
	shortMonths: ['1', '2', '3', '4', '5', '6', '7', '8', '9', '10', '11', '12'],
	days: [
		'Sunday',
		'Monday',
		'Tuesday',
		'Wednesday',
		'Thursday',
		'Friday',
		'Saturday'
	],
	shortDays: ['S', 'M', 'T', 'W', 'T', 'F', 'S'],
	goToToday: '',
	weekNumberFormatString: 'Week number {0}',
	prevMonthAriaLabel: 'Previous month',
	nextMonthAriaLabel: 'Next month',
	prevYearAriaLabel: 'Previous year',
	nextYearAriaLabel: 'Next year',
	prevYearRangeAriaLabel: 'Previous year range',
	nextYearRangeAriaLabel: 'Next year range',
	closeButtonAriaLabel: 'Close'
};

export interface CalendarProps {
	date: Date;
}

export interface CalendarState {
	showCalendar: boolean;
	selectedDate: Date | null;
}

export class Calendar extends React.Component<CalendarProps, CalendarState> {
	private styles = {
		mid: {
			display: 'flex',
			justifyContent: 'center',
			alignItems: 'center'
		},
		height: '100%'
	};

	private calendarButtonElement: React.RefObject<
		HTMLDivElement
	> = React.createRef();

	public state = {
		showCalendar: false,
		selectedDate: null
	};

	public render(): JSX.Element {
		const {
			styles,
			props: { date }
		} = this;

		return (
			<div style={styles.mid}>
				<div
					ref={this.calendarButtonElement}
					style={{
						...styles.mid,
						height: styles.height
					}}
				>
					<CommandBarButton
						styles={{ root: { height: styles.height } }}
						iconProps={{ iconName: 'DateTime' }}
						onClick={this.onClick}
						text={'date'}
					/>
				</div>
				{this.state.showCalendar && (
					<Callout
						isBeakVisible={false}
						gapSpace={0}
						doNotLayer={false}
						target={this.calendarButtonElement}
						directionalHint={DirectionalHint.bottomLeftEdge}
						onDismiss={this.onDismiss}
					>
						<FocusTrapZone isClickableOutsideFocusTrap={true}>
							<FabricCalendar
								onDismiss={this.onDismiss}
								today={date}
								value={date}
								firstDayOfWeek={DayOfWeek.Sunday}
								strings={DayPickerStrings}
								isMonthPickerVisible={true}
								isDayPickerVisible={true}
								highlightCurrentMonth={true}
								highlightSelectedMonth={true}
								showMonthPickerAsOverlay={true}
								showGoToToday={false}
							/>
						</FocusTrapZone>
					</Callout>
				)}
			</div>
		);
	}

	private onClick = (): void => {
		this.setState(({ showCalendar }) => ({ showCalendar: !showCalendar }));
	};

	private onDismiss = () => {
		this.setState({ showCalendar: false });
	};
}
