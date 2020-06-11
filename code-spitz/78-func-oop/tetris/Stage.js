import { prop } from './prop.js';

const Stage = class {
	constructor(last, min, max, listener) {
		prop(this, { last, min, max });
	}
	// 게임 본체 보다 Stage 객체가 먼저 생성되야 하므로,
	// 게임 본체를 리스너로 받으려면 init 시점을 만들어야 함
	init(listener) {
		prop(this, { listener });
	}

	clear() {
		this.curr = 0;
		this.next();
	}

	next() {
		if (this.curr++ < Stage.last) {
			const rate = (this.curr - 1) / (this.last - 1);
			this.speed = this.min + (this.max - this.min) * (1 - rate);
			this.listener();
		}
	}

	score(line) {
		// prettier-ignore
		return parseInt((this.curr * 5) * (2 ** line));
	}

	[Symbol.toPrimitive](hint) {
		return `<div>Stage ${this.stage}</div>`;
	}
};
