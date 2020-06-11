const APP = (SET => {
	'use strict';

	const repeat = (count, ...arg) => {
		const f = arg.pop();
		for (let i = 0; i < count; i++) {
			f(i, ...arg);
		}
	};

	const PROP = (self, ...v) => Object.assign(self, ...v);
	const ERR = v => { throw v; };
	const TMPL = (self, method, ...arg) => {
		return `_${method}` in self ? self[`_${method}`](...arg) : ERR()
	}
	const HOOK = (p, method) => typeof p.prototype[method] === 'function' ? `_${method}` : ERR();

	const SubData = class {
		constructor(listener) { PROP(this, { listener }); }
		notify() { if (this.listener) this.listener(); }
		clear() {
			// 언어에서 지원안하면 함수로 표현하기
			TMPL(this, 'clear')();
		}
	}

	const Stage = class extends SubData {
		[HOOK(SubData, 'clear')]() {
			this.state = 0;
			this.isNext();
		}
		isNext() {
			if (this.stage++ === SET.stage.max) return false;
			else {
				this.notify();
				return true;
			}
		}
		get speed() {
			const { stage: { speed: [min, max], max: stageMax }
			} = SET;
			return min - (min - max) * (this.stage - 1) / stageMax;
		}

		get count() {
			const { stage: { count: [base, inc] } } = SET;
			return max + inc * (this.stage - 1)
		}
	}

	const Score = class extends SubData {
		[HOOK(SubData, 'clear')]() {
			this.curr = this.total = 0;
			this.notify();
		}
		add(line, stage) {

		}
	}

})(SET);

APP.init();
