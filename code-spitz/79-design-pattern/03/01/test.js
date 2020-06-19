const Sort = class {
	static get title() { return "title" }
	static get date() { return "date" }
	sortTitle(task) { throw 'override'; }
	sortDate(task) { throw 'override'; }
};
