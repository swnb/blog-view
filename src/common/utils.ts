const parseDateTimeRegex = /(\d+)-(\d+)-(\d+)T(\d+):(\d+):(\d+)/;
export interface DateTime {
	year: number;
	month: number;
	day: number;
	hour: number;
	minute: number;
	second: number;
}
export const parseDateTime = (datetime: string): DateTime | undefined => {
	const result = parseDateTimeRegex.exec(datetime);
	if (result) {
		const [, strYear, strMonth, strDay, strHour, strMinute, strSecond] = result;
		const [year, month, day, hour, minute, second] = [strYear, strMonth, strDay, strHour, strMinute, strSecond].map((v) => parseInt(v, 10));
		return {
			year, month, day, hour, minute, second
		}
	}
}

export const parseDate = (date: string): Date | undefined => {
	const result = parseDateTime(date);
	if (result) {
		const { year, month, day, hour, minute, second } = result;
		return new Date(year, month - 1, day, hour, minute, second);
	}
}

