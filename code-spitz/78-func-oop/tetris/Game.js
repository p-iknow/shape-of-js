const s = {};
'title,stageIntro,play,dead,stageClear,clear,ranking'
	.split(',')
	.forEach(v => (s[v] = Symbol()));
const Game = class {
	constructor(base, col, row, ...v) {
		Object.assign(this, {
			base,
			col,
			row,
			state: {},
			curr: 'title',
			//prettier-ignore
			score: new Score,
			//prettier-ignore
			stage: new Stage
		});
		let i = 0;
		while (i < v.length) {
			this.state[v[i++]] = Panel.get(this, v[i++], v[i++]);
		}
	}
	setState(state) {
		// Symbol 패턴, 열거형이 안전해지는 이유
		if (!Object.values(s).includes(state)) throw 'invalid';
		// state는 심볼 상태임
		this.curr = state;

		const {
			state: {
				[this.curr]: { base: el },
			},
		} = this;

		this.base.innerHTML = '';
		this.base.appendChild(el);
		el.style.display = 'block';
		this[this.curr]();
	}
	[s.title]() {}
	[s.stageIntro]() {}
	[s.play]() {}
	[s.stageClear]() {}
	[s.dead]() {}
	[s.clear]() {}
	[s.ranking]() {}
};
Object.entries(s).forEach(([k, v]) => (Game[k] = v));
Object.freeze(Game);
