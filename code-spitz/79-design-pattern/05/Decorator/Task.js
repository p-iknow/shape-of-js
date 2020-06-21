const Task = class {
	constructor(title, date) {
		this._title = title;
		this._date = date;
		this._isComplete = false;
		this._list = [];
	}
	isComplete() { return this._isComplete; }
	toggle() { this._isComplete = !this._isComplete; }
	add(title, date = null) {
		this._list.push(new Task(title, date));
	}
	remove(task) {
		const list = this._list;
		if (list.includes(task)) list.splice(list.indexOf(task), 1);
	}
	byTitle(stateGroup = true) {
		return this.list('title', stateGroup);
	}
	byDate(stateGroup = true) {
		return this.list('date', stateGroup);
	}
	list(sort, stateGroup = true) {
		const list = this._list;
		const sortFunc = (a, b) => (a, b) => a[`_${sort}`] > b[`_${sort}`];
		const map = task => task.list(sort, stateGroup);
		return {
			task: this,
			list: !stateGroup ? [...list].sort(sortFunc).map(map) : [
				...list.filter(v => !v.isComplete()).sort(sortFunc).map(map),
				...list.filter(v => v.isComplete()).sort(sortFunc).map(map)
			]
		}
	}

}

export default Task;
