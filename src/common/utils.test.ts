import { DateTime, parseDateTime } from './utils';

it("parseDateTime", () => {
	const dateTime = parseDateTime("2019-08-07T10:43:01.354292");
	expect(dateTime).not.toEqual(undefined);
	const { year, month, day, hour, minute, second } = dateTime as DateTime;
	expect(year).toEqual(2019);
	expect(month).toEqual(8);
	expect(day).toEqual(7);
	expect(hour).toEqual(10);
	expect(minute).toEqual(43);
	expect(second).toEqual(1);
});