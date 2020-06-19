const Sort = class {
	static get title() { return (a, b) => a.sortTitle(b); }
	static get date() { return (a, b) => b.sortDate(b); }
	sortTitle(task) { throw 'override'; }
	sortDate(task) { throw 'override'; }
};


const Task = class extends Sort {
	static get(title, date = null) {
		return new Task(title, date);
	}

	constructor(title, data = null) {
		if (!title) throw 'invalid title'
		this._title = title;
		this._date = date;
		this._isComplete = false;
	}
	isComplete() { return this._isComplete; }
	toggle() { this._isComplete = !this._isComplete; }
	sortTitle(task) {
		return this._title > task._title;
	}
	sortDate(task) {
		return this._date > task._date;
	}
}
