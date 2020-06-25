import { el } from './util.js';

const View = class {
	constructor(controller) {
		this.controller = controller;
	}
	render(model) {
		throw "overrieded!"
	}
};

export const IndexView = class extends View {
	constructor(controller) {
		super(controller);
		this.$parent = document.querySelector('#folders');
		document.querySelector('#newFolder').onkeyup = e => {
			e.stopImmediatePropagation();
			const { keyCode, target } = e;
			if (keyCode != 13) return;

			controller.add(target.value);
			target.value = '';

		};
	}
	render({ list }) {
		this.$parent.innerHTML = '';
		list.forEach(({ task }) => {
			const li = this.$parent.appendChild(el('li', { innerHTML: task.title }));
			li.onclick = () => this.controller.select(task);
		})
	}
}

export const FolderView = class extends View {
	constructor(controller) {
		super(controller);
		this.$parent = document.querySelector('#folder');
		document.querySelector('#newTask').onkeyup = e => {
			e.stopImmediatePropagation();
			const { keyCode, target } = e;
			if (keyCode != 13) return;

			this.controller.addNew(target.value);
			target.value = '';
		}
	}
	render({ task, list }) {
		this.$parent.innerHTML = `<h2>${task.title}</h2>`;
		this.subTask(this.$parent.appendChild(el('ul')), task, list);
	}
	subTask(ul, parent, list) {
		list.forEach(({ task, list }) => {
			const li = ul.appendChild(el('li'));
			li.onclick = e => {
				e.stopImmediatePropagation();
				this.controller.toggle(task);
			}

			const title = li.appendChild(el('span', { innerHTML: task.title }));
			if (task.isComplete) title.style.textDecoration = 'line-through';

			const removeIcon = li.appendChild(el('span', { innerHTML: 'X' }));
			removeIcon.onclick = () => {
				this.controller.remove(parent, task);
			}

			const input = li.appendChild(el('input'));
			input.onclick = e => e.stopImmediatePropagation();
			input.onkeyup = e => {
				e.stopImmediatePropagation();
				const { keyCode, target } = e;
				if (keyCode != 13) return;
				this.controller.add(task, target.value);
				target.value = '';
			};
			if (list.length) this.subTask(li.appendChild(el('ul')), task, list)
		})
	}
}
