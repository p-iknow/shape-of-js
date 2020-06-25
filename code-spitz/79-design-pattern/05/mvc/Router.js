

const Router = class extends Map {
	constructor() {
		super();
	}
	route(key, ...arg) {
		this.get(key).action(...arg);
	}
}

export default Router;
