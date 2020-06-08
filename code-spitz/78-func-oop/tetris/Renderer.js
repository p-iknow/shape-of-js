import { prop } from './util.js';
import Data from './Data.js';

const Renderer = class {
	constructor(col, row) {
		prop(this, { col, row, blocks: [] });
		while (row--) this.blocks.push([]);
	}

	clear() {
		throw 'override';
	}

	render(data) {
		if (!(data instanceof Data)) throw 'invalid data';
		this._render(data);
	}

	_render(data) {
		throw 'override';
	}
};
