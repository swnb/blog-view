import * as React from 'react';
import {
	CommandBarButton,
	IButtonProps
} from 'office-ui-fabric-react/lib/Button';
import { Callout, DirectionalHint } from 'office-ui-fabric-react/lib/Callout';
import {
	Calendar as FabricCalendar,
	DayOfWeek
} from 'office-ui-fabric-react/lib/Calendar';
import { FocusTrapZone } from 'office-ui-fabric-react/lib/FocusTrapZone';

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

export interface ICalendarButtonExampleState {
	showCalendar: boolean;
	selectedDate: Date | null;
}

export class Calendar extends React.Component<
	CalendarProps,
	ICalendarButtonExampleState
> {
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
						className="ms-DatePicker-callout"
						gapSpace={0}
						doNotLayer={false}
						target={this.calendarButtonElement}
						directionalHint={DirectionalHint.bottomLeftEdge}
						onDismiss={this.onDismiss}
						setInitialFocus={true}
					>
						<FocusTrapZone isClickableOutsideFocusTrap={true}>
							<FabricCalendar
								onSelectDate={this.onSelectDate}
								onDismiss={this.onDismiss}
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
		this.setState((prevState: ICalendarButtonExampleState) => {
			prevState.showCalendar = !prevState.showCalendar;
			return prevState;
		});
	};

	private onDismiss = (): void => {
		this.setState((prevState: ICalendarButtonExampleState) => {
			prevState.showCalendar = false;
			return prevState;
		});
	};

	private onSelectDate = (date: Date): void => {
		console.log(date);
		// this.setState((prevState: ICalendarButtonExampleState) => {
		// 	prevState.showCalendar = false;
		// 	prevState.selectedDate = date;
		// 	return prevState;
		// });
	};
}
