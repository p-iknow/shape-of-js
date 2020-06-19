const Task = class {
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

const taskSort = {
	title(a, b) {
		return a.sortTitle(b);
	},
	date(a, b) {
		return a.sortDate(b);
	}
}
