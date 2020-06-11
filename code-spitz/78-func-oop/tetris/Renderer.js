import { prop, el, back } from './util.js';
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

export const TableRenderer = class extends Renderer {
	// 외부에서 우리가 만든 스타일을 지정할 수 있도록 옵션 지정
	// style 은 table 네이티브 영역의 고유 것 이므로 자식만 받아서 자식이 처리함
	constructor(col, row, back, base = el('table')) {
		super(col, row);
		this.back = back;
		this.base = base;
		while (row--) {
			// prettier-ignore
			const tr = base.appendChild(el('tr')), curr = [];
			// blocks 가 없었다면 나중에 색을 그릴때 tr 밑에 td를 매번 찾아가야 하지만
			// blocks 라는 가상의 2차원 배열이 있다면  blocks를 잡아서 색을 채우면됨
			// 미리 자주 찾을 애들을 blocks 에 담아둔 것이다.
			this.blocks.push(curr);

			while (col--) {
				curr.push(tr.appendChild(el('td')).style);
			}
			this.clear();
		}
	}
	clear() {
		this.blocks.forEach(curr => curr.forEach(style => back(style, this.back)));
	}

	_render(v) {
		this.blocks.forEach((curr, row) =>
			curr.forEach((style, col) => back(style, v[row][col]))
		);
	}
};

export const canvasRenderer = class extends Renderer {
	// 외부에서 우리가 만든 스타일을 지정할 수 있도록 옵션 지정
	// style 은 table 네이티브 영역의 고유 것 이므로 자식만 받아서 자식이 처리함
	constructor(col, row, back, style, base = el('canvas')) {
		super(col, row);
		this.back = back;
		base.style.cssText = style;
		while (row--) {
			// prettier-ignore
			const tr = base.appendChild(el('tr')), curr = [];
			// blocks 가 없었다면 나중에 색을 그릴때 tr 밑에 td를 매번 찾아가야 하지만
			// blocks 라는 가상의 2차원 배열이 있다면  blocks를 잡아서 색을 채우면됨
			// 미리 자주 찾을 애들을 blocks 에 담아둔 것이다.
			this.blocks.push(curr);

			while (col--) {
				curr.push(tr.appendChild(el('td')).style);
			}
			this.clear();
		}
	}
	clear() {
		this.blocks.forEach(curr => curr.forEach(style => back(style, this.back)));
	}

	_render(v) {
		this.blocks.forEach((curr, row) =>
			curr.forEach((style, col) => back(style, v[row][col]))
		);
	}
};
