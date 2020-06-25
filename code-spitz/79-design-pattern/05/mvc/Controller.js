import { Task } from './Model.js';
import { IndexView, FolderView } from './View.js';

const Controller = class {
	constructor(router) {
		this.router = router;
	}
	// 라우터가 컨트롤러에게 일을 시키기 위한 메소드
	action(...arg) {
		throw 'overrided';
	}
	listen(model) {
		throw 'overrided'
	}
}

export const Index = class extends Controller {
	constructor(router) {
		super(router);
		this.model = Task.root || (Task.root = new Task("root"));
		this.model.addListener(this);
		this.view = new IndexView(this);
	}
	action(...arg) {
		this.view.render(this.model.list());
	}
	listen(model) {
		this.action();
	}
	add(title) {
		this.model.add(title);
	}
	select(task) {
		this.router.route("folder", task);
	}
}

export const Folder = class extends Controller {
	constructor(router) {
		super(router);
		this.view = new FolderView(this);
	}
	action(...arg) {
		this.model = arg[0];
		this.model.addListener(this);
		this.view.render(this.model.list());
	}
	listen(model) {
		this.view.render(this.model.list());
	}
	addNew(title) {
		this.model.add(title);
	}
	add(parent, title) {
		parent.add(title);
	}
	remove(parent, task) {
		parent.remove(task);
	}
	toggle(task) {
		task.toggle();
	}
}
