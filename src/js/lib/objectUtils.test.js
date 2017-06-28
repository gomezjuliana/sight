import { isInObject } from './objectUtils';

describe('Tests for isInObject', () => {
	const object = {
		key: 'something'
	};
	test('Finds something in an object', () => {
		expect(isInObject(object, 'something')).toBe(true);
	});
	test('Returns false if the value is not found', () => {
		expect(isInObject(object, 'anotherValue')).toBe(false);
	});
	test('Raise an error is there\'s no object and/or value', () => {
		const error = new Error('No object or value to work with');
		expect(() => isInObject(object)).toThrowError(error);
		expect(() => isInObject(undefined, 'value')).toThrowError(error);
		expect(() => isInObject()).toThrowError(error);
	});
});
