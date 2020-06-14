import { err } from './util.js';
import { Data } from './Data.js';

const Renderer = class {
	constructor(data) {
		if (!data instanceof Data) return err("Invalid Data type");
		this._data = data
		this._title = ''
		this._header = ''
		this._items = []
	}

	async render() {

		const { title, header, items } = await this._data.getData();
		this._title = title;
		this._header = header;
		this._items = items;
		this._render();
	}

	_render() {
		err('_render must overrided');
	}
}

export const TableRenderer = class extends Renderer {
	constructor(parent, data) {
		if (typeof parent != 'string' || !parent) return err('Invalid parma');
		super(data);
		this._parent = parent;
	}
	_render() {
		const parent = document.querySelector(this._parent);
		if (!parent) return err('Invalid Parent');
		parent.innerHTML = '';

		// getter r가 해체됨
		const { _title, _header, _items } = this;
		// 테이블 생성

		// title 을 캡션으로
		const $caption = document.createElement('caption');
		$caption.innerHTML = _title;

		const $thead = _header.reduce(($thead, data) => {
			const $th = document.createElement('th');
			$th.innerHTML = data;
			$thead.appendChild($th);
			return $thead;
		}, document.createElement('thead'));

		// items 를 tr로 부모에 삽입
		const $trs = _items.map(
			item => item.reduce(($tr, data) => {
				const $td = document.createElement('td');
				$td.innerHTML = data;
				$tr.appendChild($td);
				return $tr;
			}, document.createElement('tr'))
		)

		const $table = document.createElement('table');

		[
			$caption,
			$thead,
			...$trs
		].forEach(el => $table.appendChild(el));


		parent.appendChild($table);
	}
}
