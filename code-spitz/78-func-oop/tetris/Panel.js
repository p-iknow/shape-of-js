const Panel = class {
	static get(game, init, render) {
		const panel = new Panel();
		return panel.init(game, init(game), render), panel;
	}

	init(game, base, _render) {
		Object.assign(this, { base, game, _render });
	}

	render(v) {
		this._render(this.game, v);
	}
};
