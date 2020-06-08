import { prop } from './util.js';

const Data = class extends Array {
	constructor(row, col) {
		prop(this, { row, col });
	}
};

export default;
