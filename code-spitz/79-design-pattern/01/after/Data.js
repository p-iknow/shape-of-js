import { err } from './util.js';
import fetchJSON from './json.js';


const Info = class {
	constructor(json) {
		const { title, header, items } = json;
		if (typeof title != 'string' || !title) err('Invalid Title');
		if (!Array.isArray(header) || !header) err('Invalid header');
		if (!Array.isArray(items) || !items) err('Invalid Items');

		this._private = { title, header, items };
	}

	get title() { return this._private.title; }
	get header() { return this._private.header; }
	get items() { return this._private.items; }

}


export const Data = class {
	async getData() {
		const json = await this._getData();
		return new Info(json);
	}

	async _getData() {
		err("getData must be overrided");
	}
}

export const JsonData = class extends Data {
	constructor(data) {
		super();
		this._data = data;
	}

	async _getData() {
		if (typeof this._data == 'string') {
			const response = await fetchJSON(this._data);
			return await response;
		} else {
			return this._data;
		}
	}
}
