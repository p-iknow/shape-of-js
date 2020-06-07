import prop from './prop.js';

const Score = class {
	constructor(stage, listener) {
		prop(this, { stage, listener });
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
};
