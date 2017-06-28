export function isInObject(object, value) {
	if (typeof object === 'undefined' || typeof value === 'undefined') {
		throw new Error('No object or value to work with');
	}
	const keys = Object.keys(object);
	for (var i = 0; i < keys.length; i++) {
		if (object[keys[i]] === value) {
			return true;
		}
	}
	return false;
}
