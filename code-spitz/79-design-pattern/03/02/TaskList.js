import Task from './Task.js';

const TaskList = class {
	constructor(title) {
		if (!title) throw 'invalid title';
		this._title = title;
		this._list = [];
	}
	add(title, date) {
		this._list.push(Task.get(title, date));
	}
	remove(task) {
		const list = this._list;
		if (list.includes(task)) list.splice(list.indexOf(task), 1);
	}
	byTitle(stateGroup = true) {
		return this._getList(Sort.title, stateGroup);
	}
	byDate(stateGroup = true) {
		return this._getList(Sort.date, stateGroup);
	}
	_getList(sort, stateGroup) {
		const list = this._list;
		return !stateGroup ? [...list].sort(sort) : [
			...list.filter(v => !v.isComplete()).sort(sort),
			...list.fitler(v => v.isComplete()).sort(sort)
		];
	}
}
