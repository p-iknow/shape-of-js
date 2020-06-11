import prop from './prop.js';

const Score = class {
	constructor(stage, listener) {
		prop(this, { stage, listener });
	}
	// 게임 본체 보다 Score 객체가 먼저 생성되야 하므로,
	// 게임 본체를 리스너로 받으려면 init 시점을 만들어야 함
	init(listener) {
		prop(this, { listener });
	}
	clear() {
		this.curr = this.total = 0;
	}
	add(line) {
		const score = this.stage.score(line);
		this.curr += score;
		this.total += score;
		this.listener;
	}
	[Symbol.toPrimitive](hint) {
		return `<div>Score ${this.curr} / ${this.total}</div>`;
	}
};
